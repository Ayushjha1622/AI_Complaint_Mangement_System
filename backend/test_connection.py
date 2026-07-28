import asyncio
import sys
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

# Set event loop policy at module level on Windows for psycopg compatibility
if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

DATABASE_URL = "postgresql+psycopg://postgres:%40Ayushjha1622@localhost:5432/AI_Complaint"

engine = create_async_engine(DATABASE_URL)


async def main():
    async with engine.connect() as conn:
        result = await conn.execute(text("SELECT version();"))
        print(result.scalar())


if __name__ == "__main__":
    asyncio.run(main())

