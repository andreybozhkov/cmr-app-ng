import { TestBed } from '@angular/core/testing';

import { RemindersTableResolverService } from './reminders-table-resolver.service';

describe('RemindersTableResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemindersTableResolverService = TestBed.get(RemindersTableResolverService);
    expect(service).toBeTruthy();
  });
});
