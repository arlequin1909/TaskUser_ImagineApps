import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskComponentComponent } from './create-task-component';

describe('CreateTaskComponentComponent', () => {
  let component: CreateTaskComponentComponent;
  let fixture: ComponentFixture<CreateTaskComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTaskComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
