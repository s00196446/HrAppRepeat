import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent }, // Default route
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard], data: {role: 'admin'}},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'create', component: EmployeeCreateComponent, canActivate: [AuthGuard], data: {role: 'admin'} },
  { path: 'signin', component: SigninComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

