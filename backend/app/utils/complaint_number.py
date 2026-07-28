from datetime import datetime
from uuid import uuid4


def generate_complaint_number() -> str:
    return (
        f"CMP-"
        f"{datetime.now():%Y%m%d}-"
        f"{str(uuid4())[:6].upper()}"
    )
