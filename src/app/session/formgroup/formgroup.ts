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
  
  @Input() i: any
  @Input() dataRow: any
  @Input() dataConsult: boolean = false
  @Input() dataLookups: any = {}
  
  @Output() onLookupFocus = new EventEmitter<any>()
  @Output() onAutocomplete = new EventEmitter<any>()

  lookup() {
    if (this.i.lookup) {
        this.onLookupFocus.emit(this.i.lookup);
    }
  }

  autocomplete(ID: any){
    if(this.i.autocomplete.type == 'change' && ID){

      let data = {
        ID: ID,
        table: this.i.lookup.table,
        fill: this.i.autocomplete.fill
      }

      this.onAutocomplete.emit(data)
    }
  }

  inputFile(event: any){
    const reader = new FileReader()
    let file = event.target.files[0]
    if(!file) return

    if(file.size > 1000000){
      alert("O limite para arquivos é de 1MB")
      event.target.value = ''
      return
    }

    if(file.type !== 'application/pdf'){
      alert("Apenas arquivos .PDF")
      event.target.value = ''
      return
    }

    reader.onload = () => {
      this.dataRow[this.i.field] = reader.result as string
    }

    reader.readAsDataURL(file)
  }
}
