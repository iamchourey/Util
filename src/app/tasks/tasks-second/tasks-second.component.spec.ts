import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksSecondComponent } from './tasks-second.component';

describe('TasksSecondComponent', () => {
  let component: TasksSecondComponent;
  let fixture: ComponentFixture<TasksSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
