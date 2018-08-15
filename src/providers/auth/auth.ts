import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import * as firebase from 'firebase/app';


@Injectable()
export class AuthProvider {

  constructor(private facebook: Facebook, private angularFireAuth: AngularFireAuth ) {  }

  loginComFace(){
    return this.facebook.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
      return this.angularFireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
    });
  }

  logOff() {
  if (this.angularFireAuth.auth.currentUser.providerData.length) {
    for (var i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++) {
      var provider = this.angularFireAuth.auth.currentUser.providerData[i];

      if (provider.providerId == firebase.auth.FacebookAuthProvider.PROVIDER_ID) { // Se for facebook
        return this.facebook.logout()
          .then(() => {
            return this.signOutFirebase();
          })
      }
    }
  }

  return this.signOutFirebase();
  }

  private signOutFirebase() {
    return this.angularFireAuth.auth.signOut();
  }

}
