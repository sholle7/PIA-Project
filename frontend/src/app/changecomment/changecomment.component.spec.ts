import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangecommentComponent } from './changecomment.component';

describe('ChangecommentComponent', () => {
  let component: ChangecommentComponent;
  let fixture: ComponentFixture<ChangecommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangecommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
