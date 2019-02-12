import { Component, OnInit } from '@angular/core';
import{Categories} from "./app.product.model";
import{Product} from "./../../models/app.product.model";
import{ProductService} from "./../../services/app.products.service";
import{Response} from "@angular/http";


@Component({
    selector: 'app-prductservice-component',
    templateUrl: './app.product.view.html',
})
export class ProductServiceComponent implements OnInit {

    product:Product;
    products:Array<Product>;
    categories= Categories;
    tableHeaders:Array<string>;
    filteredProducts:Array<Product>;

    constructor(private serv:ProductService) {
        this.product = new Product("",0,"","","",0);
        this.products = new Array<Product>();
        this.tableHeaders = new Array<string>();
     }

    ngOnInit(): void { 
        for(let p in this.product){
            this.tableHeaders.push(p);
        }

        this.serv.getData().subscribe(
            (resp: Response) => {
              this.products = resp.json();
              //console.log(resp.json().data);
              this.products = resp.json().data;
            },
            error => {
              console.log(`Error Occured ${error}`);
            }
          );
        
    }

    save():void{
        if(!this.product._id){
                this.serv.postData(this.product).subscribe(
                (resp: Response) => {
                    //console.log(resp.json().data);
                    this.products.push(resp.json().data);
                    this.clear();
                    
                },
                error => {
                    console.log(`Error Occured ${error}`);
                }
            );
        }
        else{
            this.serv.putData(this.product.ProductId,this.product).subscribe(
                (resp:Response)=>{
                    this.clear();
                    this.ngOnInit();
                },error=>{
                    console.log(`Error Occured ${error}`);
                }
            );
        }
    }

    update(p: Product): void {
        this.product = Object.assign({}, p);
    }

    delete(pid:number):void{
        this.serv.deleteData(pid).subscribe(
            (resp:Response)=>{
                this.ngOnInit();
            },error=>{
                    console.log(`Error Occured ${error}`);
                }
        )
    }
    

    clear():void{
        this.product = new Product("",0,"","","",0);
    }

    search(searchValue : string):void{
        console.log("Value : "+searchValue)
        /*this.serv.serchData(searchValue).subscribe(
            (resp:Response)=>{
                this.products = resp.json().data;
            },error=>{
                    console.log(`Error Occured ${error}`);
                }
        )*/

        this.filteredProducts = this.products.filter(x=>x.CategoryName==searchValue || x.Manufacturer ==searchValue)
        console.log(this.filteredProducts)
       // this.products = this.filteredProducts
       
    }

}
