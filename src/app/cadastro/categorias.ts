import { Component } from '@angular/core';
import { Engine } from '../session/engine/engine';
import { columnsGrid, dataForm, dataRow, dataSub, subComponent } from '../session/engine/interfaces';

@Component({
  selector: 'app-categorias',
  imports: [Engine],
  template: `
  <app-engine
    compTitle="Cadastro de Categorias"
    dataKey="ID_CATEGORIA"
    table="CATEGORIAS"
    
    [dataRow]="dataRow"
    [dataSub]="dataSub"
    [columnsGrid]="columnsGrid"
    [dataForm]="dataForm"
    [subComponent]="subComponent"

  ></app-engine>
  `,
  styles: ``,
})
export class Categorias {

  dataRow: dataRow = {
    ID_CATEGORIA: 0,
    CD_CATEGORIA: '',
    TP_CATEGORIA: '',
    NM_CATEGORIA: '',
    SN_ATIVO: true,
    HISTORICO: ''
  }

  dataSub: dataSub = {
    "CATEGORIA_DETALHE": {
      ID_CATEGORIA_DETALHE: 0,
      CD_DETALHE: '',
      NM_DETALHE: '',
      SN_ATIVO: true
    },
    "CATEGORIA_ORCAMENTO": {
      ID_CATEGORIA_ORCAMENTO: 0,
      DT_INICIO: '',
      DS_ORCAMENTO: '',
      VL_MINIMO: '',
      VL_MEDIO: '',
      VL_MAXIMO: ''
    }
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Código",
      field: "CD_CATEGORIA",
      width: 8
    },
    {
      name: "Tipo",
      field: "TP_CATEGORIA",
      width: 8,
      type: "select",
      options: { "F": "Financeiro", "P": "Produto" }
    },
    {
      name: "Descrição",
      field: "NM_CATEGORIA",
      width: 24
    },
    {
      name: "Ativo",
      field: "SN_ATIVO",
      width: 8,
      type: "sn_ativo"
    }
  ]

  dataForm: dataForm[] = [
    {
      label: "Código",
      type: "number",
      field: "CD_CATEGORIA",
      width: 8,
      autocomplete: { type: "codigo" },
      required: true
    },
    {
      label: "Tipo",
      type: "select",
      field: "TP_CATEGORIA",
      width: 12,
      options: [{ID: "F", DS: "Financeiro"}, {ID: "P", DS: "Produto"}],
      required: true
    },
    {
      label: "Descrição",
      type: "text",
      field: "NM_CATEGORIA",
      width: 26,
      required: true
    },
    {
      label: "Ativo",
      type: "checkbox",
      field: "SN_ATIVO",
      width: 2
    },
    {
      label: "Histórico",
      type: "textarea",
      field: "HISTORICO",
      width: 75,
      height: 4
    },
    {
      label: "Detalhamento",
      type: "subComponent",
      field: "CATEGORIA_DETALHE",
      width: 37.15,
      height: 15
    },
    {
      label: "Orçamento",
      type: "subComponent",
      field: "CATEGORIA_ORCAMENTO",
      width: 37.15,
      height: 15
    }
  ]

  subComponent: subComponent = {
    "CATEGORIA_DETALHE": {
      subColumns: [
        {
          name: "Código",
          field: "CD_DETALHE",
          width: 6,
        },
        {
          name: "Descrição",
          field: "NM_DETALHE",
          width: 24
        },
        {
          name: "Ativo",
          field: "SN_ATIVO",
          width: 6,
          type: "sn_ativo"
        }
      ],
      subForm: [
        {
          label: "Código",
          type: "number",
          field: "CD_DETALHE",
          width: 6,
          autocomplete: {type: 'codigo'},
          required: true
        },
        {
          label: "Descrição",
          type: "text",
          field: "NM_DETALHE",
          width: 26,
          required: true
        },
        {
          label: "Ativo",
          type: "checkbox",
          field: "SN_ATIVO",
          width: 2
        }
      ]
    },

    "CATEGORIA_ORCAMENTO": {
      subColumns: [
        {
          name: "Data",
          field: "DT_INICIO",
          width: 6,
          type: "date"
        },
        {
          name: "Min",
          field: "VL_MINIMO",
          width: 8
        },
        {
          name: "Med",
          field: "VL_MEDIO",
          width: 8
        },
        {
          name: "Max",
          field: "VL_MAXIMO",
          width: 8
        }
      ],
      subForm: [
        {
          label: "Data",
          type: "date",
          field: "DT_INICIO",
          width: 8,
          autocomplete: {type: 'today'},
          required: true
        },
        {
          label: "Obervação",
          type: "text",
          field: "DS_ORCAMENTO",
          width: 26
        },
        {
          label: "Mín",
          type: "number",
          field: "VL_MINIMO",
          width: 6,
          required: true
        },
        {
          label: "Med",
          type: "number",
          field: "VL_MEDIO",
          width: 6,
          required: true
        },
        {
          label: "Max",
          type: "number",
          field: "VL_MAXIMO",
          width: 6,
          required: true
        }
      ]
    }

  }

}
