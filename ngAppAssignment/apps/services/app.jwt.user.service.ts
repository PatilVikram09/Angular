import{Injectable} from "@angular/core";
import{Http,Response,Headers,RequestOptions} from "@angular/http";
import{Observable} from "rxjs";
import{User} from "./../components/jwtcomponent/app.user.model";


@Injectable()
export class UserService{

    url:string;

    constructor(private http:Http){
        this.url = "http://localhost:4070";
    }

    checkusername(uname:string):Observable<Response>{
        let resp:Observable<Response>;

        resp = this.http.get(`${this.url}/api/users/check/${uname}`);
        return resp;
    }

    signIn(user:User):Observable<Response>{
        //console.log("In Service :"+ JSON.stringify(user))

        let resp:Observable<Response>;
        let header:Headers = new Headers({"Content-Type":"application/json"});
      
        let options:RequestOptions = new RequestOptions();
        options.headers = header;

        resp = this.http.post(`${this.url}/api/users/auth`,JSON.stringify(user),options);
    
        return resp;
    }

    signUp(user:User):Observable<Response>{
        //console.log("In Service :"+ JSON.stringify(user))

        let resp:Observable<Response>;
        let header:Headers = new Headers({"Content-Type":"application/json"});
      
        let options:RequestOptions = new RequestOptions();
        options.headers = header;

        resp = this.http.post(`${this.url}/api/users/create`,JSON.stringify(user),options);
    
        return resp;
    }



}