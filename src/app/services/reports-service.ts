import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {

  async listagem(){

    let req = await fetch(environment.api + 'reports/listagem', {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({})
    })

    let data = await req.json()

    return data
  }
}
