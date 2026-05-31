import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Session } from '../../services/session';
import { ReportsService } from '../../services/reports-service';
import { menuEngine } from './menu.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit{

  VERSION: string = ''
  NM_ENTIDADE: string = ''
  NM_USUARIO: string = ''
  ID_ANO: Number = 0

  constructor(private session: Session, private reports: ReportsService){ }

  ngOnInit(): void {
    this.NM_ENTIDADE = this.session.NM_ENTIDADE
    this.NM_USUARIO = this.session.NM_USUARIO
    this.ID_ANO = this.session.ID_ANO
    this.VERSION = this.session.VERSION
  }

  menuEngine = menuEngine

  openFolder(folder: any){
    this.menuEngine.forEach(f => { if(f !== folder) f.open = false })

    folder.open = !folder.open
  }
}
