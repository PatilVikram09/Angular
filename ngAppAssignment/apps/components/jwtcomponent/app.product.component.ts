import { Component, OnInit } from '@angular/core';
import{Product,Categories} from './app.product.model';
import{ProductService} from './../../services/app.jwt.products.service';
import{Response} from "@angular/http";
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms";
import{Router} from "@angular/router";

@Component({
    selector: 'app-product-component',
    templateUrl: './app.product.view.html'
})
export class ProductComponent implements OnInit {
    
    product:Product;
    products: Array<Product>;
    token:string;
    message:string;
    isSaved:boolean;
    categories = Categories;
    frmProduct : FormGroup;

    constructor(private productServ:ProductService, private router:Router) {
       this.product = new Product(0,"","","",0); 
       this.products = new Array<Product>();
       this.token = sessionStorage.getItem("userToken");
       //console.log(this.token)
       this.message="";
       this.isSaved = false;

       this.frmProduct = new FormGroup({
            ProductId : new FormControl(this.product.ProductId, 
                                            Validators.compose([Validators.required,
                                                Validators.pattern("[0-9]+"),
                                                Validators.minLength(2),
                                                Validators.maxLength(5)
                                            ])
                                        ),
            ProductName : new FormControl(this.product.ProductName,
                                                Validators.compose([
                                                    Validators.pattern("[a-zA-Z ]*")
                                                ])),
                                                    
            CategoryName : new FormControl(this.product.CategoryName,
                                                Validators.compose([
                                                    
                                                ])),
            
            Manufacturer : new FormControl(this.product.Manufacturer,
                                                    Validators.compose([
                                                        Validators.pattern("[a-zA-Z ]*")
                                                    ])),                                    
            Price : new FormControl(this.product.Price,
                                        Validators.compose([
                                            ])
                                    )
        });
     }

    ngOnInit(): void { 
        this.productServ.getData(this.token).subscribe(
            (resp: Response) => {
               // console.log(resp.json().data);
                this.products = resp.json().data;
              },
              error => {
                console.log(`Error Occured ${error}`);
              }
        );
        
    }

    loadForm(): void {
        this.product= new Product(0, "", "","",0);
        this.isSaved = true;
    }

    save():void{
        this.product = this.frmProduct.value;
        this.productServ.postData(this.product,this.token).subscribe(
            (resp: Response) => {
                this.message = resp.json().Message;
              },
              error => {
                console.log(`Error Occured ${error}`);
              }
        );
    }

    update(p:Product):void{

    }

    delete(id:number){
        this.productServ.deleteData(id,this.token).subscribe(
            (resp: Response) => {
               // console.log(resp.json().Message);
                this.message = resp.json().Message;
                this.ngOnInit();
              },
              error => {
                console.log(`Error Occured ${error}`);
              }
        );
    }

    clear():void{

    }
}
