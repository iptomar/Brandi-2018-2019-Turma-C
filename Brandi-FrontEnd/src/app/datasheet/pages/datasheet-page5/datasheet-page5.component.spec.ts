import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetPage5Component } from './datasheet-page5.component';

describe('DatasheetPage5Component', () => {
  let component: DatasheetPage5Component;
  let fixture: ComponentFixture<DatasheetPage5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetPage5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetPage5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
