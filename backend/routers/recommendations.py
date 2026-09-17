from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from backend.schemas.recommendation import RecommendationResponse
from backend import models
from backend.database import get_db
from backend.services.inventory_service import calculate_recommendation

router = APIRouter(prefix="/recommendations", tags=["recommendations"])

@router.get("/", response_model=List[RecommendationResponse])
def get_all_recommendations(db: Session = Depends(get_db)):
    db_inventories = db.query(models.Inventory).all()
    responses = []
    
    for inv in db_inventories:
        product_name = inv.product.name if inv.product else "Unknown Product"
        
        calc_result = calculate_recommendation(
            stock=inv.quantity,
            daily_demand=inv.daily_demand,
            lead_time_days=inv.lead_time_days,
            safety_stock=inv.safety_stock
        )
        
        responses.append(RecommendationResponse(
            product_id=inv.product_id,
            product_name=product_name,
            current_stock=inv.quantity,
            reorder_point=calc_result["reorder_point"],
            recommended_quantity=calc_result["recommended_quantity"],
            status=calc_result["status"]
        ))
        
    return responses

@router.get("/{product_id}", response_model=RecommendationResponse)
def get_recommendation(product_id: str, db: Session = Depends(get_db)):
    inv = db.query(models.Inventory).filter(models.Inventory.product_id == product_id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Inventory data not found for this product")
    
    product_name = inv.product.name if inv.product else "Unknown Product"
    calc_result = calculate_recommendation(
        stock=inv.quantity,
        daily_demand=inv.daily_demand,
        lead_time_days=inv.lead_time_days,
        safety_stock=inv.safety_stock
    )
    
    return RecommendationResponse(
        product_id=inv.product_id,
        product_name=product_name,
        current_stock=inv.quantity,
        reorder_point=calc_result["reorder_point"],
        recommended_quantity=calc_result["recommended_quantity"],
        status=calc_result["status"]
    )
