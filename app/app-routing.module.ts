import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { IsLoggedInGuard } from './shared/auth/is-logged-in.guard';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { SecurityQuestionComponent } from './pages/security-question/security-question.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [IsLoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [IsLoggedInGuard] },
  { path: 'user/dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'security-question', component: SecurityQuestionComponent },
  { path: 'update-password/:id', component: UpdatePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
