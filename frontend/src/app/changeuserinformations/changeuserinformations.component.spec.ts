import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeuserinformationsComponent } from './changeuserinformations.component';

describe('ChangeuserinformationsComponent', () => {
  let component: ChangeuserinformationsComponent;
  let fixture: ComponentFixture<ChangeuserinformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeuserinformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeuserinformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
