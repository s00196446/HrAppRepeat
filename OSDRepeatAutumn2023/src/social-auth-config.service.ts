import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class SocialAuthConfigService {

  constructor() { }
}

export function provideConfig(): SocialAuthServiceConfig {
  return {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('520063126761-vqufpeetsefdhkn1tjp39v0fh0277igo.apps.googleusercontent.com')
      }
    ]
  } as SocialAuthServiceConfig;
}
