import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { DatePickerComponent, IDayCalendarConfig } from 'ng2-date-picker';
import { UserManagementService } from 'src/app/shared/api/user-management.service';
import { AppUser } from 'src/app/shared/models/app-user.model';
import { CovidSelfDeclaration } from 'src/app/shared/models/covid-self-declaration.model';

@Component({
  selector: 'app-covid-declarations',
  templateUrl: './covid-declarations.component.html',
  styleUrls: ['./covid-declarations.component.css']
})
export class CovidDeclarationsComponent implements OnInit {

  @ViewChild("selectDate") public selectDate: DatePickerComponent;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 0.5;
  declarations: CovidSelfDeclaration[] = [];
  filteredDeclarations: CovidSelfDeclaration[] = [];
  user: AppUser = JSON.parse(sessionStorage.getItem("user"));
  date: Date = new Date();
  symptomFilter = false;
  public datePickerConfig = <IDayCalendarConfig>{
    locale: "en",
    format: "DD.MM.YYYY",
    monthFormat: "MMMM, YYYY",
    firstDayOfWeek: "mo",
    drops: "down"
  };
  CalendarView = CalendarView;

  constructor(private apiService: UserManagementService) { }

  ngOnInit(): void {
    this.getDeclarations();
  }

  getDeclarations() {
    const departmentIds = this.user.userDepartment.map(d => { return d.departmentId }).join(',');
    const propertyIds = this.user.userProperty.map(p => { return p.propertyId }).join(',');
    this.apiService.getSelfDeclarations(this.user.id, this.user.role, departmentIds, propertyIds, this.date)
      .then(res => {
        this.declarations = res;
        if (this.symptomFilter) {
          this.filteredDeclarations = this.declarations.filter(d => d.symptomatic === 1);

        } else { this.filteredDeclarations = res; }
      })
      .catch(err => console.error(err));
  }

  onSymptomaticFilterChange(filter) {
    if (filter.currentTarget.checked) {
      this.filteredDeclarations = this.filteredDeclarations.filter(d => d.symptomatic === 1);
    } else {
      this.filteredDeclarations = this.declarations;
    }
  }

  getDate(date) {
    if (date === undefined) return;
    this.date = new Date(date);

    this.getDeclarations();

  }
}
