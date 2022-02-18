import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgdSmartTableComponent } from './ngd-smart-table.component';

describe('NgdSmartTableComponent', () => {
  let component: NgdSmartTableComponent;
  let fixture: ComponentFixture<NgdSmartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgdSmartTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgdSmartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
