import { TestBed } from '@angular/core/testing';

import { ServerImitationService } from './server-imitation.service';

describe('ServerImitationService', () => {
  let service: ServerImitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerImitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
