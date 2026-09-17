import os
from dotenv import load_dotenv
import openai

load_dotenv()

# We'll initialize the client if the key is available
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

def generate_inventory_explanation(product_name: str, stock: int, rop: int, recommended: int, status: str) -> str:
    """
    Generates a human-readable explanation for the inventory status using an LLM.
    """
    if status == "OK":
        return f"Inventory for {product_name} is currently healthy ({stock} units). No immediate reordering is needed."
        
    prompt = f"""
    You are an expert inventory management assistant.
    Analyze the following inventory data and provide a concise, professional recommendation (max 2 sentences).
    
    Product: {product_name}
    Current stock: {stock}
    Reorder point: {rop}
    Recommended quantity to order: {recommended}
    
    Explain why the reorder is needed and confirm the recommended quantity.
    """

    if not client:
        # Fallback explanation if no API key is configured
        return f"Inventory is below the reorder point ({stock} < {rop}). Based on current demand and supplier lead time, the system recommends replenishing {recommended} units of {product_name}."

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful inventory assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        return f"Inventory is below the reorder point ({stock} < {rop}). Based on current demand and supplier lead time, the system recommends replenishing {recommended} units of {product_name}."
