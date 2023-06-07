import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDemoComponent } from './drag-demo.component';

describe('DragDemoComponent', () => {
  let component: DragDemoComponent;
  let fixture: ComponentFixture<DragDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
