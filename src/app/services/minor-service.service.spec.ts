import { TestBed } from '@angular/core/testing';

import { MinorServiceService } from './minor-service.service';

describe('MinorServiceService', () => {
  let service: MinorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
