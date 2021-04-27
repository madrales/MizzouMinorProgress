import { TestBed } from '@angular/core/testing';

import { EngineeringMinorService } from './engineering-minor.service';

describe('EngineeringMinorService', () => {
  let service: EngineeringMinorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineeringMinorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
