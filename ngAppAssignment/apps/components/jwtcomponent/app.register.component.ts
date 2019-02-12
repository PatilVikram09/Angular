import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms";
import {User} from "./app.user.model";
import {UserService} from "./../../services/app.jwt.user.service";
import{Response} from "@angular/http";
import{Router} from "@angular/router";
import{userValidator} from "./../jwtcustomvalidator/app.custom.validator"

@Component({
    selector: 'app-register-component',
    templateUrl: './app.register.view.html'
})
export class RegisterComponent implements OnInit {
    user:User;
    message:string;
    frmUserRegi:FormGroup;

    constructor(private usrService:UserService,private router:Router) { 
        this.user = new User("","","");

        this.frmUserRegi = new FormGroup({
            userName : new FormControl(this.user.userName,
                                        Validators.compose([
                                            Validators.required,
                                            Validators.minLength(5)
                                        ])
                                    ),

            password : new FormControl(this.user.password, 
                                    Validators.compose([
                                        Validators.required
                                    ])
                                ),

            cpassword : new FormControl(this.user.cpassword, 
                                    Validators.compose([
                                        Validators.required,
                                    ])
                                ),
        });

        this.message = "";
    }

    checkUsername():void{
        this.user = this.frmUserRegi.value;
        var username = this.user.userName;

        this.usrService.checkusername(username).subscribe(
            (resp:Response)=>{
                var userdata = resp.json().data;
                if(Object.keys(userdata).length>0){
                    this.message = "Username already exist"
                }
                else{
                    console.log("username not avaliable")
                }
            },
            error=>{
                console.log(`Error Occured ${error}`);
            }
        );
    }

    signUp():void{
        this.user = this.frmUserRegi.value;
        this.usrService.signUp(this.user).subscribe(
            (resp:Response)=>{
                if(resp.json().status==200){
                    alert("User Registered Successfully")
                    this.router.navigate(["login"]);
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

    ngOnInit(): void { }
}
