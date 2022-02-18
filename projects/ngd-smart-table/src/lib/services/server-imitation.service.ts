import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { GetTableOptions } from "./table-data-getter.service";
import { TableData } from "./table-data-getter.service";

@Injectable({
  providedIn: 'root'
})
export class ServerImitationService {

  private existsData: any;
  private readonly defaultOptions = {
    page: 1,
    sizePerPage: 10
  };

  constructor(
    private httpClient: HttpClient
  ) {

  }


  private filterData({...options}: GetTableOptions): TableData {

    let filteredData = Array.from(this.existsData);
    const filters = options.filters || [];

    if (filters.length) {
      const queryFilters = options.queryFilters || [];
      filteredData = filteredData.filter((dataItem: any) => {
        return filters.every((filter, filterIndex) => {
          let checkValue = dataItem[filters[filterIndex]];
          if (typeof checkValue !== 'string') {
            checkValue = checkValue.toString();
          }
          return checkValue.toLowerCase().indexOf(
            queryFilters[filterIndex].toLowerCase()
          ) >= 0;
        })
      });
    }

    const orderBy = options.orderBy || false;
    if (orderBy) {
      const order = options.order || 1;
      filteredData.sort((dataItem1: any, dataItem2: any) => {
        return dataItem1[orderBy] > dataItem2[orderBy] ? order :
          dataItem1[orderBy] < dataItem2[orderBy] ? -order : 0;
      });
    }

    const sizePerPage = options.sizePerPage || this.defaultOptions.sizePerPage;
    const maxPages = Math.ceil(filteredData.length / sizePerPage);
    const page = Math.min(options.page || this.defaultOptions.page, maxPages);

    const startSearch = (page - 1) * sizePerPage;

    const results = filteredData.slice(startSearch, startSearch + sizePerPage);

    return {
      results,
      page,
      maxPages,
      counts: filteredData.length
    }
  }

  public async getData(options: GetTableOptions): Promise<TableData> {
    if (!this.existsData) {
      this.existsData = await this.httpClient.get(options.url).toPromise();
    }
    return this.filterData(options);
  }

}
