import { Injectable } from '@angular/core';
import { ServerImitationService } from "./server-imitation.service";

export interface TableData {
  counts: number;
  page: number;
  maxPages: number;
  results: any[];
}

export interface GetTableOptions {
  url: string;

  page?: number;
  sizePerPage?: number;

  orderBy?: string;
  order?: -1|1;

  filters?: string[];
  queryFilters?: string[]
}

@Injectable({
  providedIn: 'root'
})

export class TableDataGetterService {

  constructor(
    private serverImitationService: ServerImitationService
  ) { }

  getTableData(options: GetTableOptions): Promise<TableData> {
    return this.serverImitationService.getData(options);
  }

}
