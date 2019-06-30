import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetPage8Component } from './datasheet-page8.component';

describe('DatasheetPage8Component', () => {
  let component: DatasheetPage8Component;
  let fixture: ComponentFixture<DatasheetPage8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetPage8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetPage8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
