import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyanamicFormComponent } from './dyanamic-form.component';

describe('DyanamicFormComponent', () => {
  let component: DyanamicFormComponent;
  let fixture: ComponentFixture<DyanamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DyanamicFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DyanamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
