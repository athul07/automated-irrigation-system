import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuAuthLayoutComponent } from './au-auth-layout.component';

describe('AuAuthLayoutComponent', () => {
  let component: AuAuthLayoutComponent;
  let fixture: ComponentFixture<AuAuthLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuAuthLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
