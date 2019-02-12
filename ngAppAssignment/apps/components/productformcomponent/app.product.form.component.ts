import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms";
import { Product, Categories} from "./app.product.model";
import { ProductLogic } from "./app.product.logic";
import{NumericValidator,StringValidator, SelectionValidator} from "./../../components/customervalidator/app.custom.validator";

@Component({
    selector: 'app-product-form-component',
    templateUrl: './app.product.form.view.html'
})
export class ProductFormComponent implements OnInit {
    //The OnInit is component Lifecycle Interface
    //This provides ngOnInit() method

    product: Product;
    private logic: ProductLogic;
    products: Array<Product>;
    //categories locally
    categories = Categories;
    tableHeaders: Array<string>;
    isSaved : boolean;
     //Define FormGroup
    frmProduct : FormGroup;

    isChecked: Boolean;
    count: number = 0;
    check: boolean;

    constructor() { 
        this.product = new Product(0,"","",0,false);
        this.logic = new ProductLogic();
        this.products = new Array<Product>();
        this.tableHeaders = new Array<string>();
        this.isSaved = false;
        this.isChecked = false;

        // Define an instance of FormGroup and map property of model class 
        //i.e Product class with FormCOntrol
        this.frmProduct = new FormGroup({
            ProductId : new FormControl(this.product.ProductId, 
                                            Validators.compose([Validators.required,
                                                Validators.pattern("[0-9]+"),
                                                Validators.minLength(2),
                                                Validators.maxLength(5),
                                                NumericValidator.checkUniqueProductId
                                            ])
                                        ),
            ProductName : new FormControl(this.product.ProductName,
                                                Validators.compose([
                                                    Validators.pattern("[a-zA-Z ]*"),
                                                    StringValidator.checkFirstLetter,
                                                    StringValidator.checkSpaces,
                                                ])),
                                                    
            CategoryName : new FormControl(this.product.CategoryName,
                                                Validators.compose([
                                                    SelectionValidator.checkSelection
                                                ])),
            Price : new FormControl(this.product.Price,
                                        Validators.compose([
                                            NumericValidator.checkNonNegative])
                                    )
        });
    }

    //The method will be invoked immediately after constructor
    ngOnInit(): void { 
        //read all properties of product class and push them in table array
        for(let p in this.product){
            this.tableHeaders.push(p);
        }

        this.products = this.logic.getProducts();
    }
    
    clear():void{
        this.product = new Product(0, "", "",0,false);
    }

    save():void {
        // read form values using "fromControlName" under 
        this.product = this.frmProduct.value;
        this.products = this.logic.saveProduct(this.product);
        this.isSaved = false;
       // alert(JSON.stringify(this.product));
    }

    loadForm(): void {
        this.product= new Product(0, "", "",0,false);
        this.isSaved = true;
    }

     getselectedrow(p: Product): void {
         // 1. create a deep copy of the selected product
         // 2. assign that copy to this.roduct
         this.product = Object.assign({},p);
     }

     allChecks():void{
        if(this.isChecked){
            for(let p of this.products){
                p.check = true;
            }
            this.count = this.products.length;
        }
        else{
            for(let p of this.products){
                p.check = false;
            }
            this.count = 0;
        }
     }

     getChecked(p:Product):void{
        
        if(p.check){
            p.check = false;
            this.count = this.count-1;
        }
        else{
            p.check = true;
            this.count = this.count+1;
        }

        if(this.count===this.products.length){
            this.isChecked = true;
        }
        else{
            this.isChecked = false;
        }
        console.log(this.count)
     }

     deleteProducts():void{
        let deletePro: Array<number> = new Array<number>();

        for(let p of this.products){
            if(p.check){
                deletePro.push(this.products.indexOf(p));
            }
        }

        for(let i=deletePro.length-1; i>=0;i--){
            this.products.splice(deletePro[i],1);
            //console.log(deletePro[i])
        }
     }
}

