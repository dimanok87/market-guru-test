import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetTableOptions, TableData, TableDataGetterService} from './services/table-data-getter.service';
import {ControlOptionsInterface, FieldOptionsInterface} from "./interfaces/table-options";

@Component({
  selector: 'ngd-smart-table',
  templateUrl: './ngd-smart-table.html',
  styleUrls: ['./ngd-smart-table.scss']
})
export class NgdSmartTableComponent implements OnInit {

  private _fieldsOptions?: FieldOptionsInterface[];

  @Input()
  set fieldsOptions(fields: FieldOptionsInterface[]|undefined) {
    this._fieldsOptions = fields;
    if (!fields) return;

    const filters = Object.keys(this.tableFilters);
    if (filters.find((fieldName: string) => {
      return !fields.find((newField: FieldOptionsInterface) => {
        return newField.name === fieldName;
      })
    })) {
      this.applyFilters();
    }
  }

  get fieldsOptions(): FieldOptionsInterface[]|undefined {
    return this._fieldsOptions ;
  }

  @Input('controlsOptions') public controlsOptions?: {
    pageSize: ControlOptionsInterface,
    toBegin: ControlOptionsInterface,
    toEnd: ControlOptionsInterface,
    nextPage: ControlOptionsInterface,
    prevPage: ControlOptionsInterface,
    choosePage: ControlOptionsInterface
  };


  @Input('dataUrl') dataUrl?: string;
  @Input('paginationOptions') paginationOptions?: number[];

  @Output('clickTableItem') clickTableItem = new EventEmitter<any>();

  public tableFilters: any = {};
  public tablePagination: {
    pagesArr: any[],
    pageSize?: number
  } = {
    pagesArr: [],
  };

  public tableState: {
    orderBy?: string;
    order?: 1|-1;
    queryFilters?: object,
  } = {
    queryFilters: this.tableFilters
  };

  public withFilters = false;

  public tableData?: TableData;
  public isPendingData: boolean = false;

  constructor(
    private tableDataGetterService: TableDataGetterService
  ) {}

  private updateTableData(page?: number): void {
    if (this.dataUrl) {
      this.isPendingData = true;

      const requestOptions: GetTableOptions = {
        url: this.dataUrl
      };

      if (this.tableState.orderBy) {
        requestOptions.orderBy = this.tableState.orderBy;
        requestOptions.order = this.tableState.order;
      }

      const allFilteredFields = Object.keys(this.tableFilters);

      allFilteredFields.forEach((fieldName: string) => {
        const fieldIsExists = this.fieldsOptions ? !!this.fieldsOptions.find((field: FieldOptionsInterface) => {
          return field.name === fieldName;
        }) : false;
        if (!this.tableFilters[fieldName] || !fieldIsExists) {
          delete this.tableFilters[fieldName];
          return;
        }
        if (!requestOptions.filters || !requestOptions.queryFilters) {
          requestOptions.filters = [];
          requestOptions.queryFilters = [];
        }
        requestOptions.filters.push(fieldName);
        requestOptions.queryFilters.push(this.tableFilters[fieldName]);
      });

      if (page) {
        requestOptions.page = page;
      }

      requestOptions.sizePerPage = Number(this.tablePagination.pageSize);

      this.tableDataGetterService.getTableData(requestOptions).then((data: TableData) => {
        this.tableData = data;
        this.tablePagination.pagesArr = new Array(data.maxPages).fill(1);
      }, () => {
        this.tableData = undefined;
      }).finally(() => {
        this.isPendingData = false;
      });
    }
  }

  public toPage(page: number) {
    this.updateTableData(page);
  }

  public sortBy(field: FieldOptionsInterface): void {
    if (!field.sort) return;
    if (this.tableState.orderBy === field.name) {
      if (this.tableState.order === 1) {
        this.tableState.order = -1;
      } else {
        delete this.tableState.orderBy;
        delete this.tableState.order;
      }
    } else {
      this.tableState.orderBy = field.name;
      this.tableState.order = 1;
    }
    this.updateTableData();
  }

  public applyFilters(): void {
    this.updateTableData();
  }

  public setPageSize() {
    this.updateTableData();
  }

  public callEventEmitter(tableItem: any) {
    if (this.clickTableItem) {
      this.clickTableItem.emit(tableItem);
    }
  }

  ngOnInit(): void {
    if (this.fieldsOptions) {
      this.withFilters = !!this.fieldsOptions.find((field: FieldOptionsInterface) => {
        return field.filter;
      });
    }
    if (this.paginationOptions) {
      this.tablePagination.pageSize = this.paginationOptions[Math.floor(this.paginationOptions.length / 2)];
    }
    this.updateTableData();
  }
}

