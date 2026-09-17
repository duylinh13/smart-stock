def calculate_reorder_point(daily_demand: int, lead_time_days: int, safety_stock: int) -> int:
    return (daily_demand * lead_time_days) + safety_stock

def calculate_recommendation(stock: int, daily_demand: int, lead_time_days: int, safety_stock: int):
    rop = calculate_reorder_point(daily_demand, lead_time_days, safety_stock)
    
    status = "OK"
    recommended_quantity = 0

    if stock < rop:
        status = "NEED_REORDER"
        # A simple strategy for recommended quantity could be:
        # Reorder enough to get back to ROP + Safety Stock, or some dynamic factor.
        # Let's say we order enough to cover lead time + safety stock + extra buffer,
        # or simply order: ROP + Safety Stock - Stock.
        # But per the example: ROP = 90, Stock = 50 -> Recommended = 120. 
        # This seems arbitrary in the example, but let's say it's:
        # recommended = (ROP * 2) - Stock (just a dummy logic for now to have a larger number)
        # or we just recommend a fixed multiple of daily demand, e.g. 30 days of demand.
        recommended_quantity = (daily_demand * 30) - stock + safety_stock
        if recommended_quantity < 0:
            recommended_quantity = 0

    return {
        "reorder_point": rop,
        "recommended_quantity": recommended_quantity,
        "status": status
    }
