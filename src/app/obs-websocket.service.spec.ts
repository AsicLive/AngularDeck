import { TestBed, inject } from '@angular/core/testing';

import { ObsServiceService } from './obs-service.service';

describe('ObsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObsServiceService]
    });
  });

  it('should be created', inject([ObsServiceService], (service: ObsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
