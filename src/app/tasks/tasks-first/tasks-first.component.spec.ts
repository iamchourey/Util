import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksFirstComponent } from './tasks-first.component';

describe('TasksFirstComponent', () => {
  let component: TasksFirstComponent;
  let fixture: ComponentFixture<TasksFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
