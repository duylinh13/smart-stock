from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    product_id: str
    sku: str
    name: str
    category: str
    supplier_id: str
