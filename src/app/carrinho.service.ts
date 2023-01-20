import { Oferta } from './shared/oferta.model';
import { ItemCarrinho } from "./shared/item-carrinho.model"
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

class CarrinhoService {
  itens: ItemCarrinho[] = []

  exibirItens(): ItemCarrinho[] {
    return this.itens
  }

  incluirItem(oferta: Oferta): void {
    let itemCarrinho: ItemCarrinho = new ItemCarrinho()
    itemCarrinho.id = oferta.id
    itemCarrinho.img = oferta.imagens[0]
    itemCarrinho.titulo = oferta.titulo
    itemCarrinho.descricao_oferta = oferta.descricao_oferta
    itemCarrinho.valor = oferta.valor
    itemCarrinho.quantidade = 1

    // verificar se o item já existe dentro de this.itens
    let itemCarrinhoEncontrado = this.itens.find((item:ItemCarrinho) => item.id === itemCarrinho.id)

    if(itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1
    } else {
      this.itens.push(itemCarrinho)
    }

  }

  totalCarrinhoCompras(): number {
    let total:number = 0

    this.itens.map((item: ItemCarrinho) => {
      total = total + (item.valor * item.quantidade)
    })
    return total
  }

  adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
    console.log(itemCarrinho)

    // incrimentar quantidade
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

    if(itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1
    }
  }

  diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
    console.log(itemCarrinho)

    // decrementar quantidade
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

    if(itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade -= 1

      if(itemCarrinhoEncontrado.quantidade === 0) {
        this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
      }
    }
  }

  limparCarrinho(): void{
    this.itens = []
  }
}

export { CarrinhoService }
