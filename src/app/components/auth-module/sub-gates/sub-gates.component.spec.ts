import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGatesComponent } from './sub-gates.component';

describe('SubGatesComponent', () => {
  let component: SubGatesComponent;
  let fixture: ComponentFixture<SubGatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubGatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
