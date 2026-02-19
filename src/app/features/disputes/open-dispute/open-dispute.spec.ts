import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDispute } from './open-dispute';

describe('OpenDispute', () => {
  let component: OpenDispute;
  let fixture: ComponentFixture<OpenDispute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenDispute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenDispute);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
