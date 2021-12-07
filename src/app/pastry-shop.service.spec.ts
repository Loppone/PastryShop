import { TestBed } from '@angular/core/testing';

import { PastryShopService } from './pastry-shop.service';

describe('PastryShopService', () => {
  let service: PastryShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastryShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
