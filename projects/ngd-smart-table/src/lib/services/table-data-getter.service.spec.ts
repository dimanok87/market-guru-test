import { TestBed } from '@angular/core/testing';

import { TableDataGetterService } from './table-data-getter.service';

describe('TableDataGetterService', () => {
  let service: TableDataGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
