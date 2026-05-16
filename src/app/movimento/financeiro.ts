import { Component } from '@angular/core';
import { columnsGrid, dataForm, dataRow, dataSub, subComponent } from '../session/engine/interfaces';
import { Engine } from '../session/engine/engine';

@Component({
  selector: 'app-financeiro',
  imports: [Engine],
  template: `
  <app-engine
    compTitle="Movimentação Financeira"
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
  
  dataRow: dataRow = {
    ID_FINANCEIRO: 0,
    TP_FINANCEIRO: '',
    DS_FINANCEIRO: '',
    VL_FINANCEIRO: '',
    ID_CONTRATO: null,
    ID_PESSOA: null,
    ID_CONTA: null,
    CD_METODO: ''
  }

  dataSub: dataSub = { }

  columnsGrid: columnsGrid[] = [
    {
      name: "Data",
      field: "DT_FINANCEIRO",
      width: 8,
      type: 'date'
    },
    {
      name: "Tipo",
      field: "TP_FINANCEIRO",
      width: 12,
      options: {"D": "Despesa", "R": "Receita"}
    },
    {
      name: "Credor / Fornecedor",
      field: "ID_PESSOA",
      width: 24,
      type: "lookup",
      table: "PESSOAS"
    },
    {
      name: "Valor",
      field: "VL_FINANCEIRO",
      width: 8
    }
  ]
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
      width: 10,
      required: true,

      options: [{ID: "D", DS: "Despesa"}, {ID: "R", DS: "Receita"}]
    },
    {
      label: "Descrição",
      type: "text",
      field: "DS_FINANCEIRO",
      width: 32,
      required: true
    },
    {
      label: "Valor",
      type: "number",
      field: "VL_FINANCEIRO",
      width: 12,
      required: true
    },
    {
      label: "Contrato",
      type: "lookup",
      field: "ID_CONTRATO",
      width: 19,
      lookup: { "table": "CONTRATOS", ID: "ID_CONTRATO", DS: ["CD_CONTRATO","NM_PESSOA"], joins: ["PESSOAS"]},
      autocomplete: {type: 'change', fill: ["ID_PESSOA"]}
    },
    {
      label: "Credor / Fornecedor",
      type: "lookup",
      field: "ID_PESSOA",
      width: 24,
      lookup: { "table": "PESSOAS", ID: "ID_PESSOA", DS: ["CD_PESSOA", "NM_PESSOA", "CADASTRO"]},
      required: true
    },
    {
      label: "Conta Bancária",
      type: "lookup",
      field: "ID_CONTA",
      width: 7,
      lookup: { "table": "CONTAS", ID: "ID_CONTA", DS: ["CD_CONTA", "DG_CONTA"]}
    },
    {
      label: "Método",
      type: "select",
      field: "CD_METODO",
      width: 12,
      options: [
        {ID: "C", DS: "Crédito"}, {ID: "D", DS: "Débito"}, {ID: "G", DS: "Pagamento"},
        {ID: "P", DS: "Pix"}, {ID: "T", DS: "Transferência"}
      ],
      required: true
    }
  ]

  subComponent: subComponent = { }
}
