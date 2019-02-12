import { AbstractControl } from "@angular/forms";
import { Product} from "./../productformcomponent/app.product.model";
import{ ProductLogic } from "./../productformcomponent/app.product.logic";

export class NumericValidator{
    // 1. static method
    // 2. i/p parameter must be used carefully
    // 3. return type is "any"
    product: Product;
    private logic: ProductLogic;
    products: Array<Product>;


    static checkNonNegative(ctrl:AbstractControl):any{
        if (parseInt(ctrl.value) > 0) {
            return null; // valid
          } else {
            return { invalid: true }; // invalid
          }
    }

    static checkUniqueProductId(id:AbstractControl):any{
        var proId : number = id.value;
        var logic = new ProductLogic();
        let products = new Array<Product>();
        products = logic.getProducts();
        
        for(var i=0; i<products.length; i++){
            //console.log(products[i].ProductId)
            if(proId==products[i].ProductId){
                return { notUnique: true };
            }
        }
    }

    
}

export class StringValidator{

    static checkFirstLetter(str:AbstractControl):any{
        //console.log(ctrl.value);
        var proName : string = str.value;
        if(proName.charAt(0).toUpperCase()===proName.charAt(0)){
            return null; 
        } else {
            return { uppcase: true }; 
        }
    }

    static checkSpaces(str:AbstractControl):any{
        var proName : string = str.value;
        if((proName.split(" ").length-1)<3){
            return null;
        } else{
            return { space: true };
        }
    }
}

export class SelectionValidator{

    static checkSelection(opt:AbstractControl):any{
        var selectedopt : string = opt.value;
       // console.log("Opt : "+selectedopt);

       if(selectedopt!==""){
            return null;
       }
       else{
            return { optrequired: true };
       }
    }
}