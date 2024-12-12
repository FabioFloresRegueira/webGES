import { Routes } from '@angular/router';
import { IndexComponent } from './postags/index/index.component';
import { PerfilComponent } from './postags/perfil/perfil.component';
import { ConfigComponent } from './postags/config/config.component';
import { LoginComponent } from './postags/login/login.component';
import { ComponentFixture } from '@angular/core/testing';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { UsuarioNaoAutenticadoService } from './guards/usuario-nao-autenticado.service';
import { UsuarioAutenticadoService } from './guards/usuario-autenticado.service';
export const routes: Routes = [
  /*
  { path: '', redirectTo: 'postags/index', pathMatch: 'full'},
  { path: 'postags/index', component: IndexComponent},
  { path: 'postags/perfil', component: IndexComponent},
  { path: 'postags/config', component: IndexComponent}
  */

  { path: '', redirectTo: 'postags/login', pathMatch: "full"},
  { path: 'postags/login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoService]},
  { path: 'postags/index', component: IndexComponent, canActivate: [UsuarioAutenticadoService]},
  { path: 'postags/perfil', component: PerfilComponent, canActivate: [UsuarioAutenticadoService]},
  { path: 'postags/config', component: ConfigComponent, canActivate: [UsuarioAutenticadoService]}
];
