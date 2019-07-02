import { TestBed } from '@angular/core/testing';

import { TestsSolubilityService } from './tests-solubility.service';

describe('TestsSolubilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestsSolubilityService = TestBed.get(TestsSolubilityService);
    expect(service).toBeTruthy();
  });
});
