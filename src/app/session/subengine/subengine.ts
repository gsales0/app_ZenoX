import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { columnsGrid, dataForm } from '../engine/interfaces';
import { EngineService } from '../../services/engine-service';
import { Formgroup } from '../formgroup/formgroup';

@Component({
  selector: 'app-subengine',
  imports: [CommonModule, FormsModule, Formgroup],
  templateUrl: './subengine.html',
  styleUrl: './subengine.css',
})
export class Subengine implements OnInit{

  @Input() dataSub: any = {}
  @Input() table: string = ''
  @Input() supKey: string = ''
  @Input() subKey: string = ''
  
  @Input() subForm: dataForm[] = []
  @Input() subColumns: columnsGrid[] = [] 

  @Input() subGrid: any[] = []
  @Output() subGridChange = new EventEmitter<any[]>()

  subLookups : any = { }

  subScreen: boolean = false
  @Input() subConsult: boolean = false
  subUpdate: boolean = false
  subClean: any = {}

  constructor(private cdr: ChangeDetectorRef, private service: EngineService){ }

  async ngOnInit() {
    this.subClean = { ...this.dataSub }

    for(let i of this.subForm){
      if(i.type == 'lookup'){
        await this.lookup(i.lookup)
      }
    }
  }

  async btnIncluir(){
    this.dataSub = { ...this.subClean, ...{ ID: this.dataSub.ID }}

    for(let i of this.subForm){
      if(i.autocomplete && i.autocomplete?.type == 'codigo'){
        if(!this.subGrid || !this.subGrid.length){
          this.dataSub[i.field] = 1  
        }
        else{
          this.dataSub[i.field] = Math.max(...this.subGrid.map((x: any) => Number(x[i.field])))  + 1
        }
      }

      if(i.autocomplete?.type == 'today'){
        this.dataSub[i.field] = new Date().toLocaleDateString('en-CA');
      }
    }
    this.subScreen = true
    this.cdr.detectChanges()
  }

  btnCancelar(){
    this.dataSub = { ...this.subClean, ...{ ID: this.dataSub.ID }}
    this.subScreen = false
    this.subUpdate = false
    this.cdr.detectChanges()
  }

  btnAlterar(){
    this.dataSub = this.subGrid.find(i => i.ID == this.dataSub.ID)
    this.subScreen = true
    this.subUpdate = true
    this.cdr.detectChanges()
  }

  btnConsultar(){
    this.dataSub = this.subGrid.find(i => i.ID == this.dataSub.ID)
    this.subScreen = true
    this.cdr.detectChanges()
  }

  btnExcluir(){
    let index = this.subGrid.findIndex(i => i.ID == this.dataSub.ID)
    
    this.subGrid.splice(index, 1)
    this.dataSub.ID = 0

    for(let i = 0; i < this.subGrid.length; i++){
      this.subGrid[i].ID = i + 1
    }

    this.subGridChange.emit(this.subGrid)
    this.cdr.detectChanges()
  }

  btnSalvar(){
    this.calcInput()
    this.dataSub.ID = this.subGrid ? this.subGrid.length  + 1 : 1
    this.subGrid = this.subGrid ? [ ...this.subGrid, ...[this.dataSub] ] : [this.dataSub]
    this.subGridChange.emit(this.subGrid)
    this.btnCancelar()
  }

  btnAlteracao(){
    let index = this.subGrid.findIndex(i => i.ID == this.dataSub.ID)

    this.subGrid[index] = this.dataSub
    this.subGridChange.emit(this.subGrid)
    this.btnCancelar()
  }

  async lookup(lookup: any){
    let data = await this.service.lookup(lookup)
    this.subLookups[lookup.table] = data
    this.cdr.detectChanges()
  }

  async consultFile(){
    let data = await this.service.consultFile(this.table, this.dataSub[this.subKey])

    const byteCharacters = atob(data.ANEXO.split(',')[1]);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([new Uint8Array(byteNumbers)], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob), '_blank')
  }

  calcInput(){
    for(let i of this.subForm){
      if(i.expression){
        let func = new Function('dataSub', 'return ' + i.expression)
        this.dataSub[i.field] = func(this.dataSub)
      }
    }
  }

  async autocomplete(load: any){

    let teste = 'dataCalc' 
    let data = await this.service.autocomplete(load)
    this.dataSub = { ...this.dataSub, ...data }
    this.cdr.detectChanges()
  }

  gridLookup(ID: number, table: string){
    return this.subLookups[table]?.find((i: any) => i.ID == ID).DS
  }
}
