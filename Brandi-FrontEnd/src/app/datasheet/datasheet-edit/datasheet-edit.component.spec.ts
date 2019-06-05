import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetEditComponent } from './datasheet-edit.component';
import { DatasheetPage1Component } from './pages/datasheet-page1/datasheet-page1.component';
import { DatasheetPage2Component } from './pages/datasheet-page2/datasheet-page2.component';
import { DatasheetPage3Component } from './pages/datasheet-page3/datasheet-page3.component';
import { DatasheetPage4Component } from './pages/datasheet-page4/datasheet-page4.component';
import { DatasheetPage5Component } from './pages/datasheet-page5/datasheet-page5.component';
import { DatasheetPage6Component } from './pages/datasheet-page6/datasheet-page6.component';
import { DatasheetPage7Component } from './pages/datasheet-page7/datasheet-page7.component';
import { DatasheetPage8Component } from './pages/datasheet-page8/datasheet-page8.component';
import { DatasheetPage9Component } from './pages/datasheet-page9/datasheet-page9.component';
import { DatasheetPage10Component } from './pages/datasheet-page10/datasheet-page10.component';
import { DatasheetPage11Component } from './pages/datasheet-page11/datasheet-page11.component';
import { DatasheetPage12Component } from './pages/datasheet-page12/datasheet-page12.component';

describe('DatasheetEditComponent', () => {
  let component: DatasheetEditComponent;
  let fixture: ComponentFixture<DatasheetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetEditComponent,  DatasheetPage1Component,
        DatasheetPage2Component, DatasheetPage3Component, DatasheetPage4Component,
        DatasheetPage5Component, DatasheetPage6Component, DatasheetPage7Component,
        DatasheetPage8Component, DatasheetPage9Component, DatasheetPage10Component,
        DatasheetPage11Component, DatasheetPage12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
