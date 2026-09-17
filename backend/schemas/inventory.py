from pydantic import BaseModel
from typing import Optional

class Inventory(BaseModel):
    product_id: str
    stock: int
    daily_demand: int
    lead_time_days: int

class InventoryResponse(BaseModel):
    product_id: str
    product_name: str
    current_stock: int
    daily_demand: int
    lead_time: int
