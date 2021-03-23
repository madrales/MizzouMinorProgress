import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CybersecCertifcatePage } from './cybersec-certifcate.page';

describe('CybersecCertifcatePage', () => {
  let component: CybersecCertifcatePage;
  let fixture: ComponentFixture<CybersecCertifcatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CybersecCertifcatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CybersecCertifcatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
