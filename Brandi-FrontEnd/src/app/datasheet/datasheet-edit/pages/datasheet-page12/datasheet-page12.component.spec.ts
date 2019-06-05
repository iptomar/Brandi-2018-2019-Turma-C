import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetPage12Component } from './datasheet-page12.component';

describe('DatasheetPage12Component', () => {
  let component: DatasheetPage12Component;
  let fixture: ComponentFixture<DatasheetPage12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetPage12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetPage12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
