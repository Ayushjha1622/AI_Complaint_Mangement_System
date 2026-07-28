import os
from loguru import logger

os.makedirs("logs", exist_ok=True)

logger.add(
    "logs/api.log",
    rotation="10 MB",
    retention="7 days",
    level="INFO",
)
