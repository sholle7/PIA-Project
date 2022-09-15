import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangebookinformationsComponent } from './changebookinformations.component';

describe('ChangebookinformationsComponent', () => {
  let component: ChangebookinformationsComponent;
  let fixture: ComponentFixture<ChangebookinformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangebookinformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangebookinformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
