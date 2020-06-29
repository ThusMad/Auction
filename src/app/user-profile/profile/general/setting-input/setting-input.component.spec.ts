import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingInputComponent } from './setting-input.component';

describe('SettingInputComponent', () => {
  let component: SettingInputComponent;
  let fixture: ComponentFixture<SettingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
