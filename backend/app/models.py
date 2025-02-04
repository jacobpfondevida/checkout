from pydantic import BaseModel

class MenuItem(BaseModel):
    id: int
    name: str
    price: float
    category: str
    image: str

class Payment(BaseModel):
    name: str
    card: str

class Order(BaseModel):
    items: list[MenuItem]
    total: float
    payment: Payment