import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*
*/
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { KnobModule } from 'primeng/knob';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [],
  imports: [
    CommonModule

  ],
  exports: [
    ButtonModule,
    SelectButtonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    KnobModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    TagModule
  ]
})
export class GlobalprimengModule { }
