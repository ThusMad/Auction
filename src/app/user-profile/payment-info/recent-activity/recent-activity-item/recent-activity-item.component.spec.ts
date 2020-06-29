import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentActivityItemComponent } from './recent-activity-item.component';

describe('RecentActivityItemComponent', () => {
  let component: RecentActivityItemComponent;
  let fixture: ComponentFixture<RecentActivityItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentActivityItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentActivityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
