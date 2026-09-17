import pytest
from backend.services.inventory_service import calculate_reorder_point, calculate_recommendation

def test_calculate_reorder_point():
    rop = calculate_reorder_point(daily_demand=10, lead_time_days=7, safety_stock=20)
    assert rop == 90

def test_calculate_recommendation_ok():
    result = calculate_recommendation(stock=100, daily_demand=10, lead_time_days=7, safety_stock=20)
    # ROP = 90. Stock 100 > 90, so OK.
    assert result["reorder_point"] == 90
    assert result["status"] == "OK"
    assert result["recommended_quantity"] == 0

def test_calculate_recommendation_need_reorder():
    result = calculate_recommendation(stock=50, daily_demand=10, lead_time_days=7, safety_stock=20)
    # ROP = 90. Stock 50 < 90, so NEED_REORDER.
    assert result["reorder_point"] == 90
    assert result["status"] == "NEED_REORDER"
    # recommended quantity = (daily_demand * 30) - stock + safety_stock
    # (10 * 30) - 50 + 20 = 300 - 50 + 20 = 270
    assert result["recommended_quantity"] == 270
