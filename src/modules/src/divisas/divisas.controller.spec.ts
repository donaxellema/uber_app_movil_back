import { Test, TestingModule } from '@nestjs/testing';
import { DivisasController } from './divisas.controller';

describe('DivisasController', () => {
  let controller: DivisasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DivisasController],
    }).compile();

    controller = module.get<DivisasController>(DivisasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
