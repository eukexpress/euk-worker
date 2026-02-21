# Eukexpress\backend\app\main.py

"""
EukExpress Global Logistics API
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import logging
from contextlib import asynccontextmanager
from datetime import datetime

from app.api.v1 import (
    auth, dashboard, shipments, shipment_detail,
    interventions, communication, bulk_operations, public_tracking
)
from app.config import settings
from app.database import engine, Base

# Simple logging - no timestamps, just essential messages
logging.basicConfig(level=logging.INFO, format='%(message)s')
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("\n" + "="*50)
    print("🚀 EUKEXPRESS API STARTING")
    print("="*50)
    
    # Quick DB check
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Database connected")
    except Exception as e:
        print(f"❌ Database error: {e}")
    
    print("="*50 + "\n")
    yield
    
    # Shutdown
    print("\n" + "="*50)
    print("👋 EUKEXPRESS API SHUTDOWN")
    print("="*50 + "\n")

# Create FastAPI app
app = FastAPI(
    title="EukExpress API",
    description="Logistics Management Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url=None,
    openapi_url="/openapi.json",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["Dashboard"])
app.include_router(shipments.router, prefix="/api/v1/shipments", tags=["Shipments"])
app.include_router(public_tracking.router, prefix="/api/v1/public", tags=["Public"])

# Static files
os.makedirs(settings.UPLOAD_PATH, exist_ok=True)
os.makedirs(settings.QR_CODE_PATH, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_PATH), name="uploads")
app.mount("/qr", StaticFiles(directory=settings.QR_CODE_PATH), name="qr")

@app.get("/")
async def root():
    return {
        "app": "EukExpress API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "ok", "time": datetime.utcnow().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False)