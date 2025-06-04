# llm.py
from configparser import ConfigParser
from langchain_google_genai import ChatGoogleGenerativeAI

# 讀取 API_KEY
config = ConfigParser()
config.read("config.ini")
api_key = config["Gemini"]["API_KEY"]

# 建立 Gemini LLM 物件
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-lite",
    google_api_key=api_key
)

def get_npc_response():
    prompt = "請為NPC生成一句台詞，不超過 20 字，符合台灣人語氣"
    messages = [
        ("system", "你是一個台灣人，請用繁體中文回答，生成一個適合RPG遊戲NPC的對話台詞。"),
        ("human", prompt),
    ]
    return llm.invoke(messages).content

def get_start_response():
    prompt = "請講一句歡迎玩家進入遊戲的話，不超過 20 字"
    messages = [
        ("system", "你是一個台灣人，請用繁體中文回答。"),
        ("human", prompt),
    ]
    return llm.invoke(messages).content

def get_finish_response():
    prompt = "請講一句話恭喜玩家抵，不超過 20 字"
    messages = [
        ("system", "你是一個台灣人，請用繁體中文回答。"),
        ("human", prompt),
    ]
    return llm.invoke(messages).content
