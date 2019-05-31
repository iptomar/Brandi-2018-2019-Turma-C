import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetPage11Component } from './datasheet-page11.component';

describe('DatasheetPage11Component', () => {
  let component: DatasheetPage11Component;
  let fixture: ComponentFixture<DatasheetPage11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetPage11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetPage11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
