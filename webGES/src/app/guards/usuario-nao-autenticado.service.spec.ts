import { TestBed } from '@angular/core/testing';

import { UsuarioNaoAutenticadoService } from './usuario-nao-autenticado.service';

describe('UsuarioNaoAutenticadoService', () => {
  let service: UsuarioNaoAutenticadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioNaoAutenticadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
