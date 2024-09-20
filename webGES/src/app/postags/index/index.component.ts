import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Tags } from '../tags';
import { PostagsService } from '../../postags.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GlobalprimengModule } from '../../globalprimeng/globalprimeng.module';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    GlobalprimengModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  providers: [PostagsService, MessageService, ConfirmationService]
})
export class IndexComponent {

  tagDialog: boolean = false;
  frmTags!: FormGroup;


  postags: Tags[] = [];
  tagservico!: Tags;


  selectedTags!: Tags[] | null;
  submitted: boolean = false;

  optCategoria!: any[];
  optStatus!: any[];


  ativos: number = 0;
  vigencia0a30: number = 50;
  vigencia31a60: number = 35;
  vigencia61a90: number = 25;
  vigenciamaior90: number = 10;
  inativos = 2;


  constructor(public postagsservice: PostagsService,
    //private themeservice: ThemeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService){}


    hideDialog() {
      this.tagDialog = false;
      this.submitted = false;
    }

    ngOnInit(): void {
      this.postagsservice.getAll().subscribe((data: Tags[])=>{
        this.postags = data;
        //console.log(this.postags);
        this.ativos = this.postags.length;
      })

      this.optStatus =[
        { label: 'Inativo', value: 0},
        { label: 'Ativo', value: 1}
      ]

      this.optCategoria = [
        { name: 'CONTRATO', code: 'Contrato' },
        { name: 'DOMINIO', code: 'Dominio' },
        { name: 'EXTENSÃO GARANTIA', code: 'Extensão Garantia' },
        { nome: 'LICENCIAMENTO', code: 'Licenciamento'}
      ];


    }

    //--------revisar
    NewPosTags() {
      //this.tagservico = {};
      this.submitted = false;
      this.tagDialog = true;
    }

    editPostTags(iD: number) {
      this.postags = { ...this.postags };
      this.tagDialog = true;
    }

    viewerPostTags(iD: number) {
      this.tagDialog = true;
    }

    /*
    onSubmit(){
      console.log(this.postags.value);
      this.postagsservice.create(this.postags.value).subscribe((res:any) => {
           console.log('Post created successfully!');
      })
    */

    //-------ok
    deletePosTag(iD:number){
      this.confirmationService.confirm({
        message: 'Tem certeza de que deseja excluir ' + '?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.postagsservice.delete(iD).subscribe(res => {
            this.postags = this.postags.filter(item => item.iDTag !== iD);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Registro Deletado', life: 3000 });
            console.log('Registro deletado com sucesso !');
          })
    }});
    }

    //--------revisar
    deleteSelectedPosTags() {
      this.confirmationService.confirm({
          message: 'Tem certeza de que deseja excluir os produtos selecionados?',
          header: 'Confirmação',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.postags = this.postags.filter((val) => !this.selectedTags?.includes(val));
              this.selectedTags = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Registros Deletados', life: 3000 });
          }
      });
    }



    gravaPostags() {
      this.submitted = true;

    }

    findIndexById(id: number): number {
      return 0;
    }

    createId(): string {
      let id = '';
      return id;
    }




}
