import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [

  { path:"", component:LoginComponent  },
  { path:"login", component:LoginComponent  },
  { path:"register", component:RegisterComponent},
  { path:"users-list", component:ManageUsersComponent},
  { path:"**", component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
