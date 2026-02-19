import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputeHistory } from './dispute-history';

describe('DisputeHistory', () => {
  let component: DisputeHistory;
  let fixture: ComponentFixture<DisputeHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisputeHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisputeHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
