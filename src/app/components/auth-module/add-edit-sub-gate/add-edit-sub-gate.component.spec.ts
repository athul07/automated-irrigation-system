import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubGateComponent } from './add-edit-sub-gate.component';

describe('AddEditSubGateComponent', () => {
  let component: AddEditSubGateComponent;
  let fixture: ComponentFixture<AddEditSubGateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSubGateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSubGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
