import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { columnsGrid } from '../../session/engine/interfaces';
import { CommonModule } from '@angular/common';
import { EngineService } from '../../services/engine-service';

@Component({
  selector: 'app-default',
  imports: [CommonModule],
  templateUrl: './default.html',
  styleUrl: './default.css',
})
export class Default implements OnInit {

  @Input() title: string = ''
  @Input() table: string = ''
  @Input() columnsGrid: columnsGrid[] = []
  @Input() totalizar: string = ''

  dataGrid: any[] = []
  totalValue: string = ''

  constructor(private service: EngineService, private cdr: ChangeDetectorRef){ }

  async ngOnInit() {
    let data = await this.service.widgetReq(this.table)

    this.dataGrid = data
    this.totalizer()
    this.cdr.detectChanges()
  }

  totalizer(){
    this.totalValue = this.dataGrid.reduce((a, i) => {
      return a + (Number(i[this.totalizar]) || 0)
    }, 0)
  }
}
