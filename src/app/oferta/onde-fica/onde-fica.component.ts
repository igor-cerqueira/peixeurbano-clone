import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';


@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.scss'],
  providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

  ondeFica: string = ''
  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
    ) { }

  ngOnInit(): void {

    this.route.params.subscribe((parametro: Params) => {
      this.ofertasService.getOndeFicaOfertaPorId(parametro['id'])
      .then((resposta:string) => {
        // console.log(resposta)
        this.ondeFica = resposta
      })
    })

  }

}
