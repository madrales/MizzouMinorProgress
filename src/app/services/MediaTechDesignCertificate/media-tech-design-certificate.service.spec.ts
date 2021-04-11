import { TestBed } from '@angular/core/testing';

import { MediaTechDesignCertificateService } from './media-tech-design-certificate.service';

describe('MediaTechDesignCertificateService', () => {
  let service: MediaTechDesignCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaTechDesignCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
