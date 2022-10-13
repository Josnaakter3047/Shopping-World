import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageCreateComponent } from './product-image-create.component';

describe('ProductImageCreateComponent', () => {
  let component: ProductImageCreateComponent;
  let fixture: ComponentFixture<ProductImageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductImageCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductImageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
