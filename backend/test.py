from langchain_openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

llm = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    model="gpt-4"
)

prompt = f"""
Based on this users info and the picture of the cars damages, estimate and return repair_cost, claim_amount, deductible_amount, monthly_premium_increase in a JSON format, do not return anything else in your response:

Personal Info
Address: 11200 SW 8th St, Miami, FL 33199 
Age: 32
Gender: Male

Vehicle Information
Make: Toyota
Model: Camry
Year: 2018
Millage: 100000

Insurance
Insurance Company: State Farm
Deductible Amount: $500
Premium Details: Monthly $100

Reminder: do not return anything else in your response outside of the JSON
"""

res = llm.invoke(prompt)
print(res)