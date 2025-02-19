import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseItemTileComponent } from './purchase-item-tile.component';

describe('PurchaseItemTileComponent', () => {
  let component: PurchaseItemTileComponent;
  let fixture: ComponentFixture<PurchaseItemTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseItemTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseItemTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
