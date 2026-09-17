from fastapi import APIRouter, HTTPException
from backend.schemas.inventory import Inventory, InventoryResponse
from backend.routers.products import MOCK_PRODUCTS
from typing import List

router = APIRouter(prefix="/inventory", tags=["inventory"])

MOCK_INVENTORY = {
    "P001": {"product_id": "P001", "stock": 50, "daily_demand": 10, "lead_time_days": 7},
    "P002": {"product_id": "P002", "stock": 300, "daily_demand": 5, "lead_time_days": 3},
    "P003": {"product_id": "P003", "stock": 40, "daily_demand": 8, "lead_time_days": 5},
}

def get_product_name(product_id: str) -> str:
    for p in MOCK_PRODUCTS:
        if p.product_id == product_id:
            return p.name
    return "Unknown Product"

@router.get("/", response_model=List[InventoryResponse])
def get_all_inventory():
    responses = []
    for product_id, data in MOCK_INVENTORY.items():
        responses.append(InventoryResponse(
            product_id=product_id,
            product_name=get_product_name(product_id),
            current_stock=data["stock"],
            daily_demand=data["daily_demand"],
            lead_time=data["lead_time_days"]
        ))
    return responses

@router.get("/{product_id}", response_model=InventoryResponse)
def get_inventory(product_id: str):
    data = MOCK_INVENTORY.get(product_id)
    if not data:
        raise HTTPException(status_code=404, detail="Inventory not found")
    
    return InventoryResponse(
        product_id=product_id,
        product_name=get_product_name(product_id),
        current_stock=data["stock"],
        daily_demand=data["daily_demand"],
        lead_time=data["lead_time_days"]
    )

@router.post("/update")
def update_inventory(inventory_update: Inventory):
    product_id = inventory_update.product_id
    if product_id not in MOCK_INVENTORY:
        # For mock purposes, allow creation
        MOCK_INVENTORY[product_id] = inventory_update.model_dump()
        return {"message": "Inventory created", "data": MOCK_INVENTORY[product_id]}
    
    # Update existing
    MOCK_INVENTORY[product_id].update(inventory_update.model_dump())
    return {"message": "Inventory updated", "data": MOCK_INVENTORY[product_id]}
