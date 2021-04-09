import { TestBed } from '@angular/core/testing';

import { WebDevCertificateService } from './web-dev-certificate.service';

describe('WebDevCertificateService', () => {
  let service: WebDevCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebDevCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
