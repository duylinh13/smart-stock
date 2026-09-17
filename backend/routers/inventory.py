from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from backend.schemas.inventory import Inventory, InventoryResponse
from backend import models
from backend.database import get_db
from typing import List

router = APIRouter(prefix="/inventory", tags=["inventory"])

@router.get("/", response_model=List[InventoryResponse])
def get_all_inventory(db: Session = Depends(get_db)):
    db_inventories = db.query(models.Inventory).all()
    responses = []
    for inv in db_inventories:
        product_name = inv.product.name if inv.product else "Unknown Product"
        responses.append(InventoryResponse(
            product_id=inv.product_id,
            product_name=product_name,
            current_stock=inv.quantity,
            daily_demand=inv.daily_demand,
            lead_time=inv.lead_time_days,
            safety_stock=inv.safety_stock
        ))
    return responses

@router.get("/{product_id}", response_model=InventoryResponse)
def get_inventory(product_id: str, db: Session = Depends(get_db)):
    inv = db.query(models.Inventory).filter(models.Inventory.product_id == product_id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Inventory not found")
    
    product_name = inv.product.name if inv.product else "Unknown Product"
    return InventoryResponse(
        product_id=inv.product_id,
        product_name=product_name,
        current_stock=inv.quantity,
        daily_demand=inv.daily_demand,
        lead_time=inv.lead_time_days,
        safety_stock=inv.safety_stock
    )

@router.post("/update")
def update_inventory(inventory_update: Inventory, db: Session = Depends(get_db)):
    inv = db.query(models.Inventory).filter(models.Inventory.product_id == inventory_update.product_id).first()
    if not inv:
        # Create new
        inv = models.Inventory(
            product_id=inventory_update.product_id,
            quantity=inventory_update.stock,
            daily_demand=inventory_update.daily_demand,
            lead_time_days=inventory_update.lead_time_days,
            safety_stock=inventory_update.safety_stock
        )
        db.add(inv)
        db.commit()
        db.refresh(inv)
        return {"message": "Inventory created", "data": inv}
    
    # Update existing
    inv.quantity = inventory_update.stock
    inv.daily_demand = inventory_update.daily_demand
    inv.lead_time_days = inventory_update.lead_time_days
    inv.safety_stock = inventory_update.safety_stock
    db.commit()
    db.refresh(inv)
    return {"message": "Inventory updated", "data": inv}

