import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent }  from './login/login.component.ts';
import { SignupComponent }  from './signup/signup.component.ts';
import { UserListComponent} from './userlist/userlist.component.ts';
import { UserInfoComponent} from './userinfo/userinfo.component.ts';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { 
        path: 'userlist', 
        component: UserListComponent,
        children: [
          { path: '', component: UserListComponent }, 
          { path: 'user/:id', component: UserInfoComponent }
        ]
      },
      { path: '', component: LoginComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}