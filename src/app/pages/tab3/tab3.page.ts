import { Component, OnInit } from '@angular/core';
import { DatalocalService } from 'src/app/services/datalocal.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  sliderOpt =
    {
      allowSlidePrev: false,
      allowslideNext:false

    }

  constructor(public datalocalService: DatalocalService) {


  }

  ngOnInit() {

  }


}
