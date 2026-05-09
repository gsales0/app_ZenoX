import { Component } from '@angular/core';
import { columnsGrid, dataForm } from '../../session/engine/interfaces';
import { Engine } from '../../session/engine/engine';

@Component({
  selector: 'app-produtos',
  imports: [Engine],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos {
  dataRow: any = {
    ID_PRODUTO: 0,
    CD_PRODUTO: '',
    NM_PRODUTO: '',
    TP_PRODUTO: '',
    CD_BARRAS: '',
    UN_MEDIDA: '',
    ID_FORNECEDOR: null,
    NM_MARCA: ''
  }

  dataSub: any = {
    "PRODUTO_ESTOQUE": {
      ID: 0,
      ID_PRODUTO: 0,
      DT_INICIO: '',
      MIN_ESTOQUE: '',
      MED_ESTOQUE: '',
      MAX_ESTOQUE: ''
    }
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Codigo",
      field: "CD_PRODUTO",
      width: 8
    },
    {
      name: "Produto",
      field: "NM_PRODUTO",
      width: 24
    },
    {
      name: "Tipo",
      field: "TP_PRODUTO",
      width: 12
    },
    {
      name: "Un Medida",
      field: "UN_MEDIDA",
      width: 8
    },
    {
      name: "Ativo",
      field: "SN_ATIVO",
      width: 8
    }
  ]

  dataForm: dataForm[] = [
    {
      label: "Código",
      type: "number",
      field: "CD_PRODUTO",
      width: 8,
      required: true
    },
    {
      label: "Nome",
      type: "text",
      field: "NM_PRODUTO",
      width: 32,
      required: true
    },
    {
      label: "Tipo",
      type: "select",
      field: "TP_PRODUTO",
      width: 12,
      required: true,
      options: [{ID: "M", DS: "Matéria-Prima"}, {ID: "R", DS: "Revenda"}, {ID: "F", DS: "Fabricado"}]
    },
    {
      label: "Código de Barras",
      type: "text",
      field: "CD_BARRAS",
      width: 16,
      required: false
    },
    {
      label: "Un. Medida",
      type: "text",
      field: "UN_MEDIDA",
      width: 8,
      required: true
    },
    {
      label: "Fornecedor",
      type: "lookup",
      field: "ID_FORNECEDOR",
      width: 32,
      required: false
    },
    {
      label: "Marca",
      type: "text",
      field: "NM_MARCA",
      width: 16,
      required: false
    },
    {
      label: "Controle de Estoque",
      type: "subComponent",
      field: "PRODUTO_ESTOQUE",
      width: 35,
      height: 15,
      required: false,
    },
    {
      label: "Histórico",
      type: "textarea",
      field: "HISTORICO",
      width: 35,
      height: 15,
      required: false
    }
  ]

  subComponent: any = {
    "PRODUTO_ESTOQUE": {

      subColumns: [
        {
          name: "Data",
          field: "DT_INICIO",
          width: 8
        },
        {
          name: "Estoque Min",
          field: "MIN_ESTOQUE",
          width: 8
        },
        {
          name: "Estoque Rec",
          field: "MED_ESTOQUE",
          width: 8
        },
        {
          name: "Estoque Max",
          field: "MAX_ESTOQUE",
          width: 8
        }
      ],
      subForm: [
        {
          label: "Data Início",
          type: "date",
          field: "DT_INICIO",
          width: 10,
          required: true
        },
        {
          label: "Estoque Min",
          type: "number",
          field: "MIN_ESTOQUE",
          width: 10,
          required: true
        },
        {
          label: "Estoque Rec",
          type: "number",
          field: "MED_ESTOQUE",
          width: 10,
          required: true
        },
        {
          label: "Estoque Max",
          type: "number",
          field: "MAX_ESTOQUE",
          width: 10,
          required: true
        }
      ]
    }
  }
}
