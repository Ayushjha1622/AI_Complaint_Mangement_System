from enum import Enum


class ComplaintCategory(str, Enum):
    PRODUCT = "PRODUCT"
    SERVICE = "SERVICE"
    BILLING = "BILLING"
    DELIVERY = "DELIVERY"
    OTHER = "OTHER"


class ComplaintPriority(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class ComplaintStatus(str, Enum):
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    RESOLVED = "RESOLVED"
    CLOSED = "CLOSED"
