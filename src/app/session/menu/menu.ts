import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Session } from '../../services/session';
import { ReportsService } from '../../services/reports-service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit{

  NM_ENTIDADE: string = ''
  NM_USUARIO: string = ''
  ID_ANO: Number = 0

  constructor(private session: Session, private reports: ReportsService){ }

  ngOnInit(): void {
    this.NM_ENTIDADE = this.session.NM_ENTIDADE
    this.NM_USUARIO = this.session.NM_USUARIO
    this.ID_ANO = this.session.ID_ANO
  }

  async testarRelatorio(){
    let data = await this.reports.listagem()

    const byteCharacters = atob(data.file.split(',')[1]);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([new Uint8Array(byteNumbers)], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob), '_blank')
  }
}
