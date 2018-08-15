import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              private authService: AuthProvider) {

  }

  loginComFace() {
    this.authService.loginComFace()
      .then(() => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error) => {
        this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
          .present();
      });
  }

}
