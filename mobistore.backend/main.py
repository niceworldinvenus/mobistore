from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db, engine
import models
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
import hashlib
from sqlalchemy.orm import joinedload
from typing import List
import os


# Create tables
models.Base.metadata.create_all(bind=engine)
frontend_url = os.getenv("FRONTEND_URL")
app = FastAPI()

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password Hashing Logic
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str):
    hashed_sha256 = hashlib.sha256(password.encode('utf-8')).hexdigest()
    return pwd_context.hash(hashed_sha256)

def verify_password(plain_password, hashed_password):
    hashed_sha256 = hashlib.sha256(plain_password.encode('utf-8')).hexdigest()
    return pwd_context.verify(hashed_sha256, hashed_password)

# Pydantic Schemas
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# --- ROUTES ---

@app.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=get_password_hash(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created", "id": new_user.id}

@app.post("/signin")
def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    
    if not user or not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "message": "Login successful",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }

@app.get("/user/{user_id}")
def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "name": user.name,
        "email": user.email,
        # Safe date formatting for the frontend
        "joined_at": user.created_at.isoformat() if hasattr(user, 'created_at') and user.created_at else None
    }

@app.get("/products")
def get_products(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    products = db.query(models.Product).order_by(models.Product.id).offset(skip).limit(limit).all()
    return jsonable_encoder(products)

# main.py
from typing import List
from pydantic import BaseModel

class CartItem(BaseModel):
    id: int
    price: float
    quantity: int

class OrderCreate(BaseModel):
    user_id: int
    total_amount: float
    items: List[CartItem]

@app.post("/checkout")
def checkout(order_data: OrderCreate, db: Session = Depends(get_db)):
    try:
        # 1. Create main Order entry
        new_order = models.Order(
            user_id=order_data.user_id,
            total_amount=order_data.total_amount,
            status="Completed"
        )
        db.add(new_order)
        db.commit() # This generates the Order ID
        db.refresh(new_order)

        # 2. Add individual items to OrderItems table
        for item in order_data.items:
            order_item = models.OrderItem(
                order_id=new_order.id,
                product_id=item.id,
                quantity=item.quantity,
                price_at_purchase=item.price
            )
            db.add(order_item)
        
        db.commit()
        return {"order_id": new_order.id, "created_at": new_order.created_at}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/orders/{user_id}")
def get_user_orders(user_id: int, db: Session = Depends(get_db)):
    # Fetch orders for this user, including the items inside them
    orders = (
        db.query(models.Order)
        .options(joinedload(models.Order.items)) 
        .filter(models.Order.user_id == user_id)
        .order_by(models.Order.created_at.desc()) # Newest first
        .all()
    )
    
    if not orders:
        return []

    # Format the data for the frontend
    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "total_amount": float(order.total_amount),
            "status": order.status,
            "created_at": order.created_at.strftime("%b %d, %Y"),
            "items": [
                {
                    "product_id": item.product_id,
                    "quantity": item.quantity,
                    "price": float(item.price_at_purchase)
                } for item in order.items
            ]
        })
    
    return result