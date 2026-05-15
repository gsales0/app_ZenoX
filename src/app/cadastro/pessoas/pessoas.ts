import { Component } from '@angular/core';
import { Engine } from '../../session/engine/engine';

@Component({
  selector: 'app-pessoas',
  imports: [Engine],
  templateUrl: './pessoas.html',
  styleUrl: './pessoas.css',
})
export class Pessoas {

  dataRow: any = {
    ID_PESSOA: 0,
    CD_PESSOA: '',
    NM_PESSOA: '',
    CADASTRO: '',
    TP_PESSOA: '',
    SN_ATIVO: true,
    HISTORICO: ''
  }

  columnsGrid: any[] = [
    {
      name: "Código",
      field: "CD_PESSOA",
      width: 8
    },
    {
      name: "Nome",
      field: "NM_PESSOA",
      width: 24
    },
    {
      name: "Tipo",
      field: "TP_PESSOA",
      width: 16,
      type: 'select',
      options: {"F": "Física", "J": "Jurídica"}
    },
    {
      name: "CPF/CNPJ",
      field: "CADASTRO",
      width: 16
    },
    {
      name: "Ativo",
      field: "SN_ATIVO",
      width: 8,
      type: 'sn_ativo'
    }
  ]

  dataForm: any[] = [
    {
      label: "Código",
      type: "number",
      field: "CD_PESSOA",
      width: 8,
      required: true,
      autocomplete: 'codigo'
    },
    {
      label: "Tipo",
      type: "select",
      field: "TP_PESSOA",
      width: 12,
      required: true,
      options: [{ID: 'F', DS: 'Física'}, {ID: 'J', DS: 'Jurídica'}]
    },
    {
      label: "Nome",
      type: "text",
      field: "NM_PESSOA",
      width: 32,
      required: true
    },
    {
      label: "CPF/CNPJ",
      type: "text",
      field: "CADASTRO",
      width: 16,
      required: true,
      mask: '000.000.000-00||00.000.000/0000-00'
    },
    {
      label: "Ativo",
      type: "checkbox",
      field: "SN_ATIVO",
      width: 2,
    },
    {
      label: "Histórico",
      type: "textarea",
      field: "HISTORICO",
      width: 75,
      height: 4,
    }
  ]
}
