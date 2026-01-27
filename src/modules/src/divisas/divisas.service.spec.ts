import { Test, TestingModule } from '@nestjs/testing';
import { DivisasService } from './divisas.service';

describe('DivisasService', () => {
  let service: DivisasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DivisasService],
    }).compile();

    service = module.get<DivisasService>(DivisasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
