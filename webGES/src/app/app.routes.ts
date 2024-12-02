import { Routes } from '@angular/router';
import { IndexComponent } from './postags/index/index.component';
import { PerfilComponent } from './postags/perfil/perfil.component';
import { ConfigComponent } from './postags/config/config.component';
export const routes: Routes = [
  { path: '', redirectTo: 'postags/index', pathMatch: 'full'},
  { path: 'postags/index', component: IndexComponent},
  { path: 'postags/perfil', component: IndexComponent},
  { path: 'postags/config', component: IndexComponent}

];
