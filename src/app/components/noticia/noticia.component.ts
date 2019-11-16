import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { DatalocalService } from 'src/app/services/datalocal.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;

  @Input() indice: number;

  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private datalocalService: DatalocalService,
    private platform: Platform,
    private toastCtrl: ToastController) { }

  ngOnInit() { }

  abrirNoticia() {
    //console.log('Noticia ', this.noticia.url); 
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if (this.enFavoritos) {
      //borrar de favoritos
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('borrar de favorito');
          this.presentToast('Borrado de favoritos');
          this.datalocalService.borrarNoticia(this.noticia);
        }
      }
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('favorito');
          this.presentToast('Agregado a favoritos');
          this.datalocalService.guardarNoticia(this.noticia);
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({

      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.compartirNoticia();
        }
      },
        guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  compartirNoticia() {

    if (this.platform.is('cordova')) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {
      if (navigator['share']) {
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('No se pudo compartir porque no se soporta');
        this.presentToast('No se pudo compartir porque no se soporta');
      }
    }

  }




  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


}
