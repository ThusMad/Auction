import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSideviewComponent } from './profile-sideview.component';

describe('ProfileSideviewComponent', () => {
  let component: ProfileSideviewComponent;
  let fixture: ComponentFixture<ProfileSideviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSideviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSideviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
