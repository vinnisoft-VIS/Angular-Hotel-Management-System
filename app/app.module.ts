import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
// import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SecurityQuestionComponent } from './pages/security-question/security-question.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AddClientComponent } from './shared/modals/add-client/add-client.component';
import { AddDepartmentComponent } from './shared/modals/add-department/add-department.component';
import { AddExpenseComponent } from './shared/modals/add-expense/add-expense.component';
import { AddPropertyComponent } from './shared/modals/add-property/add-property.component';
import { AddSalesActivityComponent } from './shared/modals/add-sales-activity/add-sales-activity.component';
import { AddUserComponent } from './shared/modals/add-user/add-user.component';
import { AddVendorsComponent } from './shared/modals/add-vendors/add-vendors.component';
import { ConfirmDeleteModalComponent } from './shared/modals/confirm-delete-modal/confirm-delete-modal.component';
import { CreateChecklistComponent } from './shared/modals/create-checklist/create-checklist.component';
import { CreateGuestAssistanceComponent } from './shared/modals/create-guest-assistance/create-guest-assistance.component';
import { CreatePropertyProjectComponent } from './shared/modals/create-property-project/create-property-project.component';
import { CreateScheduleComponent } from './shared/modals/create-schedule/create-schedule.component';
import { CreateTaskComponent } from './shared/modals/create-task/create-task.component';
import { CreateTemplateComponent } from './shared/modals/create-template/create-template.component';
import { CreateTimeOffRequestComponent } from './shared/modals/create-time-off-request/create-time-off-request.component';
import { EditUserComponent } from './shared/modals/edit-user/edit-user.component';
import { ManageGuestAssistanceComponent } from './shared/modals/manage-guest-assistance/manage-guest-assistance.component';
import { ManageTimeOffRequestComponent } from './shared/modals/manage-time-off-request/manage-time-off-request.component';
import { SendVendorEmailComponent } from './shared/modals/send-vendor-email/send-vendor-email.component';
import { UpdateChecklistComponent } from './shared/modals/update-checklist/update-checklist.component';
import { UpdateDepartmentComponent } from './shared/modals/update-department/update-department.component';
import { UpdatePropertyComponent } from './shared/modals/update-property/update-property.component';
import { ViewEmployeeComponent } from './shared/modals/view-employee/view-employee.component';
import { ViewProjectComponent } from './shared/modals/view-project/view-project.component';
import { ViewVendorComponent } from './shared/modals/view-vendor/view-vendor.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    UserDashboardComponent,
    EditUserComponent,
    AddUserComponent,
    ConfirmDeleteModalComponent,
    SecurityQuestionComponent,
    UpdatePasswordComponent,
    AddPropertyComponent,
    UpdatePropertyComponent,
    ViewEmployeeComponent,
    AddDepartmentComponent,
    UpdateDepartmentComponent,
    UpdateChecklistComponent,
    CreateChecklistComponent,
    CreateTemplateComponent,
    CreateScheduleComponent,
    CreateGuestAssistanceComponent,
    CreateTimeOffRequestComponent,
    ManageTimeOffRequestComponent,
    ManageGuestAssistanceComponent,
    CreateTaskComponent,
    CreatePropertyProjectComponent,
    AddVendorsComponent,
    ViewProjectComponent,
    SendVendorEmailComponent,
    ViewVendorComponent,
    AddExpenseComponent,
    AddSalesActivityComponent,
    AddClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
    RouterModule,
    MatDialogModule,
    MatPaginatorModule,
    DashboardModule,
    NgxPaginationModule,
    NgbModalModule,
    NgbModule,
    PipesModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    FlexLayoutModule,
    NgMultiSelectDropDownModule,
    LayoutModule,
    DpDatePickerModule

  ],
  entryComponents: [EditUserComponent],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
