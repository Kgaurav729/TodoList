import aiosqlite
import asyncio

DB_NAME = "todos.db"  # change this if your DB path is different

async def migrate():
    async with aiosqlite.connect(DB_NAME) as db:
        await db.execute("ALTER TABLE todos ADD COLUMN status TEXT DEFAULT 'pending'")
        await db.commit()
        print("Migration applied successfully.")

if __name__ == "__main__":
    asyncio.run(migrate())
