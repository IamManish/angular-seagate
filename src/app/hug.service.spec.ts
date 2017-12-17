import { TestBed, inject } from '@angular/core/testing';

import { HugService } from './hug.service';

describe('HugService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HugService]
    });
  });

  it('should be created', inject([HugService], (service: HugService) => {
    expect(service).toBeTruthy();
  }));
});
