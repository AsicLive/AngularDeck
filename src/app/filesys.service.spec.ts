import { TestBed, inject } from '@angular/core/testing';

import { FilesysService } from './filesys.service';

describe('FilesysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesysService]
    });
  });

  it('should be created', inject([FilesysService], (service: FilesysService) => {
    expect(service).toBeTruthy();
  }));
});
