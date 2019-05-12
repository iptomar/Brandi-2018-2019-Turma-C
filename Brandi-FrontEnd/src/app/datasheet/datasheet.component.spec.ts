import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetComponent } from './datasheet.component';
import { DatasheetPage1Component } from './pages/datasheet-page1/datasheet-page1.component';
import { DatasheetPage2Component } from './pages/datasheet-page2/datasheet-page2.component';
import { DatasheetPage3Component } from './pages/datasheet-page3/datasheet-page3.component';
import { DatasheetPage4Component } from './pages/datasheet-page4/datasheet-page4.component';
import { DatasheetPage5Component } from './pages/datasheet-page5/datasheet-page5.component';
import { DatasheetPage6Component } from './pages/datasheet-page6/datasheet-page6.component';
import { DatasheetPage7Component } from './pages/datasheet-page7/datasheet-page7.component';
import { DatasheetPage8Component } from './pages/datasheet-page8/datasheet-page8.component';

describe('DatasheetComponent', () => {
  let component: DatasheetComponent;
  let fixture: ComponentFixture<DatasheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetComponent,  DatasheetPage1Component,
        DatasheetPage2Component, DatasheetPage3Component, DatasheetPage4Component,
        DatasheetPage5Component, DatasheetPage6Component, DatasheetPage7Component,
        DatasheetPage8Component]
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
