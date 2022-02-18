import { TestBed } from '@angular/core/testing';

import { NgdSmartTableService } from './ngd-smart-table.service';

describe('NgdSmartTableService', () => {
  let service: NgdSmartTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgdSmartTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
