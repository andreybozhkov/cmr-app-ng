import { TestBed } from '@angular/core/testing';

import { HaulierService } from './haulier.service';

describe('HaulierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HaulierService = TestBed.get(HaulierService);
    expect(service).toBeTruthy();
  });
});
