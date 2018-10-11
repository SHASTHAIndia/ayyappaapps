import { TestBed } from '@angular/core/testing';

import { NewquestionService } from './newquestion.service';

describe('NewquestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewquestionService = TestBed.get(NewquestionService);
    expect(service).toBeTruthy();
  });
});
