import { Component } from '@angular/core';
import { columnsGrid, dataForm, dataRow, dataSub, subComponent } from '../session/engine/interfaces';
import { Engine } from '../session/engine/engine';

@Component({
  selector: 'app-financeiro',
  imports: [Engine],
  template: `
  <app-engine
    compTitle="Movimentação Financeira"
    dataKey="ID_FINANCEIRO"
    table="FINANCEIRO"
    
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
    ID_CATEGORIA: '',
    ID_CONTRATO: '',
    ID_PESSOA: '',
    ID_CONTA: '',
    CD_METODO: ''
  }

  dataSub: dataSub = {
    "FINANCEIRO_DOCUMENTOS": {
      ID_FINANCEIRO_DOCUMENTO: 0,
      DT_DOCUMENTO: '',
      TP_DOCUMENTO: '',
      DS_DOCUMENTO: '',
      ANEXO: ''
    }
  }

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
      width: 8,
      required: true,

      options: [{ID: "D", DS: "Despesa"}, {ID: "R", DS: "Receita"}]
    },
    {
      label: "Descrição",
      type: "text",
      field: "DS_FINANCEIRO",
      width: 33,
      required: true
    },
    {
      label: "Categoria",
      type: "lookup",
      field: "ID_CATEGORIA",
      width: 14,
      lookup: { table: "CATEGORIA_DETALHE", ID: "ID_CATEGORIA_DETALHE", DS: ["CD_CATEGORIA,'.',CD_DETALHE","NM_DETALHE"], joins: ["CATEGORIAS"]}
    },
    {
      label: "Status",
      type: "select",
      field: "CD_STATUS",
      width: 8,
      options: [{ID: "L", DS: "Liquidado"}, {ID: "P", DS: "Pago"}],
      required: true
    },
    {
      label: "Contrato",
      type: "lookup",
      field: "ID_CONTRATO",
      width: 17,
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
      label: "Método",
      type: "select",
      field: "CD_METODO",
      width: 8,
      options: [
        {ID: "C", DS: "Crédito"}, {ID: "D", DS: "Débito"}, {ID: "G", DS: "Pagamento"},
        {ID: "P", DS: "Pix"}, {ID: "T", DS: "Transferência"}
      ]
    },
    {
      label: "Conta Bancária",
      type: "lookup",
      field: "ID_CONTA",
      width: 14,
      lookup: { "table": "CONTAS", ID: "ID_CONTA", DS: ["CD_CONTA", "DG_CONTA"]}
    },
    {
      label: "Valor",
      type: "number",
      field: "VL_FINANCEIRO",
      width: 8,
      required: true
    },
    {
      label: "Documentos Comprobatórios",
      type: "subComponent",
      field: "FINANCEIRO_DOCUMENTOS",
      width: 37.15,
      height: 15 
    },
    {
      label: "Histórico",
      type: "textarea",
      field: "HISTORICO",
      width: 37.15,
      height: 15
    }
  ]

  subComponent: subComponent = {
    "FINANCEIRO_DOCUMENTOS": {
      subColumns: [
        {
          name: "Data",
          field: "DT_DOCUMENTO",
          width: 8
        }
      ],
      subForm: [
        {
          label: "Data",
          type: "date",
          field: "DT_DOCUMENTO",
          width: 8
        },
        {
          label: "Tipo",
          type: "select",
          field: "TP_DOCUMENTO",
          width: 8,
          options: [{ID: "C", DS: "Comprovante"},{ID: "N", DS: "Nota Fiscal"},{ID: "G", DS: "Guia de Pagto"},{ID: "R", DS: "Recibo"}, {ID: "O", DS: "Outros"}]
        },
        {
          label: "Descrição",
          type: "text",
          field: "DS_DOCUMENTO",
          width: 16
        },
        {
          label: "Anexo",
          type: "file",
          field: "ANEXO",
          width: 8
        }
      ]
    }
  }
}
