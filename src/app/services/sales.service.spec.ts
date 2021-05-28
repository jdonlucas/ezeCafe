import { TestBed } from '@angular/core/testing';

import { SalesService } from './sales.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesService = TestBed.get(SalesService);
    expect(service).toBeTruthy();
  });
});
