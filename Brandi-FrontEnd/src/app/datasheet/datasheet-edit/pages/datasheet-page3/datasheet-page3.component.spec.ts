import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetPage3Component } from './datasheet-page3.component';

describe('DatasheetPage3Component', () => {
  let component: DatasheetPage3Component;
  let fixture: ComponentFixture<DatasheetPage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetPage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
