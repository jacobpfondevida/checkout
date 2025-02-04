from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from schemas import Order
import json

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("data/menu.json") as f:
    menu = json.load(f)

@app.get("/")
async def root():
    return {"message": "landing page!"}

@app.get("/menu")
async def root():
    return menu

@app.post("/order")
async def create_order(order: Order):
    try:
        with open("data/orders.json", "a") as f:
            f.write(json.dumps(order.model_dump()) + "\n")

        return{
            "status_code": 200,
            "message": "Order received!",
            "order": order.model_dump()
        }
    
    except Exception as e:
        return{
            "status_code": 400,
            "message": f"Bad Request: {e}",
            "order": order.model_dump()
        }