/* Importing modules */

// Angular modules
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// app services
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { LoginComponent } from './app/components/login/login.component';
import { SignupComponent } from './app/components/signup/signup.component';

bootstrapApplication(AppComponent);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: HomeComponent }, // ← OK
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ]),
  ],
});