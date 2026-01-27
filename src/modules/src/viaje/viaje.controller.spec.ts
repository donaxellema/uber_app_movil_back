import { Test, TestingModule } from '@nestjs/testing';
import { ViajeController } from './viaje.controller';

describe('ViajeController', () => {
  let controller: ViajeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViajeController],
    }).compile();

    controller = module.get<ViajeController>(ViajeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
