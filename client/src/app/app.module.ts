import { APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ApiService } from './api/services/api.service';
import { ToastService } from './api/services/toast-service';
import { SessionService } from './api/services/session-service';
import { StartupService } from './api/services/startup.service';
import { UserService } from './api/services/user.service';
import { SiteLoaderComponent } from './site-loader/site-loader.component';
import { SharedCommonModule } from './shared-common/shared-common.module';

export function startupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        SharedCommonModule
    ],
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        SiteLoaderComponent
    ],
    providers: [
        AuthGuard,
        ApiService,
        ToastService,
        SessionService,
        StartupService,
        UserService,
        {
            // Provider for APP_INITIALIZER
            provide: APP_INITIALIZER,
            useFactory: startupServiceFactory,
            deps: [StartupService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
