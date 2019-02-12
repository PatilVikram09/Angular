import { Product } from "../components/productformcomponent/app.product.model";
import { Injectable } from "@angular/core";

@Injectable()
export class SampleService{
    getProducts():Array<Product>{
        let products:Array<Product>;
        products = new Array<Product>();
        products.push(new Product(101,"P1","C1",120000,false));
        products.push(new Product(102,"P2","C2",10000,false));
        return products
    }
}