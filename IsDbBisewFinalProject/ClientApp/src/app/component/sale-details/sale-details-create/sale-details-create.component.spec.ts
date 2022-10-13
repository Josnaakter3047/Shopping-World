import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDetailsCreateComponent } from './sale-details-create.component';

describe('SaleDetailsCreateComponent', () => {
  let component: SaleDetailsCreateComponent;
  let fixture: ComponentFixture<SaleDetailsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleDetailsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
