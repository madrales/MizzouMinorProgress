import { TestBed } from '@angular/core/testing';

import { ComputerScienceMinorService } from './computer-science-minor.service';

describe('ComputerScienceMinorService', () => {
  let service: ComputerScienceMinorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputerScienceMinorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
