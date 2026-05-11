import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EngineService } from '../../services/engine-service';
import { columnsGrid, dataForm} from './interfaces'
import { Subengine } from '../subengine/subengine';

@Component({
  selector: 'app-engine',
  imports: [CommonModule, FormsModule, Subengine],
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

    this.dataSearch.DATAKEY = this.dataKey
    this.dataSearch.COLUMNS = this.columnsGrid.map(i => i.field)
  }

  async btnIncluir(){
    //let data = await this.service.codigo(this.table)

    //this.dataRow = { ...this.dataClean, ...data }

    this.dataConsult = false
    this.dataScreen = true
    this.cdr.detectChanges()
  }

  async btnSalvar(){
    let data
    this.dataError = ''

    if(this.dataUpdate){
      data = await this.service.update(this.table, this.dataRow)
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
    let data = await this.service.consultar(this.table, this.dataRow, this.dataKey)

    this.dataRow = data
    this.dataScreen = true
    this.dataConsult = true
    this.cdr.detectChanges()
  }

  async btnAlterar(){
    let data = await this.service.consultar(this.table, this.dataRow, this.dataKey)

    this.dataRow = data
    this.dataConsult = false
    this.dataUpdate = true
    this.dataScreen = true
    this.cdr.detectChanges()
  }

  async btnExcluir(){
    let data = await this.service.excluir(this.table, this.dataRow, this.dataKey)

    alert(data.message)
    if(data.sucess){
      this.dataScreen = false
      this.dataRow = { ...this.dataClean }
      await this.btnBuscar()
      this.cdr.detectChanges()
    }
  }

  async lookup(table: string){
    let data = await this.service.lookup(table)
    this.dataLookups[table] = data
    console.log(this.subGrids)
    this.cdr.detectChanges()
  }

}
