import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Session } from '../../services/session';

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

  constructor(private session: Session){ }

  ngOnInit(): void {
    this.NM_ENTIDADE = this.session.NM_ENTIDADE
    this.NM_USUARIO = this.session.NM_USUARIO
    this.ID_ANO = this.session.ID_ANO
  }
}
