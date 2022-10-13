import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingSessionComponent } from './shopping-session.component';

describe('ShoppingSessionComponent', () => {
  let component: ShoppingSessionComponent;
  let fixture: ComponentFixture<ShoppingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
