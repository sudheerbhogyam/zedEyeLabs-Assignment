import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../user-services.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: any = {};
  constructor(private api: UserServicesService, private router: Router,public toastr: ToastrManager) { }

  ngOnInit() {
    if (sessionStorage.getItem("token")) {
      this.router.navigate(['users-list']);
    }
    else
      this.router.navigate(['']);
  }


  onLogin() {
    this.login();
  }
  login() {
    this.api.loginUser(this.loginData).subscribe(data => {
      if (data.token) {
        sessionStorage.setItem('token', data.token);
        this.router.navigate(['users-list']);
      }
      else{
        this.showError("Login Failed");
      }
    },
    error => this.showError("Login FailedError while Deleting User!"))
  }
  register(){
    this.router.navigate(['register'])
  }
  showError(message) {
    this.toastr.errorToastr(message, 'Error!');
  }

}
