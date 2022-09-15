import { TestBed } from '@angular/core/testing';

import { WrongcomponentGuard } from './wrongcomponent.guard';

describe('WrongcomponentGuard', () => {
  let guard: WrongcomponentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WrongcomponentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
