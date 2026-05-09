import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { columnsGrid, dataForm } from '../engine/interfaces';

@Component({
  selector: 'app-subengine',
  imports: [CommonModule, FormsModule],
  templateUrl: './subengine.html',
  styleUrl: './subengine.css',
})
export class Subengine implements OnInit{

  @Input() dataSub: any = {}
  @Input() table: string = ''
  
  @Input() subForm: dataForm[] = []
  @Input() subColumns: columnsGrid[] = [] 

  subGrid: any[] = []

  subScreen: boolean = false
  subConsult: boolean = false
  subUpdate: boolean = false
  subClean: any = {}

  constructor(private cdr: ChangeDetectorRef){ }

  ngOnInit(): void {
    this.subClean = { ...this.dataSub }
  }

  btnIncluir(){
    this.subScreen = true
    this.cdr.detectChanges()
  }

  btnCancelar(){
    this.dataSub = { ...this.subClean, ...{ ID: this.dataSub.ID }}
    this.subScreen = false
    this.subUpdate = false
    this.cdr.detectChanges()
  }

  btnAlterar(){
    this.dataSub = this.subGrid.find(i => i.ID == this.dataSub.ID)
    this.subScreen = true
    this.subUpdate = true
    this.cdr.detectChanges()
  }

  btnExcluir(){
    let index = this.subGrid.findIndex(i => i.ID == this.dataSub.ID)
    
    this.subGrid.splice(index, 1)
    this.dataSub.ID = 0

    for(let i = 0; i < this.subGrid.length; i++){
      this.subGrid[i].ID = i + 1
    }

    this.cdr.detectChanges()
  }

  btnSalvar(){
    this.dataSub.ID = this.subGrid.length + 1
    this.subGrid = [ ...this.subGrid, ...[this.dataSub] ]
    this.btnCancelar()
  }

  btnAlteracao(){
    let index = this.subGrid.findIndex(i => i.ID == this.dataSub.ID)

    this.subGrid[index] = this.dataSub
    this.btnCancelar()
  }
}
