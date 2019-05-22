import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetPage1Component } from './datasheet-page1.component';

describe('DatasheetPage1Component', () => {
  let component: DatasheetPage1Component;
  let fixture: ComponentFixture<DatasheetPage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetPage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
