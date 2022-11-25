import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { endOfDay, endOfWeek, isSameDay, isSameMonth, startOfDay, startOfWeek } from 'date-fns';
import moment from 'moment';
import { Subject } from 'rxjs';
import { UserManagementService } from 'src/app/shared/api/user-management.service';
import { MonthlyRevenueReport } from 'src/app/shared/models/revenue-report.model';
import { RevenueService } from 'src/app/shared/services/revenue.service';
import { AppSettings } from 'src/assets/configs/app-settings.config';

@Component({
  selector: 'app-revenue-on-books',
  templateUrl: './revenue-on-books.component.html',
  styleUrls: ['./revenue-on-books.component.css']
})
export class RevenueOnBooksComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('selectProperty') div: any;

  selected = new FormControl(1);

  CalendarView = CalendarView;

  view = CalendarView.Month;

  viewDate = new Date();

  externalEvents: CalendarEvent[] = [];

  events: CalendarEvent[] = [];

  activeDayIsOpen = false;

  refresh = new Subject<void>();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  isWeekView = false;

  revenueOnBooks: any = [];
  day: string;
  monthlyStat: MonthlyRevenueReport[] = [{ property: 'YYZMS', revenue: '12345', rooms: 263, day: '01-NOV-2021' }];
  weeklyStat: MonthlyRevenueReport[] = [{ property: 'YYZMS', revenue: '12345', rooms: 263, day: '01-NOV-2021' }];
  daysOfTheWeek = AppSettings.DAYS_OF_THE_WEEK;
  currentStartWeek: any;
  currentEndWeek: any;
  filters = { rooms: true, revenue: true, occupancy: true };
  activeTab: number;
  selectedProperty: any = "Select Property";
  selectedPropertyArray = [];
  propertyButton: any;
  loggedInUser = JSON.parse(sessionStorage.getItem("user"));
  properties = [];

  constructor(private apiService: UserManagementService,
    public dialog: MatDialog,
    private modal: NgbModal,
    public cd: ChangeDetectorRef,
    private renderer: Renderer2,
    public revenueService: RevenueService) { }

  ngOnInit(): void {
    this.getPropertyList();
    this.getMonthlyRevenueReport(moment(this.viewDate).format('MMM'), moment(this.viewDate).format('YYYY'));
  }

  getDay() {
    return this.viewDate;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    var wholeRevenueObject: any;

    for (let i = 0; i < events.length; i++) {
      events[i].id = wholeRevenueObject
    }
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      this.day = moment(this.viewDate).format('DD-MMM-YYYY');
      this.getMonthlyRevenueReport(moment(this.viewDate).format('MMM'), moment(this.viewDate).format('YYYY'));
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event)
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'sm' });
  }

  getEvents() {
    this.events = [];
    for (let i = 0; i < this.revenueOnBooks.length; i++) {
      let startDate: any;
      let EndDate: any;

      let dateSplit = this.revenueOnBooks[i].CreateDate.split(" ");

      if (dateSplit.length === 2) {
        startDate = dateSplit[1];
        EndDate = dateSplit[1];

      } else if (dateSplit.length === 3) {
        if (dateSplit[0] == "") {
          startDate = dateSplit[2];
          EndDate = dateSplit[2];

        } else if (dateSplit[2] == "") {
          startDate = dateSplit[1];
          EndDate = dateSplit[1];
        }
      } else if (dateSplit.length === 5 && dateSplit.includes("TOTAL")) {
        startDate = dateSplit[2];
        EndDate = dateSplit[4];
      }

      this.events.push({
        title: `Revenue on Book: ${this.revenueOnBooks[i].BookRooms}`,
        end: new Date(startDate),
        start: new Date(EndDate),
        draggable: false,
        id: this.revenueOnBooks[i],
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      })
    }

    this.events = [...this.events];

    this.cd.detectChanges();
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    if (view == CalendarView.Week) {
      this.isWeekView = true;
    } else {
      this.isWeekView = false;
    }
    this.view = view;
  }

  viewDateChange(day) {
    this.activeDayIsOpen = false;
    if (this.activeTab === 1) {
      if (this.view === 'day') {
        this.day = moment(day).format('DD-MMM-YYYY');
      }
      if (this.view === 'month') {
        this.getMonthlyRevenueReport(moment(this.viewDate).format('MMM'), moment(this.viewDate).format('YYYY'));
      }
      if (this.view === 'week') {
        this.getWeeklyRevenueReport();
      }
    }
  }

  eventDropped({ event, newStart, newEnd, allDay, }: CalendarEventTimesChangedEvent): void {
    let temp = JSON.parse(JSON.stringify(event));
    temp.start = newStart;

    let foundEvent = this.events.find(item => {
      return (item.title == temp.title && new Date(item.start) === new Date(temp.start))
    })

    if (!foundEvent) {
      this.events.push(temp);
    }

    if (newEnd) {
      event.end = newEnd;
    }
    if (this.view === 'week') {
      this.viewDate = newStart;
      this.day = moment(this.viewDate).format('DD-MMM-YYYY');
      this.activeDayIsOpen = true;
    } if (this.view === 'day') {
      this.day = moment().format('DD-MMM-YYYY');
    } else {
      this.getMonthlyRevenueReport(moment(this.viewDate).format('MMM'), moment(this.viewDate).format('YYYY'));
    }
    this.events = [...this.events];
  }

  externalDrop(event: CalendarEvent) {
    this.events.splice(this.events.indexOf(event), 1);
    this.events = [...this.events];
  }

  inlineCalendarUpdated(day) {
    this.viewDate = day;
    this.day = moment(day).format('DD-MMM-YYYY');
  }


  getDailyStat(cell) {
    return this.isWeekView ? this.weeklyStat.filter(d => d.day.localeCompare(moment(cell.date).format('DD-MMM-YYYY')) === 1)
      : this.monthlyStat.filter(d => d.day.localeCompare(moment(cell.date).format('DD-MMM-YYYY')) === 1);
  }

  onTabChanged(event: MatTabChangeEvent) {
    this.activeTab = event.index;
    if (event.index === 0) { this.view = CalendarView.Month; }
  }

  getMonthlyRevenueReport(month: string, year: string) {
    this.revenueService.getMonthlyRevenueReport(month, year).subscribe(mR => this.monthlyStat = mR);
  }

  getWeeklyRevenueReport() {
    this.revenueService.getWeeklyRevenueReport(this.getWeek().toString()).subscribe(wR => this.weeklyStat = wR);
  }

  getWeek() {
    this.currentStartWeek = new Date(startOfWeek(this.viewDate));
    this.currentEndWeek = new Date(endOfWeek(this.viewDate));
    var dateArray = [];
    var currentDate = this.currentStartWeek;
    while (currentDate <= this.currentEndWeek) {
      dateArray.push(`'${moment(currentDate).format('DD-MMM-YYYY')}'`);
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    return dateArray;
  }

  createSelectedPropertyButton() {
    if (this.selectedPropertyArray.includes(this.selectedProperty.Id)) return;
    this.propertyButton = this.renderer.createElement('button');
    const buttonText = this.renderer.createText(this.selectedProperty.PropertyName);
    this.renderer.setAttribute(this.propertyButton, "id", this.selectedProperty.Id);
    this.selectedPropertyArray.push(this.selectedProperty.Id);

    const closeButton = this.renderer.createElement('i');

    //  fa fa-times close
    this.renderer.addClass(this.propertyButton, "btn");
    this.renderer.addClass(this.propertyButton, "btn-light");
    this.renderer.addClass(this.propertyButton, "buttons-excel");
    this.renderer.addClass(this.propertyButton, "buttons-html5");
    this.renderer.addClass(this.propertyButton, "alert-padd");
    this.renderer.addClass(this.propertyButton, "alert");
    this.renderer.addClass(this.propertyButton, "alert-success");
    this.renderer.addClass(this.propertyButton, "alert-dismissible");
    this.renderer.addClass(this.propertyButton, "fade");
    // this.renderer.addClass(button, "selected-property-button");
    this.renderer.addClass(this.propertyButton, "show");
    this.renderer.setStyle(this.propertyButton, "width", "auto");
    this.renderer.setStyle(this.propertyButton, "min-width", "100px");

    this.renderer.addClass(closeButton, "fa");
    this.renderer.addClass(closeButton, "fa-times");
    this.renderer.addClass(closeButton, "close");
    this.renderer.setAttribute(closeButton, "data-dismiss", "alert");
    this.renderer.listen(closeButton, 'click', (event) => {
      this.onClickClose(+event.target.parentElement.id);
    })

    this.renderer.appendChild(this.propertyButton, buttonText);
    this.renderer.appendChild(this.propertyButton, closeButton);

    this.renderer.appendChild(this.div.nativeElement, this.propertyButton);
  }

  onClickClose(removedItem: any) {
    const removedItemIndex = this.selectedPropertyArray.indexOf(removedItem);
    if (removedItemIndex > -1) {
      this.selectedPropertyArray.splice(removedItemIndex, 1);
    }
  }

  getPropertyList() {
    const data = new HttpParams().set("userId", this.loggedInUser.id).set("skip", "0").set("take", "0");

    return this.apiService.getProperty(data).subscribe(response => {

      this.properties = response.PropertyList;

    }, error => console.log(error))
  }
}
