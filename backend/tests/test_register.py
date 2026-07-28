import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.mark.asyncio
async def test_register_user_success():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        payload = {
            "full_name": "Ayush Jha",
            "email": "ayush_test_unique_1@test.com",
            "password": "Password@123"
        }
        response = await client.post("/api/v1/auth/register", json=payload)
        assert response.status_code == 201
        data = response.json()
        assert data["success"] is True
        assert data["message"] == "User registered successfully"
        assert data["data"]["email"] == "ayush_test_unique_1@test.com"
        assert data["data"]["full_name"] == "Ayush Jha"
        assert data["data"]["role"] == "VIEWER"
        assert "id" in data["data"]


@pytest.mark.asyncio
async def test_register_duplicate_email():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        payload = {
            "full_name": "Ayush Jha",
            "email": "ayush_test_unique_2@test.com",
            "password": "Password@123"
        }
        # First registration
        res1 = await client.post("/api/v1/auth/register", json=payload)
        assert res1.status_code == 201

        # Second registration with duplicate email
        res2 = await client.post("/api/v1/auth/register", json=payload)
        assert res2.status_code == 400
        data = res2.json()
        assert data["success"] is False
        assert data["message"] == "Email already exists"
        assert data["data"] is None


@pytest.mark.asyncio
async def test_register_invalid_password_policy():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Short password
        res = await client.post("/api/v1/auth/register", json={
            "full_name": "Ayush Jha",
            "email": "ayush_short@test.com",
            "password": "Pass1@"
        })
        assert res.status_code == 422
        data = res.json()
        assert data["success"] is False
        assert "Password must be at least 8 characters long" in data["message"]

        # Missing uppercase
        res_no_upper = await client.post("/api/v1/auth/register", json={
            "full_name": "Ayush Jha",
            "email": "ayush_noupper@test.com",
            "password": "password@123"
        })
        assert res_no_upper.status_code == 422
        assert "Password must contain at least 1 uppercase letter" in res_no_upper.json()["message"]

        # Missing special character
        res_no_special = await client.post("/api/v1/auth/register", json={
            "full_name": "Ayush Jha",
            "email": "ayush_nospecial@test.com",
            "password": "Password123"
        })
        assert res_no_special.status_code == 422
        assert "Password must contain at least 1 special character" in res_no_special.json()["message"]
