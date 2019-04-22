import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingTableComponent } from './missing-table.component';

describe('MissingTableComponent', () => {
  let component: MissingTableComponent;
  let fixture: ComponentFixture<MissingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
