import { Component } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Tags } from '../tags';
import { PostagsService } from '../../postags.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GlobalprimengModule } from '../../globalprimeng/globalprimeng.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  //frmTags!: FormGroup;


  postags: Tags[] = [];
  tagservico!: Tags;
  iD!: number;

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


  // formulario
  frmTags = this.fb.group({
    descricao: ['', Validators.required],
    infor: ['', Validators.required],

    address: this.fb.group({ // <- another group of element
      street: [''],
      postCode: ['', Validators.required]
    })

  });


  constructor(public postagsservice: PostagsService,
    //private themeservice: ThemeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder){}


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
    NovoRegistro() {
      //this.tagservico = {};
      this.submitted = false;
      this.tagDialog = true;
    }

    /*
    onSubmit(){
      console.log(this.postags.value);
      this.postagsservice.create(this.postags.value).subscribe((res:any) => {
           console.log('Post created successfully!');
      })
    */

    EditarRegistro(iD: number) {
      //this.postags = { ...this.postags };
      this.submitted = false;
      this.tagDialog = true;
    }

    gravaRegistro(iD: number){
      this.confirmationService.confirm({
        message: 'Confirma a alteração realizada ' + '?',
        header: 'Alteração',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          /*
          this.postagsservice.update(this.iD, this.frmTags.value ).subscribe(res => {
            this.postags = this.postags.filter(item => item.iDTag !== iD);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Registro Atualizado', life: 3000 });
            console.log('Registro atualizado com sucesso !');
          })
          */
        }
      });
    }

    viewerPostTags(iD: number) {
      this.submitted = false;
      this.tagDialog = true;
    }


    //-------ok
    deletePosTag(iD:number){
      this.confirmationService.confirm({
        message: 'Tem certeza de que deseja excluir ' + '?',
        header: 'Exclusão',
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
          header: 'Exclusão',
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
