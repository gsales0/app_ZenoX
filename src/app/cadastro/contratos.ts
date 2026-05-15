import { Component } from '@angular/core';
import { columnsGrid, dataForm, dataRow, dataSub, subComponent } from '../session/engine/interfaces';
import { Engine } from '../session/engine/engine';

@Component({
  selector: 'app-contratos',
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
export class Contratos {
  dataRow: dataRow = {
    ID_CONTRATO: 0 ,
    CD_CONTRATO: '',
    ID_PESSOA: 0 ,
    DT_ASSINATURA: '',
    DT_TERMINO: '',
    CD_STATUS: '',
    DS_CONTRATO: '',
    VL_CONTRATO: '',
    HISTORICO: ''
  }

  dataSub: dataSub = {
    "CONTRATO_ADITIVO": {
      CD_ADITIVO: '',
      DT_ASSINATURA: '',
      DT_TERMINO: '',
      VL_ADITIVO: ''
    }
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Assinatura",
      field: "DT_ASSINATURA",
      width: 8,
      type: "date"
    },
    {
      name: "Credor",
      field: "ID_PESSOA",
      width: 24,
      type: 'lookup',
      table: 'PESSOAS'
    },
    {
      name: "Valor",
      field: "VL_CONTRATO",
      width: 8
    },
    {
      name: "Status",
      field: "CD_STATUS",
      width: 12,
      type: "select",
      options: {"E": "Executado", "A": "Andamento", "R": "Rescindido"}
    }
  ]
  dataForm: dataForm[] = [
    {
      label: "Nº Contrato",
      type: "text",
      field: "CD_CONTRATO",
      width: 12,
      required: true
    },
    {
      label: "Credor",
      type: "lookup",
      field: "ID_PESSOA",
      width: 32,
      lookup: { table: "PESSOAS", ID: "ID_PESSOA", DS: ["CD_PESSOA", "NM_PESSOA", "CADASTRO"]},
      required: true
    },
    {
      label: "Assinatura",
      type: "date",
      field: "DT_ASSINATURA",
      width: 8,
      required: true
    },
    {
      label: "Término",
      type: "date",
      field: "DT_TERMINO",
      width: 8,
      required: true
    },
    {
      label: "Status",
      type: "select",
      field: "CD_STATUS",
      width: 12,
      options: [{ID: 'A', DS: 'Andamento'}, {ID: 'E', DS: 'Executado'}, {ID: 'R', DS: 'Rescindido'}],
      required: true
    },
    {
      label: "Descrição do Serviço",
      type: "text",
      field: "DS_CONTRATO",
      width: 32,
      required: true
    },
    {
      label: "Valor",
      type: "number",
      field: "VL_CONTRATO",
      width: 12,
      required: true
    },
    {
      label: "Aditivos do Contrato",
      type: "subComponent",
      field: "CONTRATO_ADITIVO",
      width: 35,
      height: 15,
    },
    {
      label: "Objeto do Contrato",
      type: "textarea",
      field: "HISTORICO",
      width: 35,
      height: 15
    }
  ]
  subComponent: subComponent = {
    "CONTRATO_ADITIVO": {
      subColumns: [
        {
          name: "Assinatura",
          field: "DT_ASSINATURA",
          width: 8,
          type: 'date'
        },
        {
          name: "Nº Aditivo",
          field: "CD_ADITIVO",
          width: 12
        },
        {
          name: "Valor",
          field: "VL_ADITIVO",
          width: 8
        },
        {
          name: "Término",
          field: "DT_TERMINO",
          width: 8,
          type: 'date'
        }
      ],
      subForm: [
        {
          label: "Nº Aditivo",
          type: "text",
          field: "CD_ADITIVO",
          width: 12
        },
        {
          label: "Assinatura",
          type: "date",
          field: "DT_ASSINATURA",
          width: 8
        },
        {
          label: "Termino",
          type: "date",
          field: "DT_TERMINO",
          width: 8
        },
        {
          label: "Valor",
          type: "number",
          field: "VL_ADITIVO",
          width: 12
        }
      ]
    }
  }
}
