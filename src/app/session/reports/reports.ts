import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { ReportsService } from '../../services/reports-service';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {

  @Input() dataReports: any = [ ]
  @Input() title: string = ''
  @Input() type: string = ''

  ID_RELATORIO: number = 0

  dataFilters: any = { }
  selectReport: any = null

  constructor(private cdr: ChangeDetectorRef, private service: ReportsService){ }

  updateReport(){

    this.selectReport = this.dataReports.find((r: any) => r.ID == this.ID_RELATORIO)
    this.dataFilters = { }

    let report = this.dataReports.find(((r: any) => r.ID == this.ID_RELATORIO))

    report.filters.forEach((f: any) => {
      if(f.default) this.dataFilters[f.field] = f.default
    })
    
    this.cdr.detectChanges()
  }

  async emitReport(){
    let data = await this.service.reportEmit(this.type, this.selectReport.table, this.dataFilters)

    const byteCharacters = atob(data.file.split(',')[1]);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([new Uint8Array(byteNumbers)], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob), '_blank')
  }

}
