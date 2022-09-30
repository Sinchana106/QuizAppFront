import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Usercredentials } from '../usercredentials';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token!:String;

  error!:string;
  message!:string;
  constructor(private authenticationService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(userCredentials:Usercredentials){
    console.log(userCredentials.userName,userCredentials.password);
    this.authenticationService.login(userCredentials).subscribe(data=>{
      console.log(data);
      this.token = data;
      localStorage.setItem('username',userCredentials.userName.toString());
      localStorage.setItem('token','Bearer '+this.token.toString());
      this.router.navigate(['welcome']);
    },
    error=>{
      if(error instanceof ProgressEvent){
        this.error="Server error";
      }
      else{
      this.error=error;
      this.error = this.error.substring(1,this.error.length-1).split(":")[1].split(",")[0];
      this.error = this.error.substring(1,this.error.length-1);
      }
    })
  }

}