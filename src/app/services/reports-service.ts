import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Session } from './session';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {

    constructor(private session: Session){ }
  

  async reportEmit(type: string, table: string, fields: any){

    let req = await fetch(environment.api + `reports/${type}/${table}`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "X_SESSION": this.session.X_SESSION
      },
      body: JSON.stringify(fields)
    })

    let data = await req.json()

    return data
  }
}
