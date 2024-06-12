import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsListCardComponent } from './sessions-list-card.component';

describe('SessionsListCardComponent', () => {
  let component: SessionsListCardComponent;
  let fixture: ComponentFixture<SessionsListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionsListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
