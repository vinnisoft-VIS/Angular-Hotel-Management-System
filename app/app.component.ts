import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from './shared/api/user-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InnCommander';

  startTime = new Date().getTime();

  constructor(
    private apiService: UserManagementService,
    // private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    // public route: ActivatedRoute
  ) { }

  @HostListener('document:click', ['$event'])
  clickout(event) {

    if (new Date().getTime() - this.startTime < 900000) {
      this.startTime = new Date().getTime();
    } else {
      this.apiService.logout().then((res: any) => {
        this.spinner.hide();

        if (res.success) {
          this.router.navigate(['/']);
        } else {
          this.toastr.error("Something went wrong..", 'Error', {
            timeOut: 3000,
          });
        }
        this.startTime = new Date().getTime();

      })

    }
  }
}
