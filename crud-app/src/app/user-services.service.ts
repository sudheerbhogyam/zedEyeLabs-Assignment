import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


// const endpoint = 'http://192.168.25.17:8080/OutBoundZEL/';
const endpoint = 'http://127.0.0.1:3000/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private http:HttpClient) { }

  loginUser(fdata):Observable<any>{
   
    return this.http.post<any>(endpoint+'signin',fdata);
                               
  }
  addUser(fdata):Observable<any>{
   
    return this.http.post<any>(endpoint+'addUser',fdata,this.getToken());
                               
  }
  addNewUser(fdata):Observable<any>{
   
    return this.http.post<any>(endpoint+'addNewUser',fdata);
                               
  }
  getUserlist():Observable<any>{
  
    return this.http.get<any>(endpoint+'getAllUsers',this.getToken());
                               
  }
  getSingleUser(id):Observable<any>{
  
    return this.http.get<any>(endpoint+'getSingleData/'+id,this.getToken());
                               
  }
  updateSingleUser(id,fdata):Observable<any>{
  
    return this.http.put<any>(endpoint+'updateUser/'+id,fdata,this.getToken());
                               
  }
  deleteUser(id):Observable<any>{
    return this.http.delete<any>(endpoint+'deleteSingleData/'+id,this.getToken());
  }
  getToken(){
    let token = new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem("token"));
    const headerObj = { headers: token };
    return headerObj;
  }
}
