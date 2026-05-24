import { Component } from '@angular/core';
import { Reports } from '../session/reports/reports';

@Component({
  selector: 'app-listagens',
  imports: [Reports],
  template: `
  <app-reports
  title="Relatórios de Listagem"
  type='listagem'
  [dataReports]="dataReports"
  ></app-reports>
  `,
  styles: ``,
})
export class Listagens {
  dataReports: any[] = [
    { ID: "1", DS: 'Listagem - Pessoas', table: "PESSOAS", filters: [
      { field: "CD_PESSOA", label: "Código", type: "text", default: "1" },
      { field: "NM_PESSOA", label: "Nome", type: "text", default: "Teste" }
    ]
    },
    {
      ID: "2", DS: "Listagem - Categorias", table: "CATEGORIAS", filters: [
        { field: "CD_CATEGORIA", label: "Código", type: "text", default: "1" },
        { field: "NM_CATEGORIA", label: "Descrição", type: "text", default: "Teste" },
        { field: "TP_CATEGORIA", label: "Tipo", type: "text", default: "F"}
      ]
    }
  ]
}
