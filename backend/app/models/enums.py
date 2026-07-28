from enum import Enum


class UserRole(str, Enum):
    ADMIN = "ADMIN"
    QA_MANAGER = "QA_MANAGER"
    INVESTIGATOR = "INVESTIGATOR"
    CUSTOMER_SUPPORT = "CUSTOMER_SUPPORT"
    VIEWER = "VIEWER"
