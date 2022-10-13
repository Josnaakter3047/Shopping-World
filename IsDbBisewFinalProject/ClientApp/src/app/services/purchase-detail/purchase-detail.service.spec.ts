import { TestBed } from '@angular/core/testing';

import { PurchaseDetailService } from './purchase-detail.service';

describe('PurchaseDetailService', () => {
  let service: PurchaseDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
