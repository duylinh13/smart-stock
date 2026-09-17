import logging
import json

logger = logging.getLogger(__name__)

# This is a mock Kafka producer for demo purposes.
# In a real app, you would use:
# from kafka import KafkaProducer
# producer = KafkaProducer(bootstrap_servers='localhost:9092', value_serializer=lambda v: json.dumps(v).encode('utf-8'))

def publish_order_event(order_data: dict):
    """
    Publish an event to a Kafka topic when a new sales order is created.
    Other services (like notification or billing) can consume this.
    """
    logger.info(f"Publishing 'order_created' event to Kafka topic 'sales_orders': {order_data}")
    # producer.send('sales_orders', order_data)
    # producer.flush()
    return True
