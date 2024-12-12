import { TestBed } from '@angular/core/testing';

import { StorageserviceTsService } from './storageservice.ts.service';

describe('StorageserviceTsService', () => {
  let service: StorageserviceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageserviceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
