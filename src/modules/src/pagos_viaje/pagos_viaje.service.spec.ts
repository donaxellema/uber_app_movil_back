import { Test, TestingModule } from '@nestjs/testing';
import { PagosViajeService } from './pagos_viaje.service';

describe('PagosViajeService', () => {
  let service: PagosViajeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagosViajeService],
    }).compile();

    service = module.get<PagosViajeService>(PagosViajeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
