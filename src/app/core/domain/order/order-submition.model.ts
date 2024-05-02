interface OrderItem {
    name: string;
    quantity: number;
    img: string;
    price: number;
    product: string;
}

interface ShippingAddress {
    fullName: string;
    mobile:string;
    address: string;
    city: string;
    zipcode: string;
    country: string;
    state:string;
    email:string;
}

export interface OrderSubmitionModel {
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
}