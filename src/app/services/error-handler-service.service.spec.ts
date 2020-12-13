import { TestBed } from '@angular/core/testing';

import { ErrorHandlerServiceService } from './error-handler-service.service';

describe('ErrorHandlerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorHandlerServiceService = TestBed.get(ErrorHandlerServiceService);
    expect(service).toBeTruthy();
  });
});
