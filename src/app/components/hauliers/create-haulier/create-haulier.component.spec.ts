import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHaulierComponent } from './create-haulier.component';

describe('CreateHaulierComponent', () => {
  let component: CreateHaulierComponent;
  let fixture: ComponentFixture<CreateHaulierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHaulierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHaulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
