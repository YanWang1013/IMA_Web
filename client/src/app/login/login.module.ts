
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../api/services/user.service';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

@NgModule({
    imports: [
        SocialLoginModule,
        CommonModule,
        TranslateModule,
        LoginRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
        UserService,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                    '263189942868-06mskkf7qf0ms7esui2k8qeoci8vlg4i.apps.googleusercontent.com'
                  ),
                },
                {
                  id: FacebookLoginProvider.PROVIDER_ID,
                  provider: new FacebookLoginProvider('277083943523699'),
                }
              ]
            } as SocialAuthServiceConfig
          }
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}
