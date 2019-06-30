import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetPage7Component } from './datasheet-page7.component';

describe('DatasheetPage7Component', () => {
  let component: DatasheetPage7Component;
  let fixture: ComponentFixture<DatasheetPage7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetPage7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetPage7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
