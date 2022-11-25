import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserManagementService } from 'src/app/shared/api/user-management.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-covid-form',
  templateUrl: './covid-form.component.html',
  styleUrls: ['./covid-form.component.css']
})
export class CovidFormComponent implements OnInit {
  user = JSON.parse(sessionStorage.getItem("user"));

  formConfig = Utils.getCovidScreeningFormConfig()['default'];

  form = this.fb.group({
    userId: this.user.id,
    name: `${this.user.firstName} ${this.user.lastName}`,
    phone: this.user.phone,
    email: this.user.emailId,
    workingFromHome: ['', [Validators.required]],
    symptomatic: ['', [Validators.required]],
    declarationSigned: ['', [Validators.required]]
  });

  validationMessages = {
    "workingFromHome": {
      "required": "Required"
    },
    "symptomatic": {
      'required': 'Required'
    },
    "declarationSigned": {
      'required': 'Required'
    }
  };

  enableForm = true;
  get controls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  };

  constructor(private fb: FormBuilder, private apiService: UserManagementService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("covidDeclarationSigned") === '1') {
      this.enableForm = false;
      this.disableInputs();
    }
  }

  onSubmitScreening() {
    const declaration = this.form.value;
    declaration.userId = parseInt(declaration.userId);
    declaration.workingFromHome = parseInt(declaration.workingFromHome);
    declaration.symptomatic = parseInt(declaration.symptomatic);
    declaration.declarationSigned = parseInt(declaration.declarationSigned);
    this.apiService.addSelfDeclaration(declaration).then(res => {
      this.showDefaultLandingPage()
      sessionStorage.setItem("covidDeclarationSigned", '1');
    }).catch(err => console.error(err));
  }

  showDefaultLandingPage() {
    if (this.user.role == "1") {
      window.location.href = "/admin/dashboard/property";
    } else if (this.user.role == "2") {
      window.location.href = "/admin/dashboard/department";
    } else if (this.user.role == "3") {
      window.location.href = "/admin/dashboard/employees";
    } else if (this.user.role == "4") {
      window.location.href = "/admin/dashboard/employees";
    }

  }

  disableInputs() {
    this.form.get('workingFromHome').disable();
    this.form.get('symptomatic').disable();
    this.form.get('declarationSigned').disable();
  }
}

