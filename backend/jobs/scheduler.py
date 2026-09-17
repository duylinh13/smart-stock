from apscheduler.schedulers.background import BackgroundScheduler
import logging
from backend.database import SessionLocal
from backend import models
from backend.services.inventory_service import calculate_recommendation

logger = logging.getLogger(__name__)

def check_daily_inventory():
    """
    Daily background job to check for items that need reordering.
    In a real app, this might send an email or trigger a Slack alert.
    """
    logger.info("Running daily inventory check...")
    db = SessionLocal()
    try:
        inventories = db.query(models.Inventory).all()
        for inv in inventories:
            calc = calculate_recommendation(
                stock=inv.quantity,
                daily_demand=inv.daily_demand,
                lead_time_days=inv.lead_time_days,
                safety_stock=inv.safety_stock
            )
            if calc["status"] == "NEED_REORDER":
                product_name = inv.product.name if inv.product else f"Product {inv.product_id}"
                logger.warning(
                    f"ALERT: {product_name} is low on stock! "
                    f"Current: {inv.quantity}, ROP: {calc['reorder_point']}. "
                    f"Recommend ordering {calc['recommended_quantity']} units."
                )
    finally:
        db.close()
    logger.info("Daily inventory check completed.")

def start_scheduler():
    scheduler = BackgroundScheduler()
    # For demo purposes, we run it every 60 seconds. 
    # In production, it would be e.g., scheduler.add_job(check_daily_inventory, 'cron', hour=8)
    scheduler.add_job(check_daily_inventory, 'interval', seconds=60)
    scheduler.start()
    logger.info("APScheduler started.")
