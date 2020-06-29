import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAuctionItemComponent } from './profile-auction-item.component';

describe('ProfileAuctionItemComponent', () => {
  let component: ProfileAuctionItemComponent;
  let fixture: ComponentFixture<ProfileAuctionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAuctionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAuctionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
