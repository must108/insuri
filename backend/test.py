from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    model="gpt-4o"
)

prompt = f"""
You are an expert insurance agent, tasked with helping customers with their insurance claims.

Here is some information about the customer:
Age: 19
Gender: male
Address: 5262 los palma vista dr, orlando fl, 32837

Here is some information about their vehicle:
Make: Toyota
Model: Camry
Year: 2018
Mileage: 70000

Here is some information about their insurance:
Insurance Company: Statefarm
Deductible Amount: $500
Premium Details: $300

This customer has suffered a car accident, and they want to know their repair cost,
their claim amount, their deductible amount, and their monthly premium increase. 
These are some of the damage incurred: Dent, scratch, rear-end collison

Return the appropriate values given the data, strictly in JSON format, like this:
    repair_cost: x,
    claim_amount: x,
    deductible_amount: x,
    monthly_premium_increase: x,

base these prices on the orlando, fl area. do not return anything but json in text form, without a code box
be sure to be consistent with your responses. do not change them on requery
remember to account for dealer/mechanic fees as well. consider all costs, including insurance company costs.
"""

res = llm.invoke(prompt)
print(res.content)