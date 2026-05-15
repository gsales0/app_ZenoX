import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-formgroup',
  imports: [FormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './formgroup.html',
  styleUrl: './formgroup.css',
})
export class Formgroup {
  @Input() i: any; // A configuração da coluna (o seu c.type, c.field, etc)
  @Input() dataRow: any; // O objeto inteiro da linha sendo editada
  @Input() dataConsult: boolean = false; // Flag para bloquear os campos
  @Input() dataLookups: any = {}; // Os dados de lookup para preencher os selects

  // SAÍDAS: O que o componente avisa para o Pai
  @Output() onLookupFocus = new EventEmitter<any>();

  // Função para disparar o evento de lookup
  lookup() {
    if (this.i.lookup) {
        this.onLookupFocus.emit(this.i.lookup);
    }
  }
}
