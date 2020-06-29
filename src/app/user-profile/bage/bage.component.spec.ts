import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BageComponent } from './bage.component';

describe('BageComponent', () => {
  let component: BageComponent;
  let fixture: ComponentFixture<BageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
