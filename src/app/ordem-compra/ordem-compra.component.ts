import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.scss'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  pedido: Pedido = new Pedido()
  idPedidoCompra!: number

  formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required]),
  })

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {

  }

  public confirmarCompra(): void {
    if(this.formulario.status === 'INVALID'){
      this.formulario.get('endereco')?.markAsTouched()
      this.formulario.get('numero')?.markAsTouched()
      this.formulario.get('formaPagamento')?.markAsTouched()
    } else {
      this.pedido.endereco = this.formulario.value.endereco
      this.pedido.numero = this.formulario.value.numero
      this.pedido.complemento = this.formulario.value.complemento
      this.pedido.formaPagamento = this.formulario.value.formaPagamento

      this.ordemCompraService.efetivarCompra(this.pedido)
      .subscribe((resposta: any) => {
        this.idPedidoCompra = resposta.id
        console.log(this.idPedidoCompra)
      })

    }
  }
}
