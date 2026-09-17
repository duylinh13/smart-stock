from pydantic import BaseModel
from typing import Optional

class RecommendationResponse(BaseModel):
    product_id: str
    product_name: str
    current_stock: int
    reorder_point: int
    recommended_quantity: int
    status: str
    ai_explanation: Optional[str] = None
