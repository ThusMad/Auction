import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAuctionsComponent } from './profile-auctions.component';

describe('ProfileAuctionsComponent', () => {
  let component: ProfileAuctionsComponent;
  let fixture: ComponentFixture<ProfileAuctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAuctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
