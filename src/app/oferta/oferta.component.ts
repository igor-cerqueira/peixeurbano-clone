import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';
import { interval, Observable, Observer, Subscription } from 'rxjs';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  // private tempoObservableSubscription!: Subscription
  // private meuObservableSubscription!: Subscription

  oferta!: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
    ) { }

  ngOnInit(): void {
    // é dessa forma que recuperamos com o método snapshot os parametros contidos na rota ativa da nossa aplicação. o snapshot ele tira uma foto do que está acontecendo ou seja se houver alteração ele nao irá atualizar
    // console.log('ID recuoerado da rota:', this.route.snapshot.params['id'])

    this.route.params.subscribe((paramatros: Params) => {

      this.ofertasService.getOfertaPorId(paramatros['id'])
        .then(( oferta: Oferta ) => {
          this.oferta = oferta
          // console.log(oferta)
        })
    })


    // é dessa forma que recuperamos com método de subscribe os parametros conttidos na rota ativa. A diferença é que o subscribe irá ficar observando toda e qualquer mudança que venha a acontecer
    // this.route.params.subscribe((parametro: any) => {
    //   console.log(parametro.id)
    // })

    // this.route.params.subscribe(
    //   (parametro: any) => {console.log(parametro)},
    //   (erro: any) => console.log(erro),
    //   () => console.log('processamento foi classificado como concluido')
    // )

    // exemplo de observable infinito:
    // let tempo = interval(2000)

    // this.tempoObservableSubscription = tempo.subscribe((intervalo:number) => {
    //   console.log(intervalo)
    // })

    // exepplo de ciclo de uma stram:
    // observable (observável)
    // let meuObservable = Observable.create((observer: Observer<number>) => {
    //   observer.next(1)
    //   observer.next(2)
    //   observer.complete()
    //   observer.error('algum erro foi encontrado na stream de eventos')
    //   observer.next(3)
    // } )

    // observable (observador)
    // this.meuObservableSubscription = meuObservable.subscribe(
    //   (resultado: any) => console.log(resultado + 1),
    //   (erro: string) => console.log(erro),
    //   () => console.log('eventro de stream finalizada')
    // )
    // primeira função será para o andamento, a segunda em caso de eventual erro, a terceira a conclusão
  }

  ngOnDestroy(): void {
    // this.meuObservableSubscription.unsubscribe()
    // this.tempoObservableSubscription.unsubscribe()
  }

}
