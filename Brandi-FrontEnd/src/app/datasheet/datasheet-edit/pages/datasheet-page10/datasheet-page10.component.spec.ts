import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetPage10Component } from './datasheet-page10.component';

describe('DatasheetPage10Component', () => {
  let component: DatasheetPage10Component;
  let fixture: ComponentFixture<DatasheetPage10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetPage10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetPage10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
