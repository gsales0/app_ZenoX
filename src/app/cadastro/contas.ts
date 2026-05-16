import { Component } from '@angular/core';
import { Engine } from '../session/engine/engine';
import { columnsGrid, dataForm, dataRow, dataSub, subComponent } from '../session/engine/interfaces';

@Component({
  selector: 'app-contas',
  imports: [Engine],
  template: `
  <app-engine
    compTitle="Cadastro de Contas Bancárias"
    dataKey="ID_CONTA"
    table="CONTAS"
    
    [dataRow]="dataRow"
    [dataSub]="dataSub"
    [columnsGrid]="columnsGrid"
    [dataForm]="dataForm"
    [subComponent]="subComponent"

  ></app-engine>
  `,
  styles: ``,
})
export class Contas {

  dataRow: dataRow = {
    ID_CONTA: 0,
    CD_CONTA: '',
    DG_CONTA: '',
    CD_AGENCIA: '',
    DS_CONTA: '',
    SN_ATIVO: true,
    HISTORICO: ''
  }
  dataSub: dataSub = { }

  columnsGrid: columnsGrid[] = [
    {
      name: "Nº Conta",
      field: "CD_CONTA",
      width: 12
    },
    {
      name: "Digíto",
      field: "DG_CONTA",
      width: 4
    },
    {
      name: "Descrição",
      field: "DS_CONTA",
      width: 24
    },
    {
      name: "Ativo",
      field: "SN_ATIVO",
      width: 6,
      type: "sn_ativo"
    }
  ]
  dataForm: dataForm[] = [
    {
      label: "Nº Conta",
      type: "number",
      field: "CD_CONTA",
      width: 12,
      required: true
    },
    {
      label: "Digíto",
      type: "number",
      field: "DG_CONTA",
      width: 4,
      required: true
    },
    {
      label: "Nº Agencia",
      type: "number",
      field: "CD_AGENCIA",
      width: 8
    },
    {
      label: "Descrição",
      type: "text",
      field: "DS_CONTA",
      width: 24
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
      width: 60
    }
  ]

  subComponent: subComponent = { }


}
