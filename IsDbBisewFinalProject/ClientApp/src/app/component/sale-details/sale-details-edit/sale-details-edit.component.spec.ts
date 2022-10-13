import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDetailsEditComponent } from './sale-details-edit.component';

describe('SaleDetailsEditComponent', () => {
  let component: SaleDetailsEditComponent;
  let fixture: ComponentFixture<SaleDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleDetailsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
