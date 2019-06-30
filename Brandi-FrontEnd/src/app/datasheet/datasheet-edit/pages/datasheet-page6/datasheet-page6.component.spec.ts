import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetPage6Component } from './datasheet-page6.component';

describe('DatasheetPage6Component', () => {
  let component: DatasheetPage6Component;
  let fixture: ComponentFixture<DatasheetPage6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetPage6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetPage6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
