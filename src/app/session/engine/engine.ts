import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EngineService } from '../../services/engine-service';
import { columnsGrid, dataForm} from './interfaces'
import { Subengine } from '../subengine/subengine';
import { Formgroup } from '../formgroup/formgroup';

@Component({
  selector: 'app-engine',
  imports: [CommonModule, FormsModule, Subengine, Formgroup],
  templateUrl: './engine.html',
  styleUrl: './engine.css',
})
export class Engine implements OnInit {

  @Input() compTitle: string = ''
  @Input() dataKey: string = ''
  @Input() table: string = ''

  @Input() dataRow: any = {}
  @Input() dataSub: any = {}

  @Input() columnsGrid: columnsGrid[] = []
  @Input() dataForm: dataForm[] = []
  @Input() subComponent: any = {}

  dataError: string = ''
  dataGrid: any[] = []
  subGrids: any = {}
  dataLookups: any = {}
  dataClean: any = {}
  
  dataScreen: boolean = false
  dataUpdate: boolean = false
  dataConsult: boolean = false

  dataSearch: any = {
    DATAKEY: '',
    COLUMNS: [],
    DS_PESQUISA: ''
  }

  @ViewChild('ngdataForm') ngdataForm ?: NgForm

  constructor(private service: EngineService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.dataClean = { ...this.dataRow }

    for(let i of this.dataForm){
      if(i.type == 'lookup'){
        this.lookup(i.lookup)
      }
    }

    this.dataSearch.DATAKEY = this.dataKey
    this.dataSearch.COLUMNS = this.columnsGrid.map(i => i.field)
  }

  async btnIncluir(){
    this.dataRow = { ...this.dataClean }

    for(let i of this.dataForm){
      if(i.autocomplete?.type == 'codigo'){
        let data = await this.service.codigo(this.table, i.field)
        this.dataRow = { ...this.dataRow, ...data }
      }

      if(i.autocomplete?.type == 'today'){
        this.dataRow[i.field] = new Date().toLocaleDateString('en-CA');
      }
    }

    Object.keys(this.subGrids).forEach(i => {
      this.dataSub[i].ID = 0
      this.subGrids[i] = []
    })

    this.dataConsult = false
    this.dataScreen = true
    this.cdr.detectChanges()
  }

  async btnSalvar(){
    let data
    this.dataError = ''

    if(this.dataUpdate){
      data = await this.service.update(this.table, this.dataRow, this.subGrids)
    }
    else{
      data = await this.service.insert(this.table, this.dataRow, this.subGrids)
    }

    alert(data.message)

    if(data.sucess){
      await this.btnBuscar()
      this.btnCancelar()
    }
  }

  btnCancelar(){
    this.dataRow = { ...this.dataClean,  ...{[this.dataKey]: this.dataRow[this.dataKey]} }

    Object.keys(this.subGrids).forEach(i => {
      this.dataSub[i].ID = 0
      this.subGrids[i] = []
    })

    this.dataScreen = false
    this.dataConsult = false
    this.dataUpdate = false
    this.cdr.detectChanges()
  }

  async btnBuscar(){
    let data = await this.service.dataGrid(this.table, this.dataSearch)

    this.dataRow[this.dataKey] = 0
    this.dataGrid = data
    this.cdr.detectChanges()
  }

  async btnConsultar(){
    let subColumns: any = { }

    for(let i in this.dataSub){
      subColumns[i] = Object.keys(this.dataSub[i]).filter(c => c !== 'ANEXO' && c !== 'ID')
    }

    let data = await this.service.consultar(this.table, this.dataRow, subColumns)

    this.dataRow = data.dataRow
    this.subGrids = data.subGrid

    Object.keys(this.subGrids).forEach(i => {
      this.subGrids[i].forEach((x: any, n: number) => x.ID = n +1 )
    })

    this.dataScreen = true
    this.dataConsult = true
    this.cdr.detectChanges()
  }

  async btnAlterar(){
    let subColumns: any = { }

    for(let i in this.dataSub){
      subColumns[i] = Object.keys(this.dataSub[i]).filter(c => c !== 'ANEXO' && c !== 'ID')
    }

    let data = await this.service.consultar(this.table, this.dataRow, subColumns)

    this.dataRow = data.dataRow
    this.subGrids = data.subGrid

    Object.keys(this.subGrids).forEach(i => {
      this.subGrids[i].forEach((x: any, n: number) => x.ID = n +1 )
    })

    this.dataConsult = false
    this.dataUpdate = true
    this.dataScreen = true
    this.cdr.detectChanges()
  }

  async btnExcluir(){
    let data = await this.service.excluir(this.table, {[this.dataKey]: this.dataRow[this.dataKey]}, this.subGrids)

    alert(data.message)
    if(data.sucess){
      this.dataScreen = false
      this.dataRow = { ...this.dataClean }
      await this.btnBuscar()
      this.cdr.detectChanges()
    }
  }

  async lookup(lookup: any){
    let data = await this.service.lookup(lookup)
    this.dataLookups[lookup.table] = data
    this.cdr.detectChanges()
  }

  gridLookup(ID: number, table: string){
    return this.dataLookups[table].find((i: any) => i.ID === ID).DS
  }

  async autocomplete(load: any){
    let data = await this.service.autocomplete(load)
    this.dataRow = { ...this.dataRow, ...data }
    this.cdr.detectChanges()
  }

  async consultFile(){
    let data = await this.service.consultFile(this.table, this.dataRow[this.dataKey])

    const byteCharacters = atob(data.ANEXO.split(',')[1]);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([new Uint8Array(byteNumbers)], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob), '_blank')
  }
}
