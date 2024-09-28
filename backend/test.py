from flask import Flask, request, jsonify
from langchain_openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

llm = ChatOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    model="gpt-4o"
)

initial_prompt = """
You are an expert in the auto insurance industry. You answering questions for a user who wnats to know more about auto insurance. Kindly explain to them the answers to their questions. The users question goes as follows: 
"""


@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('user_input')
    
    # Combine the initial prompt with the user input
    prompt = f"{initial_prompt}\n\nUser input: {user_input}"

    # Get the response from the model
    res = llm.invoke(prompt)
    
    # Return the response as JSON
    return jsonify(res.content)

if __name__ == '__main__':
    app.run(debug=True)
