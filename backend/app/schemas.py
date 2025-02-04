from pydantic import BaseModel

class MenuItem(BaseModel): 
    category_id: int
    id: int
    image_id: str
    name: str
    price: float
    quantity: int

class Payment(BaseModel):
    name: str
    card_number: str
    expiry_month: str
    expiry_year: str
    cvv: str

class Order(BaseModel):
    items: list[MenuItem]
    total: float
    payment: Payment