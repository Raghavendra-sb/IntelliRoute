# 🧠 IntelliRoute

A **smart LLM routing agent** built using **LangGraph** and **Gemini APIs**, designed to **minimize API costs** while **maximizing response quality**.

This project automatically classifies user queries as **coding** or **non-coding** and routes them to the most cost-effective model for processing.

---

## 🚀 Features

- 🔍 **Query Classification:** Detects if the user's query is related to coding or general topics.
- ⚡ **Dynamic Routing:**
  - Routes coding queries to **Gemini 2.5 Pro / Flash** for better reasoning.
  - Routes general queries to **Gemini Flash** for faster, cheaper responses.
- ✅ **Accuracy Evaluation:** For coding queries, validates the generated code and estimates accuracy.
- 🧩 **StateGraph-based Workflow:** Manages state transitions between classification, routing, and response generation.
- 🐳 **Docker Dev Container Ready:** Fully runnable in a VS Code Dev Container environment.

---

## 🏗️ Project Structure

```
IntelliRoute/
├── .gitignore
├── graph.py           # Main LangGraph implementation
├── test_queries.md    # Sample coding & non-coding test prompts
└── README.md          # Project documentation
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Raghavendra-sb/IntelliRoute.git
cd IntelliRoute
```

### 2. Set Up the Environment

If you're using VS Code with Dev Containers, it will auto-setup dependencies.
Otherwise, you can set up manually:

```bash
python -m venv .venv
source .venv/bin/activate     # (Linux/Mac)
.venv\Scripts\activate        # (Windows)
pip install -U langgraph openai python-dotenv typing-extensions pydantic
```

### 3. Add Your Gemini API Key

Create a `.env` file in the project root:

```
GEMINI_API_KEY=your_api_key_here
```

You can get your Gemini API key from [Google AI Studio](https://aistudio.google.com/).

---

## 🧠 How It Works

1. The system takes user input (`user_query`).

2. `classify_message()` detects if the query is coding-related.

3. Based on classification, it routes:
   - To `general_query()` → for normal questions
   - To `coding_query()` → for code generation + validation

4. The `coding_validate_query()` node uses Gemini to estimate code accuracy.

5. The entire pipeline is managed via a LangGraph `StateGraph`.

---

## ▶️ Run the App

```bash
python graph.py
```

Then enter your query, for example:

```
> Write a Python program to reverse a string.
```

### Expected Output

```
⚠️ Classifying message...
💻 Handling coding query...
✅ Validating coding query...
graph_result: {'user_query': 'Write a Python program to reverse a string.', 'is_coding_question': True, 'llm_result': '...', 'accuracy_percentage': '95%'}
```

---

## 🧪 Testing with Predefined Queries

A `test_queries.md` file is included with 20+ examples.
Run these manually or create a small loop to automate them.

**Example coding query:**
```
Write a C++ program to check if a number is prime.
```

**Example non-coding query:**
```
Explain the process of photosynthesis.
```

---

## 🧰 Tech Stack

- **Python 3.12+**
- **LangGraph** – for building and managing stateful LLM workflows
- **Gemini API** (via OpenAI SDK) – for natural language reasoning
- **Pydantic** – for structured response parsing
- **dotenv** – for secure key management
- **Docker Dev Container** – for isolated environment setup

---

## 📊 Rate Limits (Gemini Example)

| Model | Category | Requests/Minute | Tokens/Minute | Requests/Day |
|-------|----------|-----------------|---------------|--------------|
| gemini-2.5-pro | Text-out | 2 | 25K | 50 |
| gemini-2.5-flash | Text-out | 10 | 250K | 250 |
| gemini-2.0-flash | Text-out | 15 | 1M | 200 |

You can monitor usage and rate limits in **Google AI Studio → Quotas Dashboard**.

---


## 🧑‍💻 Author

**Raghavendra S B**  
Smart routing system using Gemini & LangGraph 🚀

📍 [GitHub Profile](https://github.com/Raghavendra-sb)

---



⭐ **If you found this useful, give the repo a star!**
