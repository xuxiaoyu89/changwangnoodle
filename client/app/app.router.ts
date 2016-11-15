import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent }  from './login/login.component.ts';
import { SignupComponent }  from './signup/signup.component.ts';
import { UserListComponent} from './userlist/userlist.component.ts';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'users', component: UserListComponent},
      { path: '', component: LoginComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}