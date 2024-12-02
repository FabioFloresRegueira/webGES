import { Component, OnInit, Input, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Tags } from '../tags';
import { PostagsService } from '../../postags.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GlobalprimengModule } from '../../globalprimeng/globalprimeng.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isDate } from 'node:util/types';
import moment from 'moment';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    GlobalprimengModule,

  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  providers: [PostagsService, MessageService, ConfirmationService]
})

export class IndexComponent implements OnInit {

  tagDialog: boolean = false;
  isDisabled: boolean = false;
  painelinfo: boolean = false;

  postags: Tags[] = [];
  registroCorrente: FormGroup;

  chkTema: boolean = false;

  @ViewChild('dt') dt!: Table;

  selectedTags!: Tags[] | null;
  operacaoMode: string = ''; // e-edição | i-inclusao | v-visualizacao

  optCategoria!: any[];
  optStatus!: any[];
  minDate!: Date;

  ativos: number = 0;
  vigencia0a30: number = 0;
  vigencia31a60: number = 0;
  vigencia61a90: number = 0;
  vigenciamaior90: number = 0;
  inativos = 0;

  constructor(public postagsservice: PostagsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router,
    private fb: FormBuilder){

    registroCorrente: FormGroup;
      // INICIALIZANDO O FORMGROUP DENTRO DO CONSTRUTOR
      this.registroCorrente = this.fb.group({
        iDTag: [0, Validators.required],
        descricao: ['', Validators.required],
        categoria: ['', Validators.required],
        infor: '',
        vigencia: [new Date(), Validators.required],
        Diasvigencia: 0,
        status: [null, Validators.required],
        created_at: [new Date(), Validators.required],
        updated_at: new Date()
      });
  }
  fetchPostags() {
    this.postagsservice.getAll().subscribe({
      next: (data) => {
        this.postags = data;
      },
      error: (e) => console.error(e)
    });
  }

  fetchBrowser(){
    window.location.reload();
  }

  hideDialog() {
    this.tagDialog = false;
  }

  getTagStatus(status: number){
    switch (status) {
        case 1:
            return 'success';
        case 0:
            return 'danger';
        default: return 'success'
    }
  }

  getTagVigencia(dias: number): "success" | "info" | "warning" | "danger" | "secondary" | "contrast" | undefined {

    if (dias > 90) {
       return "info";
    } else if ( dias >=61 && dias <=90){
       return "success";
    } else if ( dias >=31 && dias <=60){
      return "warning";
    } else if ( dias <=30){
      return "danger";
    } else {
      return "contrast";
    }
  }

  ngAfterViewInit() {
    // Agora 'dt' deve estar inicializado
    //console.log(this.dt); // Verifique se 'dt' está definido aqui
  }

  filterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    if (this.dt) {
          this.dt.filterGlobal(value, 'contains');
    } else {
          console.error('dt não está definido');
    }
  }

  ngOnInit(): void {
    this.operacaoMode = '';
    // Configura o refresh automático a cada 5 minutos
    /*
    setInterval(() => {
      window.location.reload();
    }, 300000); // 300000 milissegundos = 5 minutos
    */

    this.postagsservice.getAll().subscribe((data: Tags[])=>{
      this.postags = data;
    })

    this.postagsservice.getAllativos().subscribe((d1: Tags[])=>{
      this.ativos = d1.length;
    })

    this.postagsservice.getAllinativos().subscribe((d2: Tags[])=>{
      this.inativos = d2.length;
    })

    this.postagsservice.getAllvigencia0a30().subscribe((d3: Tags[])=>{
      this.vigencia0a30 = d3.length;
    })

    this.postagsservice.getAllvigencia31a60().subscribe((d4: Tags[])=>{
      this.vigencia31a60 = d4.length;
    })

    this.postagsservice.getAllvigencia61a90().subscribe((d5: Tags[])=>{
      this.vigencia61a90 = d5.length;
    })

    this.postagsservice.getAllvigenciamaior90().subscribe((d6: Tags[])=>{
      this.vigenciamaior90 = d6.length;
    })

    this.optStatus =[
      { label: 'Inativo', value: 0},
      { label: 'Ativo', value: 1}
    ]

    this.optCategoria = [
      { label: 'CONTRATO', value: 'Contrato' },
      { label: 'CERTIFICADO', value: 'Certificado'},
      { label: 'DOMINIO', value: 'Dominio' },
      { label: 'EXTENSÃO GARANTIA', value: 'Extensão Garantia' },
      { label: 'LICENCIAMENTO', value: 'Licenciamento'},
      { label: 'HOSPEDAGEM', value: 'Hospedagem'}
    ];

  }

  btnViewer(iD: number) {
    this.operacaoMode = "v"; // visualizar.
    this.isDisabled = true;
    this.tagDialog = true;

    const dados = this.postags.find(item => item.iDTag === iD);

    const idtagAtNumber = dados?.iDTag ?? iD
    const descrAtString = dados?.descricao ?? '';
    const categAtString = dados?.categoria ?? '';
    const inforAtString = dados?.infor ?? '';
    const vigenciaAtDate = moment(dados?.vigencia).toDate();
    const diasVigNumber = dados?.Diasvigencia ?? 0;
    const statusAtNumber = dados?.status ?? 0 ;
    const createdAtDate = dados?.created_at ? moment(dados?.created_at).toDate() : null;
    const updatedAtDate = dados?.updated_at ? moment(dados?.updated_at).toDate() : null;

    this.postagsservice.find(iD).subscribe({
      next: (EditXdata) => {
        //this.registroCorrente.patchValue(data); // Inicializa o formulário com os dados
        this.registroCorrente.patchValue({
          iDTag: idtagAtNumber,
          descricao: descrAtString,
          categoria: categAtString,
          infor: inforAtString,
          vigencia: vigenciaAtDate,
          Diasvigencia: diasVigNumber,
          status: statusAtNumber,
          created_at: createdAtDate,
          updated_at: updatedAtDate
        });
       // console.log('btnVIEWER: Estado do formulário: ', this.registroCorrente.value); // Verifique o estado do formulário
      },
      error: (e) => console.error(e)
    });

  }

  btnNew() {
    this.operacaoMode = "i"; // inclusao
    this.isDisabled = false;
    this.tagDialog = true;

    this.registroCorrente.patchValue({
      iDTag: 0,
      descricao: '',
      categoria: '',
      infor: '',
      vigencia: new Date(), //null,
      Diasvigencia: 0,
      status: null,
      created_at: new Date(),
      updated_at: new Date()
    });

  }

  btnEdit(iD: number) {
    //console.log('Id: recebido ao clicar em [btnEDIT]: ', iD); // Verifique se o ID está correto
    this.operacaoMode = "e"; // edição
    this.tagDialog = true;
    this.isDisabled = false;

    const dados = this.postags.find(item => item.iDTag === iD);

    const idtagAtNumber = dados?.iDTag ?? iD
    const descrAtString = dados?.descricao ;
    const categAtString = dados?.categoria ;
    const inforAtString = dados?.infor;

    const vigenciaAtDate = moment(dados?.vigencia).toDate();

    const diasVigNumber = dados?.Diasvigencia;
    const statusAtNumber = dados?.status;
    const createdAtDate = moment(dados?.created_at).toDate(); //.format('YYYY-MM-DD HH:MM:SS')
    const updatedAtDate = moment(dados?.updated_at).toDate(); //.format('YYYY-MM-DD HH:MM:SS')

    this.postagsservice.find(iD).subscribe({
      next: (EditXdata) => {
        this.registroCorrente.patchValue({
          iDTag: idtagAtNumber,
          descricao: descrAtString,
          categoria: categAtString,
          infor: inforAtString,
          vigencia: vigenciaAtDate,
          Diasvigencia: diasVigNumber,
          status: statusAtNumber,
          created_at: createdAtDate,
          updated_at: updatedAtDate
        });
      },
      error: (e) => console.error(e)
    });
  }

  btnConfirmar(){

    let vigenciaconversao = new Date(this.registroCorrente.value.vigencia);
    let vigenciaformatada = vigenciaconversao.toISOString().slice(0, 19).replace('T', ' ');

    if (this.operacaoMode ==='e') {

      this.confirmationService.confirm({
        message: 'Confirma a alteração realizada no registro de iD: ' + this.registroCorrente.value.iDTag + " - " + this.registroCorrente.value.descricao  + '?',
        header: 'Alteração',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const dados = {
            iDTag: Number(this.registroCorrente.value.iDTag),
            descricao: this.registroCorrente.value.descricao,
            categoria: this.registroCorrente.value.categoria,
            infor: this.registroCorrente.value.infor,
            vigencia: new Date(vigenciaformatada),
            Diasvigencia: Number(this.registroCorrente.value.Diasvigencia),
            status: Number(this.registroCorrente.value.status),
            created_at: moment(this.registroCorrente.value.created_at).toDate(),
            updated_at: new Date(),
          };

          // Verifica se o registro já existe em postags
          const index = this.postags.findIndex(item => item.iDTag === this.registroCorrente.value.iDTag);

          if (index !== -1) {

            // Atraves do indice, atualiza o item existente na lista de serviços (pastags)
            this.postags[index] = dados;

            // chama o serviço update para atualizar o registro atualizado no backend.
            this.postagsservice.update(this.registroCorrente.value.iDTag, dados).subscribe({
              next: (dados) => {
                this.messageService.add({ severity: 'success', summary: 'Bem-sucedido', detail: 'Registro alterado com sucesso.', life: 3000 });
                this.fetchPostags();
                //this.fetchBrowser();
              },
              error: (e) => {
                console.log(e);
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar o registro.', life: 3000 });
              },
            });

          }
          this.tagDialog = false;
          this.isDisabled = false;
        }
      });

    } else if (this.operacaoMode ==='i') {

      this.confirmationService.confirm({
        message: 'Confirma a gravação do novo registro '+ this.registroCorrente.value.descricao + '?',
        header: 'Inclusão',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const dados = {
            iDTag: Number(this.registroCorrente.value.iDTag),
            descricao: this.registroCorrente.value.descricao,
            categoria: this.registroCorrente.value.categoria,
            infor: this.registroCorrente.value.infor,
            vigencia:  new Date(vigenciaformatada),

            Diasvigencia: Number(this.registroCorrente.value.Diasvigencia),
            status: Number(this.registroCorrente.value.status),
            created_at: new Date(),
            updated_at: new Date(),
          };

          const index = this.postags.findIndex(item => item.iDTag === this.registroCorrente.value.iDTag);

          if (index === -1) {

            //atualiza a lista postags
            this.postags.push(dados);

            // Chama o serviço para salvar o registro no backend
            this.postagsservice.create(dados).subscribe({
              next: (dados) => {
                this.messageService.add({ severity: 'success', summary: 'Bem-sucedido', detail: 'Registro adicionado com sucesso.', life: 3000 });
                this.fetchPostags();
                //this.fetchBrowser();
              },
              error: (e) => {
                console.log(e);
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao inserir o registro.', life: 3000 });
              },
            });
          }

          this.tagDialog = false;
          this.isDisabled = false;
        }
      });


    } else {
      this.hideDialog();
    }

  }


  btnDelete(iD:number){
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir o registro de iD: ' + iD + '?',
      header: 'Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.postagsservice.delete(iD).subscribe({
          next: (res) => {
            this.postags = this.postags.filter(item => item.iDTag !== iD);
            this.messageService.add({ severity: 'success', summary: 'Bem-sucedido', detail: 'O registro: ' + iD + ' foi deletado.', life: 3000 });
          },
          error: (e) => console.error(e)
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'informativo', detail: 'A deleção do registro: ' + iD + ' foi cancelada.', life: 3000 });
      }
    });
  }
  btndeleteSelected() {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão dos registros selecionados?',
      header: 'Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const selectedIds = this.selectedTags?.map(record => record.iDTag);
        selectedIds?.forEach(id => {
          this.postagsservice.delete(id).subscribe({
            next: () => {
              this.postags = this.postags.filter(item => item.iDTag !== id);
              this.messageService.add({ severity: 'success', summary: 'Bem-sucedido', detail: 'Os registros selecionados foram deletados.', life: 3000 });
            },
            error: (e) => console.error(e)
          });
        });
        this.selectedTags = []; // Limpa a seleção após a exclusão
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'informativo', detail: 'A deleção dos registros selecionados foram cancelados.', life: 3000 });
      }
    });
  }

}
