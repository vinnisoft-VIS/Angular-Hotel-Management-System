import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from 'src/app/shared/api/user-management.service';

@Component({
  selector: 'app-security-question',
  templateUrl: './security-question.component.html',
  styleUrls: ['./security-question.component.css']
})
export class SecurityQuestionComponent implements OnInit {

  // securityQuestionForm: FormGroup;

  userDetails = JSON.parse(sessionStorage.getItem("registeration-details"));;
  questions = [];
  answer: string;
  selectedQuestion;

  constructor(
    private apiService: UserManagementService,
    // private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { 
  }

  ngOnInit(): void {
    if (!this.userDetails) {
      this.router.navigate(['/register']);
    };
    this.getSecurityQuestions();
  }

  getSecurityQuestions() {
    this.spinner.show();
    return this.apiService.getSecurityQuestions().subscribe(response => {
      this.spinner.hide();
      this.questions = response;
    }, error => console.log(error))
  }

  onClickSubmit() {
    this.spinner.show();
    this.userDetails.SecurityAnswer = [{
      "QuestionId": this.selectedQuestion.Id,
      "Answer": this.answer
    }]

    this.apiService.registerUser(this.userDetails).subscribe(response => {
          this.spinner.hide();

          if(response.Status == true) {
            // this.router.navigate(['/']);
            sessionStorage.removeItem("registeration-details");
            this.toastr.success("Registered Successfully, Please confirm you email.", 'Success', {
              timeOut: 3000,
            });
            this.router.navigate(['/']);
          } else if (response.Status == false) {
            if (response.Message == "User Already Exists. Please login or click on forget password to get password on registered emailid!!") {
              this.toastr.error("User Already Exists. Please login or click on forgot password.", 'Error', {
                timeOut: 3000,
              });
            } else {
              this.toastr.error(response.Message, 'Error', {
                timeOut: 3000,
              });
            }
          }

        }, error => console.log(error));
  }

}
