import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetComponent } from './datasheet.component';
import { DatasheetPage1Component } from './pages/datasheet-page1/datasheet-page1.component';
import { DatasheetPage2Component } from './pages/datasheet-page2/datasheet-page2.component';

describe('DatasheetComponent', () => {
  let component: DatasheetComponent;
  let fixture: ComponentFixture<DatasheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetComponent,  DatasheetPage1Component,DatasheetPage2Component]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
