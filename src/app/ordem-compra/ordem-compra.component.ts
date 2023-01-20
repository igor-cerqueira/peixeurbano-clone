import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import  {CarrinhoService}  from '../carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.scss'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  pedido: Pedido = new Pedido()
  idPedidoCompra!: number
  itensCarrinho: ItemCarrinho[] = []
  total: number = 0

  formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required]),
  })

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
    ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
    console.log( this.itensCarrinho)

    this.totalCarrinho()
  }

  public confirmarCompra(): void {
    if(this.formulario.status === 'INVALID'){
      this.formulario.get('endereco')?.markAsTouched()
      this.formulario.get('numero')?.markAsTouched()
      this.formulario.get('formaPagamento')?.markAsTouched()
    } else {

      if(this.carrinhoService.exibirItens().length === 0){
        alert('Você não possui itens no carrinho!')
      }

      this.pedido.endereco = this.formulario.value.endereco
      this.pedido.numero = this.formulario.value.numero
      this.pedido.complemento = this.formulario.value.complemento
      this.pedido.formaPagamento = this.formulario.value.formaPagamento
      this.pedido.itens = this.carrinhoService.exibirItens()

        // console.log(this.pedido)


      this.ordemCompraService.efetivarCompra(this.pedido)
      .subscribe((resposta: any) => {
        this.idPedidoCompra = resposta.id
        this.carrinhoService.limparCarrinho()
        // console.log(this.idPedidoCompra)
      })

    }
  }

  totalCarrinho():void {
    this.total = this.carrinhoService.totalCarrinhoCompras()
  }

  adicionar(item: ItemCarrinho):void{
    this.carrinhoService.adicionarQuantidade(item)
  }

  diminuir(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item)
  }
}
