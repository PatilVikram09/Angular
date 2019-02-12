import{Products,Product} from "./app.product.model";
export class ProductLogic{

    private products:Array<Product>;

    constructor(){
        this.products = Products;
    }

    getProducts():Array<Product>{
        return this.products;
    }

    saveProDuct(p:Product):Array<Product>{
        this.products.push(p);
        return this.products;
    }
}