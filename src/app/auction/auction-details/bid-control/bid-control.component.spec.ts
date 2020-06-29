import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidControlComponent } from './bid-control.component';

describe('BidControlComponent', () => {
  let component: BidControlComponent;
  let fixture: ComponentFixture<BidControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
