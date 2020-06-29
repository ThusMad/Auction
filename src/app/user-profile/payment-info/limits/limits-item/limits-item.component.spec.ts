import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitsItemComponent } from './limits-item.component';

describe('LimitsItemComponent', () => {
  let component: LimitsItemComponent;
  let fixture: ComponentFixture<LimitsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
