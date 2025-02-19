export class Cart{
    items: CartItem[];
    constructor(){
        this.items = [];
    }
}

export class CartItem{
    productName: string;
    price: number;
    quantity: number;
}