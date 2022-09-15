import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepersonalinformationsComponent } from './changepersonalinformations.component';

describe('ChangepersonalinformationsComponent', () => {
  let component: ChangepersonalinformationsComponent;
  let fixture: ComponentFixture<ChangepersonalinformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepersonalinformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepersonalinformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
