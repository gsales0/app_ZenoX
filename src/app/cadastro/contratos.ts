import { Component } from '@angular/core';
import { columnsGrid, dataForm, dataRow, dataSub, subComponent } from '../session/engine/interfaces';
import { Engine } from '../session/engine/engine';

@Component({
  selector: 'app-contratos',
  imports: [],
  template: `
  <app-engine
    compTitle="Cadastro de Contratos"
    dataKey="ID_CONTRATO"
    table="CONTRATOS"
    
    [dataRow]="dataRow"
    [dataSub]="dataSub"
    [columnsGrid]="columnsGrid"
    [dataForm]="dataForm"
    [subComponent]="subComponent"

  ></app-engine>
  `,
  styles: ``,
})
export class Contratos {
  dataRow: dataRow = { }
  dataSub: dataSub = { }

  columnsGrid: columnsGrid[] = [ ]
  dataForm: dataForm[] = [
    {
      label: "Nº Contrato",
      type: 
    }
  ]
  subComponent: subComponent = { }
}
