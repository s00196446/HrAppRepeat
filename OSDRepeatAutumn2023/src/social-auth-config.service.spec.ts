import { TestBed } from '@angular/core/testing';

import { SocialAuthConfigService } from './social-auth-config.service';

describe('SocialAuthConfigService', () => {
  let service: SocialAuthConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialAuthConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
