interface OrderItem {
    name: string;
    quantity: number;
    img: string;
    price: number;
    product: string;
    _id: string;
}

interface ShippingAddress {
    fullName: string;
    address: string;
    city: string;
    zipcode: string;
    country: string;
    state:string;
    mobile:string;
    email:string;
}

export interface OrderModel {
    shippingAddress: ShippingAddress;
    _id: string;
    orderItems: OrderItem[];
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    user: string;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    key:string;
    orderId:string;
}