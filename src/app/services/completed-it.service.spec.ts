import { TestBed } from '@angular/core/testing';

import { CompletedITService } from './completed-it.service';

describe('CompletedITService', () => {
  let service: CompletedITService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedITService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
