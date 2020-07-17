import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplenishDialogComponent } from './replenish-dialog.component';

describe('ReplenishDialogComponent', () => {
  let component: ReplenishDialogComponent;
  let fixture: ComponentFixture<ReplenishDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplenishDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
