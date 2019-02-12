import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms";
import{User} from "./app.user.model";
import {UserService} from "./../../services/app.jwt.user.service";
import{Response} from "@angular/http";
import{Router} from "@angular/router";

@Component({
    selector: 'app-login-component',
    templateUrl: './app.login.view.html',
})
export class LoginComponent implements OnInit {

    user:User;
    message:any;
    frmLogin:FormGroup;

    constructor(private usrService:UserService, private router:Router) {
        this.message = "";
        this.user = new User("","","");

        this.frmLogin = new FormGroup({
            userName : new FormControl(this.user.userName, 
                                        Validators.compose([
                                            Validators.required
                                        ])
                                    ),

            password : new FormControl(this.user.password, 
                                    Validators.compose([
                                        Validators.required
                                    ])
                                )
        });
     }

    ngOnInit(): void { }

    signIn():void{
        this.user = this.frmLogin.value;
        
        this.usrService.signIn(this.user).subscribe(
            (resp:Response)=>{
                if(resp.json().token){
                    //console.log(resp.json().token)
                    sessionStorage.setItem("userToken",resp.json().token);
                    this.router.navigate(["product"]);
                }
                else{
                    this.message = resp.json().Message;
                }
                
            },
            error=>{
                console.log(`Error Occured ${error}`);
            }
        );
    }

    cancle():void{
        this.user = new User("","","");
    }

    registerUser():void{

    }
}
