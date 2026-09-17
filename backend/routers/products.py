from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from backend.schemas.product import Product
from backend import models
from backend.database import get_db
from typing import List

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[Product])
def get_products(db: Session = Depends(get_db)):
    db_products = db.query(models.Product).all()
    return [
        Product(
            product_id=p.id,
            sku=p.sku,
            name=p.name,
            category=p.category,
            supplier_id=p.supplier_id
        ) for p in db_products
    ]

@router.get("/{product_id}", response_model=Product)
def get_product(product_id: str, db: Session = Depends(get_db)):
    p = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(
        product_id=p.id,
        sku=p.sku,
        name=p.name,
        category=p.category,
        supplier_id=p.supplier_id
    )

