import { Component } from '@angular/core';
import {
  ControlOptionsInterface,
  FieldOptionsInterface
} from "../../projects/ngd-smart-table/src/lib/interfaces/table-options";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataUrl = './assets/test-data/data.json';

  public clickTableItem(event: any) {
    const itemFieldsKeys = Object.keys(event);
    let itemInfo = itemFieldsKeys.reduce((str: string, key: string) => {
      str += key + ': ' + event[key] + ';\n';
      return str;
    }, '');


    alert(itemInfo);
  }

  public fieldsOptions: FieldOptionsInterface[] = [
    {name: 'id', label: 'ID', sort: true, filter: true},
    {name: 'image', labelForLegend: 'Icon', type: 'icon'},
    {name: 'availability', label: 'Availability'},
    {name: 'brandId', label: 'Brand ID', sort: true, filter: true},
    {name: 'brandName', label: 'Brand Name', sort: true, filter: true},
    {name: 'name', label: 'Name', sort: true, filter: true},
    {name: 'nomenclature', label: 'Nomenclature', sort: true, filter: true},
    {name: 'ordered', label: 'Order', sort: true, defaultSort: true},
    {name: 'orderedAmount', label: 'Ordered Amount', sort: true},
    {name: 'reviewsCount', label: 'Reviews', sort: true},
    {name: 'sku', label: 'SKU', sort: true, filter: true},
    {name: 'soldAmount', label: 'Sold Amount', sort: true},
    {name: 'soldQuantity', label: 'Sold Quantity', sort: true},
    {name: 'wbRating', label: 'Rating', sort: true}
  ];

  public tablePageSizes = [5, 7, 10, 15, 20];

  public controlsOptions: ControlOptionsInterface[] = [
    {name: 'pageSize', label: 'Size per page', enable: true},
    {name: 'toBegin', label: 'To begin', enable: true},
    {name: 'toEnd', label: 'To end', enable: true},
    {name: 'nextPage', label: 'Next page', enable: true},
    {name: 'prevPage', label: 'Previous page', enable: true},
    {name: 'choosePage', label: 'Choose page', enable: true},
  ];

  public tableFieldsOptions: FieldOptionsInterface[] = [];
  public tableControlsOptions?: any;

  title = 'market-guru-test';

  constructor() {
    this.fieldsOptions.forEach((field: FieldOptionsInterface) => {
      field.enable = true;
      this.tableFieldsOptions.push(field);
      this.tableControlsOptions = {};
      this.controlsOptions.forEach((control: ControlOptionsInterface) => {
        this.tableControlsOptions[control.name] = control;
      })
    });
  }

  public applyFieldsList(): void {
    this.tableFieldsOptions = this.fieldsOptions.filter((field: FieldOptionsInterface) => {
      return field.enable;
    });
  }


}
