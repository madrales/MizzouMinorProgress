import { TestBed } from '@angular/core/testing';

import { CyberSecurityCertificateService } from './cyber-security-certificate.service';

describe('CyberSecurityCertificateService', () => {
  let service: CyberSecurityCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CyberSecurityCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
