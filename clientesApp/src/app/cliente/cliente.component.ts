import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { Observable } from 'rxjs';
import { ClienteService } from '../cliente.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  dataSaved = false;  
  clienteForm: any;  
  allClientes: Observable<Cliente[]>;  
  clienteIdUpdate = null;  
  massage = null;  
  
  constructor(private formbulider: FormBuilder, private clienteService:ClienteService) { }  
  
  ngOnInit() {  
    this.clienteForm = this.formbulider.group({  
      NomeCompleto: ['', [Validators.required]],  
      Email: ['', [Validators.required]],  
      Senha: ['', [Validators.required]],  
      Login: ['', [Validators.required]],  
      DataNascimento: ['', [Validators.required]],  
    });  
    this.loadAllClientes();  
   }

   loadAllClientes() {  
      this.allClientes = this.clienteService.getAllCliente();  
   }  
   
   onFormSubmit() {  
      this.dataSaved = false;  
      const cliente = this.clienteForm.value;  
      this.CreateCliente(cliente);  
      this.clienteForm.reset();  
   }  
  
   loadClienteToEdit(clienteId: string) {  
      this.clienteService.getClienteById(clienteId).subscribe(cliente=> {  
        this.massage = null;  
        this.dataSaved = false;  
        this.clienteIdUpdate = cliente.Id;  
        this.clienteForm.controls['NomeCompleto'].setValue(cliente.NomeCompleto);  
        this.clienteForm.controls['Email'].setValue(cliente.Email);  
        this.clienteForm.controls['Senha'].setValue(cliente.DataNascimento);  
        this.clienteForm.controls['Login'].setValue(cliente.Senha);  
        this.clienteForm.controls['DataNascimento'].setValue(cliente.Login);  
      });  
    }  

    CreateCliente(cliente: Cliente) {  
      if (this.clienteIdUpdate == null) {  
        this.clienteService.createCliente(cliente).subscribe(  
          () => {  
            this.dataSaved = true;  
            this.massage = 'Registro salvo com sucesso';  
            this.loadAllClientes();  
            this.clienteIdUpdate = null;  
            this.clienteForm.reset();  
          }  
        );  
      } else {  
        cliente.Id = this.clienteIdUpdate;  
        this.clienteService.updateCliente(this.clienteIdUpdate, cliente).subscribe(() => {  
          this.dataSaved = true;  
          this.massage = 'Registro Atualizado com sucesso';  
          this.loadAllClientes();  
          this.clienteIdUpdate = null;  
          this.clienteForm.reset();  
        });  
      }  
    }   

    deleteCliente(clienteId: string) {  
      if (confirm("Deseja deletar este cliente ?")) {   
      this.clienteService.deleteClienteById(clienteId).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Registro deletado com sucesso';  
        this.loadAllClientes();  
        this.clienteIdUpdate = null;  
        this.clienteForm.reset();  
    
      });  
    }  
  }  
    resetForm() {  
      this.clienteForm.reset();  
      this.massage = null;  
      this.dataSaved = false;  
    }  
  }  