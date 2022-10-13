import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailCreateComponent } from './purchase-detail-create.component';

describe('PurchaseDetailCreateComponent', () => {
  let component: PurchaseDetailCreateComponent;
  let fixture: ComponentFixture<PurchaseDetailCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
