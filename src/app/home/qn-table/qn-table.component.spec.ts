import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QnTableComponent } from './qn-table.component';

describe('QnTableComponent', () => {
  let component: QnTableComponent;
  let fixture: ComponentFixture<QnTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QnTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QnTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
