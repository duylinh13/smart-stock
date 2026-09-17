from fastapi import APIRouter, HTTPException
from backend.schemas.product import Product
from typing import List

router = APIRouter(prefix="/products", tags=["products"])

MOCK_PRODUCTS = [
    Product(product_id="P001", sku="LAP-001", name="Laptop A", category="Electronics", supplier_id="S01"),
    Product(product_id="P002", sku="MOU-001", name="Mouse", category="Accessories", supplier_id="S02"),
    Product(product_id="P003", sku="KEY-001", name="Keyboard", category="Accessories", supplier_id="S02"),
]

@router.get("/", response_model=List[Product])
def get_products():
    return MOCK_PRODUCTS

@router.get("/{product_id}", response_model=Product)
def get_product(product_id: str):
    for p in MOCK_PRODUCTS:
        if p.product_id == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")
