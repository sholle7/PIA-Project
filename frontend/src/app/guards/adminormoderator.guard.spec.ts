import { TestBed } from '@angular/core/testing';

import { AdminormoderatorGuard } from './adminormoderator.guard';

describe('AdminormoderatorGuard', () => {
  let guard: AdminormoderatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminormoderatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
