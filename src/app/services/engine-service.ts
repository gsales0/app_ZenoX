import { Injectable } from '@angular/core';
import { Session } from './session';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EngineService {

  constructor(private session: Session){ }

  async codigo(table: string){
    
    let req = await fetch(environment.api + 'codigo/' + table, {
      method: "GET",
      headers: {
        "Content-Type":"application/json",
        "X_SESSION": this.session.X_SESSION
      }
    })

    let data = await req.json()

    return data
  }

  async insert(table: string, dataRow: any){

    let req = await fetch(environment.api + 'insert/' + table, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "x_session": this.session.X_SESSION
      },
      body: JSON.stringify(dataRow)
    })

    let data = await req.json()

    return data
  }

  async dataGrid(table: string, dataSearch: any){
    
    let req = await fetch(environment.api + 'dataGrid/' + table, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "X_SESSION": this.session.X_SESSION
      },
      body: JSON.stringify(dataSearch)
    })

    let data = await req.json()

    return data
  }

  async consultar(table: string, dataRow: any, dataKey: string){

    let body = { [dataKey]: dataRow[dataKey] }

    let req = await fetch(environment.api + 'consult/' + table, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "x_session":this.session.X_SESSION
      },
      body: JSON.stringify(body)
    })

    let data = await req.json()

    return data
  }

  async excluir(table: string, dataRow: any, dataKey: string){

    let body = { [dataKey]: dataRow[dataKey] }

    let req = await fetch(environment.api + 'delete/' + table, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        x_session: this.session.X_SESSION
      },
      body: JSON.stringify(body)
    })

    let data = await req.json()

    return data
  }

  async update(table: string, dataRow: any){

    let req = await fetch(environment.api + 'update/' + table, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        x_session: this.session.X_SESSION
      },
      body: JSON.stringify(dataRow)
    })

    let data = await req.json()

    return data
  }
}
