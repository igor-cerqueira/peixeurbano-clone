import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.ofertasService.getComoUsarOfertaPorId(this.route.parent?.snapshot.params['id'])
      .then((resposta:string) => {
        // console.log(resposta)
        this.comoUsar = resposta
       })
  }

}
