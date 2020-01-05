import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../user-services.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData: any = {};
  constructor(private api:UserServicesService,private router:Router,private toastr:ToastrManager) { }

  ngOnInit() {
    if (sessionStorage.getItem("token")) {
      this.router.navigate(['users-list']);
    }
  }
  onRegister(){
    this.api.addNewUser(this.userData).subscribe(data=>{
      console.log(data)
      if(data.affectedRows!=0){
        this.login();
      }
    },

    error => this.showError("Error while Registration"))
  }
  showError(message){
    this.toastr.errorToastr(message, 'Error!');
  }

  login(){
    this.router.navigate(['login']);
  }

}
