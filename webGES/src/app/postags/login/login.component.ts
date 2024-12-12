import { Component, OnInit, Input, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GlobalprimengModule } from '../../globalprimeng/globalprimeng.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Usuarios } from '../usuarios';
import { UsuariosService } from '../../usuarios.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
      CommonModule,
      RouterModule,
      GlobalprimengModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [UsuariosService, MessageService, ConfirmationService]
})
export class LoginComponent implements OnInit {

  usuarios: Usuarios[] = [];
  registroCorrente: FormGroup;

  constructor(public usuariosservice: UsuariosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router,
    private fb: FormBuilder){

      registroCorrente: FormGroup;
      // INICIALIZANDO O FORMGROUP DENTRO DO CONSTRUTOR
      this.registroCorrente = this.fb.group({
        iDUser: [0, Validators.required],
        nome: ['', Validators.required],
        email: ['', Validators.required],
        senha: ['', Validators.required],
        ctrsenha: ['', Validators.required],
        oldsenha: ['', Validators.required],
        status: [0, Validators.required],
        created_at: [new Date(), Validators.required],
        updated_at: new Date()
      });

    }


ngOnInit() {
  this.criarForm();
}

criarForm(){
  this.registroCorrente = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required]]
  });
}

logar(){
  if(this.registroCorrente.invalid) return;
  var usuario = this.registroCorrente.getRawValue() as Usuarios;
  this.usuariosservice.logar(usuario).subscribe((response) => {
      if(!response.sucesso){
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha na autenticação, usuario ou senha incorretos.', life: 3000 });
      }
  })
}


}
