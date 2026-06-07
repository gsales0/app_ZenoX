import { Component } from '@angular/core';
import { columnsGrid, dataForm, dataRow, dataSub, subComponent } from '../session/engine/interfaces';
import { Engine } from '../session/engine/engine';

@Component({
  selector: 'app-movimentacao',
  standalone: true,
  imports: [Engine],
  template: `
  <app-engine
    compTitle="Ordem de Serviço / Vendas"
    dataKey="ID_MOVIMENTACAO"
    table="MOVIMENTACOES"
    
    [dataRow]="dataRow"
    [dataSub]="dataSub"
    [columnsGrid]="columnsGrid"
    [dataForm]="dataForm"
    [subComponent]="subComponent"

  ></app-engine>
  `,
  styles: ``
})
export class Movimentacao {
  
  dataRow: dataRow = {
    ID_MOVIMENTACAO: 0,
    TP_MOVIMENTACAO: '',
    DT_MOVIMENTACAO: '',
    ID_PESSOA: '',
    ID_CONTRATO: '',
    DS_MOVIMENTACAO: '',
    CD_STATUS: '',
    VL_DESCONTO: '',
    VL_MOVIMENTACAO: '',
    CD_METODO: '',
    ID_CONTA: '',
    HISTORICO: ''
  }

  dataSub: dataSub = {
    "MOVIMENTACOES_ITENS": {
      ID_MOVIMENTACAO_ITEM: 0,
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
      field: "DT_MOVIMENTACAO",
      width: 6,
      type: 'date'
    },
    {
      name: "Tipo",
      field: "TP_MOVIMENTACAO",
      width: 10,
      type: "select",
      options: {"V": "Venda", "O": "Ordem de Serviço"}
    },
    {
      name: "Cliente",
      field: "ID_PESSOA",
      width: 22,
      type: "lookup",
      table: "PESSOAS"
    },
    {
      name: "Descrição",
      field: "DS_MOVIMENTACAO",
      width: 18
    },
    {
      name: "Status",
      field: "CD_STATUS",
      width: 8,
      type: "select",
      options: {"O": "Orçamento", "A": "Aprovado", "L": "Liquidado", "P": "Pago"}
    },
    {
      name: "Total",
      field: "VL_MOVIMENTACAO",
      width: 6,
      type: "currency"
    }
  ]

  dataForm: dataForm[] = [
    {
      label: "Data",
      type: "date",
      field: "DT_MOVIMENTACAO",
      width: 8,
      required: true
    },
    {
      label: "Tipo",
      type: "select",
      field: "TP_MOVIMENTACAO",
      width: 12,
      required: true,
      options: [{ID: "V", DS: "Venda"}, {ID: "O", DS: "Ordem de Serviço"}]
    },
    {
      label: "Descrição",
      type: "text",
      field: "DS_MOVIMENTACAO",
      width: 25,
      required: true
    },
    {
      label: "Contrato",
      type: "lookup",
      field: "ID_CONTRATO",
      width: 20,
      lookup: {
        "table": "CONTRATOS",
        ID: "ID_CONTRATO",
        DS: ["CD_CONTRATO","DS_CONTRATO"],
        where: "CD_STATUS = 'A'"
      },
      autocomplete: { type: "change", fill: ["ID_PESSOA"] }
    },
    {
      label: "Credor",
      type: "lookup",
      field: "ID_PESSOA",
      width: 20,
      lookup: { "table": "PESSOAS", ID: "ID_PESSOA", DS: ["CD_PESSOA", "NM_PESSOA", "CADASTRO"]},
      required: true
    },
    {
      label: "Status",
      type: "select",
      field: "CD_STATUS",
      width: 8,
      options: [
        {ID: "O", DS: "Orçamento"}, 
        {ID: "A", DS: "Aprovado"}, 
        {ID: "L", DS: "Liquidado"}, 
        {ID: "P", DS: "Pago"}
      ],
      required: true
    },
    {
      label: "Método",
      type: "select",
      field: "CD_METODO",
      width: 8,
      options: [
        {ID: "C", DS: "Crédito"}, {ID: "D", DS: "Débito"}, {ID: "G", DS: "Dinheiro"},
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
      label: "Desconto",
      type: "number",
      field: "VL_DESCONTO",
      width: 8
    },
    {
      label: "Total da OS/Venda",
      type: "number", 
      field: "VL_MOVIMENTACAO",
      width: 8,
      required: true,
      readonly: true,
      expression: "SUM(MOVIMENTACOES_ITENS.VL_TOTAL)"
    },
    {
      label: "Itens da OS/Venda",
      type: "subComponent",
      field: "MOVIMENTACOES_ITENS",
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
    "MOVIMENTACOES_ITENS": {
      subKey: "ID_MOVIMENTACAO_ITEM",
      subColumns: [
        {
          name: "Produto/Serviço",
          field: "ID_PRODUTO",
          width: 24,
          type: "lookup",
          table: "PRODUTOS"
        },
        {
          name: "Qtd",
          field: "QT_ITENS",
          width: 8
        },
        {
          name: "Vl. Unit",
          field: "VL_UNITARIO",
          width: 8,
          type: "currency"
        },
        {
          name: "Vl. Total",
          field: "VL_TOTAL",
          width: 8,
          type: "currency"
        }
      ],
      subForm: [
        {
          label: "Produto / Serviço",
          type: "lookup",
          field: "ID_PRODUTO",
          width: 24,
          lookup: { "table": "PRODUTOS", ID: "ID_PRODUTO", DS: ["CD_PRODUTO","NM_PRODUTO"], where: "TP_PRODUTO IN ('P','S')" },
          autocomplete: {type: 'change', fill: ["UN_MEDIDA"]}
        },
        {
          label: "Observação",
          type: "text",
          field: "DS_ITENS",
          width: 16
        },
        {
          label: "Medida",
          type: "text",
          field: "UN_MEDIDA",
          width: 4,
          readonly: true        
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
          width: 8,
          readonly: true,
          expression: "dataSub.QT_ITENS * dataSub.VL_UNITARIO"
        }
      ]
    }
  }
}