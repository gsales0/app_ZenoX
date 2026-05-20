import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from "ngx-mask";
import { dataForm, dataRow } from '../../session/engine/interfaces';
import { EngineService } from '../../services/engine-service';
import { Formgroup } from '../../session/formgroup/formgroup';

@Component({
  selector: 'app-entidade',
  imports: [FormsModule, CommonModule, Formgroup],
  templateUrl: './entidade.html',
  styleUrl: './entidade.css',
})
export class Entidade {

  compTitle: string = 'Entidade Modelo'

  dataLookups: any = { }

  dataConsult: boolean = false
  constructor(private service: EngineService, private cdr: ChangeDetectorRef){ }

  dataRow: any = {
    ID_ENTIDADE: 0,
    CD_ENTIDADE: '',
    NM_ENTIDADE: '',
    DS_ENTIDADE: '',
    IMG_ENTIDADE: '',
    DS_CIDADE: '',
    UF_ENTIDADE: '',
    DS_BAIRRO: '',
    DS_ENDERECO: '',
    SN_ANEXO: false
  }

  dataForm: dataForm[] = [
    {
      label: "CNPJ",
      type: "text",
      width: 10,
      field: "CD_ENTIDADE",
      mask: "00.000.000/0000-00",
      required: true
    },
    {
      label: "Razão Social",
      type: "text",
      width: 26,
      field: "NM_ENTIDADE",
      required: true
    },
    {
      label: "Nome Fantasia",
      type: "text",
      field: "DS_ENTIDADE",
      width: 26,
      required: true
    },
    {
      label: "Logo",
      type: "img",
      field: "IMG_ENTIDADE",
      width: 9
    },
    {
      label: "Cidade",
      type: "text",
      width: 15,
      field: "DS_CIDADE"
    },
    {
      label: "UF",
      type: "text",
      field: "UF_ENTIDADE",
      width: 3
    },
    {
      label: "Endereço",
      type: "text",
      field: "DS_ENDERECO",
      width: 16
    },
    {
      label: "Número",
      type: "number",
      field: "NUM_ENDERECO",
      width: 5
    },
    {
      label: "Bairro",
      type: "text",
      field: "DS_BAIRRO",
      width: 8
    },
    {
      label: "CEP",
      type: "text",
      field: "NUM_CEP",
      width: 6,
      mask: "00.000-000"
    },
    {
      label: "Complemento",
      type: "text",
      field: "DS_COMPLEMENTO",
      width: 16
    }
  ]

    async autocomplete(load: any){
    let data = await this.service.autocomplete(load)
    this.dataRow = { ...this.dataRow, ...data }
    this.cdr.detectChanges()
  }

  async consultFile(){
    let data = await this.service.consultFile("ENTIDADES", this.dataRow.ID_ENTIDADE)

    console.log(data)
  }

  async lookup(lookup: any){
    let data = await this.service.lookup(lookup)
    this.dataLookups[lookup.table] = data
    this.cdr.detectChanges()
  }
}
