from fastapi import FastAPI, Request
from pydantic import BaseModel
from langchain_openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

llm = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    model="gpt-4o"
)

initial_prompt = """
You are an expert in the auto insurance industry. You are answering questions for a user who wants to know more about auto insurance. Kindly explain to them the answers to their questions. The user's question goes as follows: 
"""

class UserInput(BaseModel):
    user_input: str

@app.post("/chat")
async def chat(user_input: UserInput):
    # Combine the initial prompt with the user input
    prompt = f"{initial_prompt}\n\nUser input: {user_input.user_input}"

    # Get the response from the model
    res = llm.invoke(prompt)
    
    # Return the response as JSON
    return {"content": res.content}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, debug=True)
