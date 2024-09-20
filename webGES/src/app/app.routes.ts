import { Routes } from '@angular/router';
import { IndexComponent } from './postags/index/index.component';

export const routes: Routes = [
  { path: '', redirectTo: 'postags/index', pathMatch: 'full'},
  { path: 'postags/index', component: IndexComponent}

];
