# flake8: noqa
import os
from typing import Literal
from dotenv import load_dotenv
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END  # LangGraph core for state transitions
from openai import OpenAI
from pydantic import BaseModel  # For structured response validation

# ✅ Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# ✅ Initialize Gemini (via OpenAI-compatible client)
client = OpenAI(
    api_key=api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# ✅ Pydantic response models
class ClassifyMessageResponse(BaseModel):
    is_coding_question: bool


class CodeAccuracyResponse(BaseModel):
    accuracy_percentage: str


# ✅ Define state structure
class State(TypedDict):
    user_query: str
    llm_result: str | None
    accuracy_percentage: str | None
    is_coding_question: bool | None


# ✅ Node 1: Classify user query
def classify_message(state: State):
    print("⚙️ Classifying message...")

    query = state["user_query"]

    SYSTEM_PROMPT = """
    You are an AI assistant whose job is to detect if the user's query is related
    to a coding question or not.
    Return the response as JSON: {"is_coding_question": true} or {"is_coding_question": false}.
    """

    # Structured response
    response = client.beta.chat.completions.parse(
        model="gemini-2.0-flash",
        response_format=ClassifyMessageResponse,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": query}
        ]
    )

    is_coding_question = response.choices[0].message.parsed.is_coding_question
    print(f"🔍 is_coding_question: {is_coding_question}")

    state["is_coding_question"] = is_coding_question
    return state


# ✅ Node 2: Route based on classification
def route_query(state: State) -> Literal["general_query", "coding_query"]:
    print("🔄 Routing query...")

    if state["is_coding_question"]:
        print("➡️ Routed to coding_query")
        return "coding_query"
    else:
        print("➡️ Routed to general_query")
        return "general_query"


# ✅ Node 3: Handle general query
def general_query(state: State):
    print("💬 Handling general query...")

    query = state["user_query"]

    response = client.chat.completions.create(
        model="gemini-2.0-flash",
        messages=[
            {"role": "user", "content": query},
        ]
    )

    result = response.choices[0].message.content
    state["llm_result"] = result

    print("✅ General query handled successfully.")
    return state


# ✅ Node 4: Handle coding query
def coding_query(state: State):
    print("💻 Handling coding query...")

    query = state["user_query"]

    SYSTEM_PROMPT = """
    You are an AI assistant whose job is to answer coding questions.
    You will be given a coding question, and you must provide a detailed, correct answer.
    """

    response = client.chat.completions.create(
        model="gemini-2.0-flash",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": query},
        ]
    )

    result = response.choices[0].message.content
    state["llm_result"] = result

    print("✅ Coding query handled successfully.")
    return state


# ✅ Node 5: Validate coding query result (accuracy)
def coding_validate_query(state: State):
    print("✅ Validating coding query...")

    query = state["user_query"]
    llm_result = state["llm_result"]

    SYSTEM_PROMPT = f"""
    You are an expert evaluator. Evaluate how accurate the following code is for the given question.
    Return only a percentage value as a string (e.g., "85%").

    User Query: {query}
    Code: {llm_result}
    """

    response = client.beta.chat.completions.parse(
        model="gemini-2.0-flash",
        response_format=CodeAccuracyResponse,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": query},
        ]
    )

    accuracy = response.choices[0].message.parsed.accuracy_percentage
    print(f"🎯 Accuracy evaluated: {accuracy}")

    state["accuracy_percentage"] = accuracy
    return state


# ✅ Build the graph
graph_builder = StateGraph(State)

graph_builder.add_node("classify_message", classify_message)
graph_builder.add_node("route_query", route_query)
graph_builder.add_node("general_query", general_query)
graph_builder.add_node("coding_query", coding_query)
graph_builder.add_node("coding_validate_query", coding_validate_query)

graph_builder.add_edge(START, "classify_message")
graph_builder.add_conditional_edges("classify_message", route_query)
graph_builder.add_edge("general_query", END)
graph_builder.add_edge("coding_query", "coding_validate_query")
graph_builder.add_edge("coding_validate_query", END)

graph = graph_builder.compile()


# ✅ Main program
def main():
    print("🤖 Welcome to IntelliRoute! Enter your query below:")
    user = input("> ")

    _state: State = {
        "user_query": user,
        "accuracy_percentage": None,
        "is_coding_question": False,
        "llm_result": None
    }

    graph_result = graph.invoke(_state)
    print("\n🧾 Final Graph Result:\n", graph_result)


if __name__ == "__main__":
    main()
