import { Component } from '@angular/core';
import { Engine } from './engine';
import { columnsGrid, dataForm, dataRow, dataSub, subComponent } from '../../session/engine/interfaces';

@Component({
  selector: 'app-model',
  imports: [Engine],
  template: `
  <app-engine
    compTitle=""
    dataKey=""
    table=""
    
    [dataRow]="dataRow"
    [dataSub]="dataSub"
    [columnsGrid]="columnsGrid"
    [dataForm]="dataForm"
    [subComponent]="subComponent"

  ></app-engine>
  `,
  styles: ``,
})
export class Model {

  dataRow: dataRow = { }
  dataSub: dataSub = { }

  columnsGrid: columnsGrid[] = [ ]
  dataForm: dataForm[] = [ ]
  subComponent: subComponent = { }

}