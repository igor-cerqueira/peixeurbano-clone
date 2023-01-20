import { ItemCarrinho } from "./item-carrinho.model"

export class Pedido {
  // constructor (
  //   endereco: string,
  //   numero: string,
  //   complemento: string,
  //   formaPagamento: string,
  // ){}

  endereco!: string
  numero!: string
  complemento!: string
  formaPagamento!: string
  itens!: Array<ItemCarrinho>


}
