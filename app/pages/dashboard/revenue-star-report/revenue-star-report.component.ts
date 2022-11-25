import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserManagementService } from 'src/app/shared/api/user-management.service';

@Component({
  selector: 'app-revenue-star-report',
  templateUrl: './revenue-star-report.component.html',
  styleUrls: ['./revenue-star-report.component.css']
})
export class RevenueStarReportComponent implements OnInit {
  isActual = 1;
  @ViewChild('selectProperty') div: any;
  selectedProperty: any = "Select Property";
  selectedPropertyArray = [];
  propertyButton: any;
  loggedInUser = JSON.parse(sessionStorage.getItem("user"));
  properties = [];

  constructor(private apiService: UserManagementService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.getPropertyList();
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.isActual = 1;
    }
    if (event.index === 2) {
      this.isActual = 0;
    }
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
