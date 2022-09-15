import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedbooksComponent } from './rentedbooks.component';

describe('RentedbooksComponent', () => {
  let component: RentedbooksComponent;
  let fixture: ComponentFixture<RentedbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentedbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentedbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
