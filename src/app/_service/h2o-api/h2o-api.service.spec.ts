import { TestBed, inject } from '@angular/core/testing';

import { H2oApiService } from './h2o-api.service';

describe('H2oApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [H2oApiService]
    });
  });

  it('should be created', inject([H2oApiService], (service: H2oApiService) => {
    expect(service).toBeTruthy();
  }));
});
