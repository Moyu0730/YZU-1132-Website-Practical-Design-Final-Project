from configparser import ConfigParser
from langchain_google_genai import ChatGoogleGenerativeAI

# Read API_KEY
config = ConfigParser()
config.read("config.ini")
api_key = config["Gemini"]["API_KEY"]

# Create Gemini LLM object
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-lite",
    google_api_key=api_key
)

def get_npc_response():
    prompt = "Generate one NPC dialogue line, max 10 words, in casual English."
    messages = [
        ("system", "You are an English speaker, respond in casual English for an RPG game NPC dialogue."),
        ("human", prompt),
    ]
    return llm.invoke(messages).content

def get_finish_response():
    prompt = "Say a sentence to congratulate the player for reaching the next map and cheer him on, max 10 words."
    messages = [
        ("system", "You are an English speaker, respond in casual English."),
        ("human", prompt),
    ]
    return llm.invoke(messages).content