import { Test, TestingModule } from '@nestjs/testing';
import { PagosViajeController } from './pagos_viaje.controller';

describe('PagosViajeController', () => {
  let controller: PagosViajeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagosViajeController],
    }).compile();

    controller = module.get<PagosViajeController>(PagosViajeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
