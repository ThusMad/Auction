import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedAuctionsComponent } from './watched-auctions.component';

describe('WatchedAuctionsComponent', () => {
  let component: WatchedAuctionsComponent;
  let fixture: ComponentFixture<WatchedAuctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchedAuctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
