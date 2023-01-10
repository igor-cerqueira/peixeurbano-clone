import { Oferta } from './../shared/oferta.model';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
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
  // ofertas2!: Oferta[]
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .pipe(
        debounceTime(1000), //executa a ação do switchMap apos 1s
        distinctUntilChanged(), //evita fazer requisição igual
        switchMap((termo: string) => {
          // console.log('requisição http para api')

          if(termo.trim() === ''){
            //retornar um observable de array de ofertas vazio
            return of<Oferta[]>([])
          }
          return this.ofertasService.pesquisaOfertas(termo)
        }),
        catchError ((err: any) => {
          // console.log(err)
          return of<Oferta[]>([])
        })
      )

    // this.ofertas.subscribe((ofertas: Oferta[]) => {
    //   console.log(ofertas)
    //   this.ofertas2 = ofertas
    // })
  }

  pesquisa(termoDaBusca: string): void {
    // this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)
    // this.ofertas.subscribe(
    //   (oferta: Oferta[]) => console.log(oferta),
    //   (erro: any) => console.log('Erro status: ', erro.status),
    //   () => console.log('Fluxo de dados completo!')
    // )
    // da forma acima ele irá requisitar a cada tecla digitada

    // console.log('keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
  }

  limpaPesquisa():void{
    this.subjectPesquisa.next('')
  }

}
