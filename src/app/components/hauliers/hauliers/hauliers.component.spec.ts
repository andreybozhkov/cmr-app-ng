import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HauliersComponent } from './hauliers.component';

describe('HauliersComponent', () => {
  let component: HauliersComponent;
  let fixture: ComponentFixture<HauliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HauliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HauliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
