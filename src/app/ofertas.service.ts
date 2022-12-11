import { URL_API } from './../app.api';
import { Oferta } from "./shared/oferta.model"
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { firstValueFrom } from 'rxjs';
import { AppModule } from "./app.module"

@Injectable()
export class OfertasService {

  // private url_api:string = 'http://localhost:3000/ofertas'

  constructor(private http: HttpClient){}

  getOfertas(): Promise<Oferta[]> {
    // efetuar uma requisição http
    return firstValueFrom(this.http.get(`${URL_API}ofertas?destaque=true`))
    .then((resposta: any) => resposta)
    // retornar um promise Oferta[]
  }

  getOfertasPorCategoria(categoria: string) : Promise<Oferta[]>{
    return firstValueFrom(this.http.get(`${URL_API}ofertas?categoria=${categoria}`))
    .then((resposta: any) => resposta)
  }

  getOfertaPorId(id: number): Promise<Oferta> {
    return firstValueFrom(this.http.get(`${URL_API}ofertas?id=${id}`))
      .then((resposta:any) => {
        // console.log(resposta.shift())
        // console.log(resposta[0])
        // return resposta.shift()
        return resposta[0]
      })
  }

  getComoUsarOfertaPorId(id: number): Promise<string> {
    return firstValueFrom(this.http.get(`${URL_API}como-usar?id=${id}`))
    .then((resposta:any) => {
      // console.log(resposta[0].descricao)
      return resposta[0].descricao
    })
  }

  getOndeFicaOfertaPorId(id: number): Promise<string> {
    return firstValueFrom(this.http.get(`${URL_API}onde-fica?id=${id}`))
    .then((resposta:any) => {
      // console.log(resposta[0].descricao)
      return resposta[0].descricao
    })
  }
}
