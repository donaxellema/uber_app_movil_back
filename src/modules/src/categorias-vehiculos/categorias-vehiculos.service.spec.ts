import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasVehiculosService } from './categorias-vehiculos.service';

describe('CategoriasVehiculosService', () => {
  let service: CategoriasVehiculosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriasVehiculosService],
    }).compile();

    service = module.get<CategoriasVehiculosService>(CategoriasVehiculosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
