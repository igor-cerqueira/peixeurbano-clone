import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.scss'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  comoUsar: string = ''

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
    ) { }

  ngOnInit(): void {

    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getComoUsarOfertaPorId(parametros['id'])
        .then((resposta:string) => {
          // console.log(resposta)
          this.comoUsar = resposta
         })
    })

  }

}
