import { Component } from '@angular/core';
import { columnsGrid, dataForm, dataRow, dataSub, subComponent } from '../session/engine/interfaces';
import { Engine } from '../session/engine/engine';

@Component({
  selector: 'app-financeiro',
  imports: [Engine],
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
export class Financeiro {
  
  dataRow: dataRow = { }
  dataSub: dataSub = { }

  columnsGrid: columnsGrid[] = []
  dataForm: dataForm[] = [
    {
      label: "Data",
      type: "date",
      field: "DT_FINANCEIRO",
      width: 8,
      required: true
    },
    {
      label: "Tipo",
      type: "select",
      field: "TP_FINANCEIRO",
      width: 12,
      required: true,

      options: [{ID: "D", DS: "Despesa"}, {ID: "R", DS: "Receita"}]
    },
    {
      label: "Descrição",
      type: "text",
      field: "DS_FINANCEIRO",
      width: 24
    },
    {
      label: "Valor",
      type: "number",
      field: "VL_FINANCEIRO",
      width: 8,
      required: true
    },
    {
      label: "Método",
      type: "select",
      field: "CD_METODO",
      width: 12,
      options: [{ID: "D", DS: "Débito"}, {ID: "P", DS: "Pagamento"}],
      required: true
    }
  ]

  subComponent: subComponent = { }
}
