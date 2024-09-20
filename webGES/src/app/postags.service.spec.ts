import { TestBed } from '@angular/core/testing';

import { PostagsService } from './postags.service';

describe('PostagsService', () => {
  let service: PostagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
