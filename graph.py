# flake8: noqa
import os

from dotenv import load_dotenv
from typing_extensions import TypedDict
from langgraph.graph import StateGraph,START,END # stategraph is a core component of langgraph which manages the state transitions
from openai import OpenAI

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

client = OpenAI(
    api_key=api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)
