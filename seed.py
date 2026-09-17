import uuid
from backend.database import SessionLocal, engine
from backend.models import Base, Product, Inventory, Supplier

def seed_data():
    print("Dropping tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    
    print("Seeding database with sample data...")
    db = SessionLocal()
    
    # Create Suppliers
    sup1 = Supplier(id=str(uuid.uuid4()), name="TechLogix Solutions", contact_email="supply@techlogix.com")
    sup2 = Supplier(id=str(uuid.uuid4()), name="Global Components Inc", contact_email="orders@globalcomp.com")
    db.add_all([sup1, sup2])
    db.commit()

    # Create Products
    p1 = Product(id=str(uuid.uuid4()), name="MacBook Pro M3", category="Electronics", sku="LAP-MBP-M3", supplier_id=sup1.id)
    p2 = Product(id=str(uuid.uuid4()), name="Logitech MX Master 3S", category="Accessories", sku="ACC-LOG-MX3", supplier_id=sup2.id)
    p3 = Product(id=str(uuid.uuid4()), name="Keychron K8 Pro", category="Accessories", sku="ACC-KEY-K8", supplier_id=sup1.id)
    p4 = Product(id=str(uuid.uuid4()), name="Dell UltraSharp 27", category="Electronics", sku="MON-DEL-U27", supplier_id=sup2.id)
    db.add_all([p1, p2, p3, p4])
    db.commit()

    # Create Inventory (some healthy, some low stock)
    # ROP = daily_demand * lead_time + safety_stock
    # p1: 2 * 5 + 10 = 20 (Healthy: Stock 50 > 20)
    inv1 = Inventory(product_id=p1.id, quantity=50, daily_demand=2, lead_time_days=5, safety_stock=10)
    # p2: 10 * 3 + 20 = 50 (Low Stock: Stock 25 < 50)
    inv2 = Inventory(product_id=p2.id, quantity=25, daily_demand=10, lead_time_days=3, safety_stock=20)
    # p3: 5 * 7 + 15 = 50 (Low Stock / Need Reorder: Stock 10 < 50)
    inv3 = Inventory(product_id=p3.id, quantity=10, daily_demand=5, lead_time_days=7, safety_stock=15)
    # p4: 1 * 10 + 5 = 15 (Healthy: Stock 20 > 15)
    inv4 = Inventory(product_id=p4.id, quantity=20, daily_demand=1, lead_time_days=10, safety_stock=5)
    
    db.add_all([inv1, inv2, inv3, inv4])
    db.commit()
    
    print("Successfully seeded database!")
    db.close()

if __name__ == "__main__":
    seed_data()
