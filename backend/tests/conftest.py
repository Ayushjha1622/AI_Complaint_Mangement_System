import asyncio
import pytest
import sys


@pytest.fixture(scope="session", autouse=True)
def event_loop_policy():
    if sys.platform == "win32":
        policy = asyncio.WindowsSelectorEventLoopPolicy()
        asyncio.set_event_loop_policy(policy)
    return asyncio.get_event_loop_policy()
