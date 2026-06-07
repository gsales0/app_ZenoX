import { Component } from '@angular/core';
import { columnsGrid, dataForm, dataRow, dataSub, subComponent } from '../session/engine/interfaces';
import { Engine } from '../session/engine/engine';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [Engine],
  template: `
  <app-engine
    compTitle="Movimentação de Estoque"
    dataKey="ID_ESTOQUE"
    table="ESTOQUE"
    
    [dataRow]="dataRow"
    [dataSub]="dataSub"
    [columnsGrid]="columnsGrid"
    [dataForm]="dataForm"
    [subComponent]="subComponent"

  ></app-engine>
  `,
  styles: ``
})
export class Estoque {
  
  dataRow: dataRow = {
    ID_ESTOQUE: 0,
    DT_ESTOQUE: '',
    TP_ESTOQUE: '',
    DS_ESTOQUE: '',
    ID_PESSOA: '',
    DOC_ESTOQUE: '',
    CD_STATUS: '',
    VL_ESTOQUE: '',
    CD_METODO: '',
    ID_CONTA: '',
    HISTORICO: ''
  }

  dataSub: dataSub = {
    "ESTOQUE_ITENS": {
      ID_ESTOQUE_ITEM: 0,
      ID_PRODUTO: '',
      DS_ITENS: '',
      UN_MEDIDA: '',
      QT_ITENS: '',
      VL_UNITARIO: '',
      VL_TOTAL: ''
    }
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Data",
      field: "DT_ESTOQUE",
      width: 8,
      type: 'date'
    },
    {
      name: "Tipo",
      field: "TP_ESTOQUE",
      width: 12,
      options: {"E": "Entrada", "S": "Saída"}
    },
    {
      name: "Descrição",
      field: "DS_ESTOQUE",
      width: 24
    },
    {
      name: "Pessoa",
      field: "ID_PESSOA",
      width: 20,
      type: "lookup",
      table: "PESSOAS"
    },
    {
      name: "Valor Total",
      field: "VL_ESTOQUE",
      width: 8
    }
  ]

  dataForm: dataForm[] = [
    {
      label: "Data",
      type: "date",
      field: "DT_ESTOQUE",
      width: 8,
      required: true
    },
    {
      label: "Tipo",
      type: "select",
      field: "TP_ESTOQUE",
      width: 8,
      required: true,
      options: [{ID: "E", DS: "Entrada"}, {ID: "S", DS: "Saída"}]
    },
    {
      label: "Descrição da Movimentação",
      type: "text",
      field: "DS_ESTOQUE",
      width: 25,
      required: true
    },
    {
      label: "Status",
      type: "select",
      field: "CD_STATUS",
      width: 8,
      options: [{ID: "A", DS: "Aberto"}, {ID: "E", DS: "Efetivado"}, {ID: "C", DS: "Cancelado"}],
      required: true
    },
    {
      label: "Fornecedor / Cliente",
      type: "lookup",
      field: "ID_PESSOA",
      width: 24,
      lookup: { "table": "PESSOAS", ID: "ID_PESSOA", DS: ["CD_PESSOA", "NM_PESSOA", "CADASTRO"]}
    },
    {
      label: "Documento (NF/Recibo)",
      type: "text",
      field: "DOC_ESTOQUE",
      width: 12
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
      width: 12,
      lookup: { "table": "CONTAS", ID: "ID_CONTA", DS: ["CD_CONTA", "DG_CONTA"]}
    },
    {
      label: "Valor Total",
      type: "number", // Em uma evolução da Engine, isso aqui poderia ter um readonly: true e calcular somando o grid abaixo!
      field: "VL_ESTOQUE",
      width: 8,
      required: true
    },
    {
      label: "Itens da Movimentação",
      type: "subComponent",
      field: "ESTOQUE_ITENS",
      width: 35,
      height: 15 
    },
    {
      label: "Histórico",
      type: "textarea",
      field: "HISTORICO",
      width: 35,
      height: 15
    }
  ]

  subComponent: subComponent = {
    "ESTOQUE_ITENS": {
      subKey: "ID_ESTOQUE_ITEM",
      subColumns: [
        {
          name: "Produto/Serviço",
          field: "ID_PRODUTO",
          width: 24,
          type: "lookup",
          table: "PRODUTOS",
        },
        {
          name: "Qtd",
          field: "QT_ITENS",
          width: 8
        },
        {
          name: "Vl. Unit",
          field: "VL_UNITARIO",
          width: 8
        },
        {
          name: "Vl. Total",
          field: "VL_TOTAL",
          width: 8
        }
      ],
      subForm: [
        {
          label: "Produto / Serviço",
          type: "lookup",
          field: "ID_PRODUTO",
          width: 24,
          lookup: {
            "table": "PRODUTOS",
            ID: "ID_PRODUTO",
            DS: ["CD_PRODUTO", "NM_PRODUTO"],
            where: "1 = 1"
          },
        },
        {
          label: "Descrição Complementar",
          type: "text",
          field: "DS_ITENS",
          width: 16
        },
        {
          label: "UN",
          type: "text",
          field: "UN_MEDIDA",
          width: 4
        },
        {
          label: "Quantidade",
          type: "number",
          field: "QT_ITENS",
          width: 8
        },
        {
          label: "Valor Unitário",
          type: "number",
          field: "VL_UNITARIO",
          width: 8
        },
        {
          label: "Valor Total",
          type: "number",
          field: "VL_TOTAL",
          width: 8
        }
      ]
    }
  }
}