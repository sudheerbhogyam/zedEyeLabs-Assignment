import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../user-services.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  usersdata;
  usersdataLength;
  editmodal: any = {};
  usermodal: any = {};
  editId;
  tokenkey;
  deleteid;
  constructor(private api: UserServicesService, private router: Router, public toastr: ToastrManager) { }

  ngOnInit() {
    if (sessionStorage.getItem("token"))
      this.loadUsers();
    else
      this.router.navigate(['']);
  }
  loadUsers() {
    this.api.getUserlist().subscribe(data => {
      this.usersdata = data;
      this.usersdataLength = this.usersdata.length;
    })
  }
  editUser(id) {
    this.editId = id;
    this.api.getSingleUser(id).subscribe(data => {
      this.editmodal = data[0];
    })
  }
  onUpdateSubmit() {
    this.api.updateSingleUser(this.editId, this.editmodal).subscribe(data => {
      console.log(data);
      if(data.affectedRows != 0){
        this.ngOnInit();
        this.showSuccess('User updated Succesfully.');
      }
      else{
        this.showError("Error while Updating User!");
      }

    },
    error => this.showError("Error while Updating User!"))
  }
  addUser() {
    this.api.addUser(this.usermodal).subscribe(data => {
      console.log(data);
      if (data.affectedRows != 0) {
        this.ngOnInit();
        this.showSuccess('User Added Succesfully.');
      }
      else{
        this.showError("Error while adding User!")
      }
    }
    ,
      error => this.showError("Error while adding User!"))
  }
  deleteUser(id) {
    this.deleteid = id;
  }
  confirmDelete() {
    this.api.deleteUser(this.deleteid).subscribe(data => {
      console.log(data);

      if (data.affectedRows != 0) {
        this.ngOnInit();
        this.showSuccess('User deleted Succesfully.');
      }
      else {
        this.showError("Error while Deleting User!");
      }

    },

      error => this.showError("Error while Deleting User!"))
  }
  showSuccess(message) {
    this.toastr.successToastr(message, 'Success!');
  }
  showError(message) {
    this.toastr.errorToastr(message, 'Error!');
  }


}
