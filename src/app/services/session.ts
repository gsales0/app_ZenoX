import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Session {

  NM_ENTIDADE: string = ''
  NM_USUARIO: string = ''
  X_SESSION: string = ''

  ID_ANO: number = 0

  async buscarEntidade(alias: string){

    let req = await fetch(environment.api + alias + '/entidade', {
      method: "GET",
      headers: {"Content-Type":"application/json"}
    })

    let data = await req.json()

    if(data.sucess){
      this.NM_ENTIDADE = data.NM_ENTIDADE
    }

    return data
  }

  async userLogin(dataRow: any, alias: string){

    let req = await fetch(environment.api + alias + '/userLogin', {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(dataRow)
    })

    let data = await req.json()

    if(data.sucess){
      this.X_SESSION = data.session
      this.NM_USUARIO = data.NM_USUARIO
      this.ID_ANO = dataRow.ID_ANO
    }

    return data
  }
}
