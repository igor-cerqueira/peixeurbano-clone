import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.scss'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  @ViewChild('formulario') formulario!: NgForm

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {

  }


  confirmarCompra():void{
    console.log(this.formulario)
  }
}
