import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailEditComponent } from './purchase-detail-edit.component';

describe('PurchaseDetailEditComponent', () => {
  let component: PurchaseDetailEditComponent;
  let fixture: ComponentFixture<PurchaseDetailEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
