"""
Legacy complaints router — replaced by app/api/v1/complaints.py.
Comment model has been moved to its own module; this file is a placeholder.
"""
from fastapi import APIRouter

router = APIRouter(prefix="/complaints", tags=["Complaints"])

# Endpoints will be re-implemented in the Complaint CRUD phase.
