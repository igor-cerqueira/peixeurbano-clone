import { Oferta } from './../shared/oferta.model';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  ofertas!: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .pipe(
        debounceTime(1000), //executa a ação do switchMap apos 1s
        switchMap((termo: string) => {
          console.log('requisição http para api')
          return this.ofertasService.pesquisaOfertas(termo)
        })
      )
    this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas))
  }

  pesquisa(termoDaBusca: string): void {
    // this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)
    // this.ofertas.subscribe(
    //   (oferta: Oferta[]) => console.log(oferta),
    //   (erro: any) => console.log('Erro status: ', erro.status),
    //   () => console.log('Fluxo de dados completo!')
    // )
    // da forma acima ele irá requisitar a cada tecla digitada

    console.log('keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
  }

}
