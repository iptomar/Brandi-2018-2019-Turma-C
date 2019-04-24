import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasheetCreateComponent } from './datasheet-create.component';

describe('DatasheetCreateComponent', () => {
  let component: DatasheetCreateComponent;
  let fixture: ComponentFixture<DatasheetCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasheetCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasheetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
