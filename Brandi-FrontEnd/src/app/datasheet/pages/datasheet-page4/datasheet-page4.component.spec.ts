import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetPage4Component } from './datasheet-page4.component';

describe('DatasheetPage4Component', () => {
  let component: DatasheetPage4Component;
  let fixture: ComponentFixture<DatasheetPage4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetPage4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetPage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
