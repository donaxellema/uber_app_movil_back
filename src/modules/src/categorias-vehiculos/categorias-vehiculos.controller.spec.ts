import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasVehiculosController } from './categorias-vehiculos.controller';

describe('CategoriasVehiculosController', () => {
  let controller: CategoriasVehiculosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasVehiculosController],
    }).compile();

    controller = module.get<CategoriasVehiculosController>(CategoriasVehiculosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
