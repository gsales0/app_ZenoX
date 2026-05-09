import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Session } from '../../services/session';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

  dataRow: any ={
    NM_ENTIDADE: '',
    CD_USUARIO: '',
    HS_SENHA: '',
    ID_MES: ((new Date).getMonth() + 1).toString(),
    ID_ANO: (new Date).getFullYear().toString()
  }

  alias: string = ''
  
  constructor(private session: Session, private acRoute: ActivatedRoute, private cdr: ChangeDetectorRef, private router: Router){ }

  async ngOnInit(){
    this.alias = this.acRoute.snapshot.params['alias']

    let data = await this.session.buscarEntidade(this.alias)

    this.dataRow.NM_ENTIDADE = data.NM_ENTIDADE
    this.cdr.detectChanges()
  }

  async userLogin(){
    let data = await this.session.userLogin(this.dataRow, this.alias)

    if(data.sucess){
      this.router.navigate([this.alias + '/dashboard'], {skipLocationChange: true})
    }
    else{
      alert(data.message)
    }
  }

}
