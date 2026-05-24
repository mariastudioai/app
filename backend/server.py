from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security setup
JWT_SECRET = os.environ.get('JWT_SECRET', 'dev-secret-change-me')
JWT_ALGO = 'HS256'
JWT_TTL_DAYS = 7

pwd_ctx = CryptContext(schemes=['bcrypt'], deprecated='auto')
bearer_scheme = HTTPBearer(auto_error=False)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------------- Legacy status routes ---------------- #
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "MARI.A Launch API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# ---------------- Auth models ---------------- #
class SignupRequest(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)

    @field_validator('name')
    @classmethod
    def strip_name(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError('Name cannot be empty')
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserPublic(BaseModel):
    id: str
    name: str
    email: EmailStr
    created_at: datetime


class AuthResponse(BaseModel):
    token: str
    user: UserPublic


# ---------------- Helpers ---------------- #
def hash_password(password: str) -> str:
    return pwd_ctx.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    try:
        return pwd_ctx.verify(password, hashed)
    except Exception:
        return False


def create_token(user_id: str, email: str) -> str:
    payload = {
        'sub': user_id,
        'email': email,
        'exp': datetime.now(tz=timezone.utc) + timedelta(days=JWT_TTL_DAYS),
        'iat': datetime.now(tz=timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)


def decode_token(token: str) -> dict:
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])


def user_to_public(doc: dict) -> UserPublic:
    return UserPublic(
        id=doc['id'],
        name=doc['name'],
        email=doc['email'],
        created_at=doc['created_at'],
    )


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
) -> dict:
    if credentials is None or not credentials.credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Missing token')
    try:
        payload = decode_token(credentials.credentials)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token expired')
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid token')
    user_id = payload.get('sub')
    user_doc = await db.users.find_one({'id': user_id})
    if not user_doc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='User not found')
    return user_doc


# ---------------- Auth endpoints ---------------- #
@api_router.post('/auth/signup', response_model=AuthResponse, status_code=201)
async def signup(payload: SignupRequest):
    email_lc = payload.email.lower().strip()
    existing = await db.users.find_one({'email': email_lc})
    if existing:
        raise HTTPException(status_code=409, detail='An account with this email already exists')

    user_doc = {
        'id': str(uuid.uuid4()),
        'name': payload.name.strip(),
        'email': email_lc,
        'password_hash': hash_password(payload.password),
        'created_at': datetime.now(tz=timezone.utc),
    }
    await db.users.insert_one(user_doc)
    token = create_token(user_doc['id'], user_doc['email'])
    return AuthResponse(token=token, user=user_to_public(user_doc))


@api_router.post('/auth/login', response_model=AuthResponse)
async def login(payload: LoginRequest):
    email_lc = payload.email.lower().strip()
    user_doc = await db.users.find_one({'email': email_lc})
    if not user_doc or not verify_password(payload.password, user_doc['password_hash']):
        raise HTTPException(status_code=401, detail='Invalid email or password')
    token = create_token(user_doc['id'], user_doc['email'])
    return AuthResponse(token=token, user=user_to_public(user_doc))


@api_router.get('/auth/me', response_model=UserPublic)
async def me(current=Depends(get_current_user)):
    return user_to_public(current)


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
