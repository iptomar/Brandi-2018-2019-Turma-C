import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetPage2Component } from './datasheet-page2.component';

describe('DatasheetPage2Component', () => {
  let component: DatasheetPage2Component;
  let fixture: ComponentFixture<DatasheetPage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetPage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
