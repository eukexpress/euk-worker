"""
Environment Configuration Management
Loads and validates all environment variables
"""

from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "EukExpress Global Logistics"
    APP_ENV: str = "development"
    APP_SECRET_KEY: str
    APP_DEBUG: bool = False
    APP_URL: str = "http://localhost:8000"
    
    # Database
    DATABASE_URL: str
    DATABASE_POOL_SIZE: int = 20
    DATABASE_MAX_OVERFLOW: int = 40
    
    # Admin
    ADMIN_USERNAME: str = "admin"
    ADMIN_EMAIL: str = "admin@eukexpress.com"
    ADMIN_PASSWORD: str
    
    # Resend Email
    RESEND_API_KEY: str
    RESEND_FROM_EMAIL: str = "notifications@eukexpress.com"
    RESEND_FROM_NAME: str = "EukExpress Global Logistics"
    
    # File Uploads
    MAX_UPLOAD_SIZE: int = 10485760  # 10MB
    ALLOWED_EXTENSIONS: str = ".jpg,.jpeg,.png"
    UPLOAD_PATH: str = "C:/Eukexpress/frontend/uploads"
    QR_CODE_PATH: str = "C:/Eukexpress/frontend/qr_codes"
    
    # Security
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    CORS_ORIGINS: str = "http://localhost:8000,http://127.0.0.1:8000"
    
    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_PERIOD: int = 60
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "C:/Eukexpress/backend/logs/app.log"
    
    # Keep Alive (for Render)
    RENDER_APP_URL: str = "http://localhost:8000"
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"
    
    @property
    def allowed_extensions_list(self) -> List[str]:
        """Convert ALLOWED_EXTENSIONS string to list"""
        return [ext.strip() for ext in self.ALLOWED_EXTENSIONS.split(",")]
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Convert CORS_ORIGINS string to list"""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

# Create global settings instance
settings = Settings()

# Ensure directories exist
os.makedirs(os.path.dirname(settings.LOG_FILE), exist_ok=True)
os.makedirs(settings.UPLOAD_PATH, exist_ok=True)
os.makedirs(settings.QR_CODE_PATH, exist_ok=True)