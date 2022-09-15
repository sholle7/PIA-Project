import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerentdaysComponent } from './changerentdays.component';

describe('ChangerentdaysComponent', () => {
  let component: ChangerentdaysComponent;
  let fixture: ComponentFixture<ChangerentdaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangerentdaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangerentdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
