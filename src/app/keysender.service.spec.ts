import { TestBed, inject } from '@angular/core/testing';

import { KeysenderService } from './keysender.service';

describe('KeysenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeysenderService]
    });
  });

  it('should be created', inject([KeysenderService], (service: KeysenderService) => {
    expect(service).toBeTruthy();
  }));
});
