import { Icu } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IContato } from '../interface/icontato';
import { ContratosService } from '../services/contratos.service';

@Component({
  selector: 'app-contato-list',
  templateUrl: './contato-list.component.html',
  styleUrls: ['./contato-list.component.css']
})

export class ContatoListComponent implements OnInit {
  contato = {} as IContato;
  contatos: IContato[] = [];
  flagListaVazia: Boolean = false;

  constructor(private router: Router, private contatosService: ContratosService) { }

  ngOnInit(): void {
    this.getContatos();
  }

  getContatos() {
    this.contatosService.getContatos().subscribe((contatos: IContato[]) => {
        this.contatos = contatos;
      }
    )
  }

  saveContato(form: NgForm){
    if(this.contato.id !== undefined){
      this.contatosService.updateContat(this.contato).subscribe(() => {
        this.cleanForm(form);
      } )
    }else{
      this.contatosService.postContato(this.contato).subscribe(() => {
        this.cleanForm(form);
      })
    }
  }

  editContato(contato: IContato){
    this.contato = { ...contato }
  }

  deleteContato(contato: IContato){
    this.contatosService.deleteContato(contato).subscribe(() => {
      this.getContatos();
    })
  }
  
  cleanForm(form: NgForm){
    this.getContatos();
    form.resetForm;
    this.contato = {} as IContato;
  }

  VoltarBtn() {
    this.router.navigate(['']);
  }

}
