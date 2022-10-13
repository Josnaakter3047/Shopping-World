import { TestBed } from '@angular/core/testing';

import { ShoppingSessionService } from './shopping-session.service';

describe('ShoppingSessionService', () => {
  let service: ShoppingSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
