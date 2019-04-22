import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaulierDetailComponent } from './haulier-detail.component';

describe('HaulierDetailComponent', () => {
  let component: HaulierDetailComponent;
  let fixture: ComponentFixture<HaulierDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaulierDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaulierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
