import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  urlPagina: string = 'https://danielromeroag.web.app/';

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
  }
  AbrirPagina() {
    const browser = this.iab.create(this.urlPagina, '_system');
  }

}
