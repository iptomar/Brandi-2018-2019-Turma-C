import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetPage9Component } from './datasheet-page9.component';

describe('DatasheetPage9Component', () => {
  let component: DatasheetPage9Component;
  let fixture: ComponentFixture<DatasheetPage9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetPage9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetPage9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
