import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias = [
    "business", "entertainment", "general", "health", "science", "sports", "technology"
  ];

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.segment.value = this.categorias[0];

    this.cargarNoticias(this.categorias[0]);

  }

  cambioCategoria(event) {
    this.noticias = [];
    //console.log(event.detail.value);
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event?) {

    this.noticiasService.getToplinesCategoria(categoria)
      .subscribe(data => {
        //console.log(data.articles);
        this.noticias.push(...data.articles);

        if(event){
          event.target.complete();
        }

      });
  }

  loadData(event){
  this.cargarNoticias(this.segment.value, event);
  }

}
