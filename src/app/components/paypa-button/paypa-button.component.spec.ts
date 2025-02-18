import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypaButtonComponent } from './paypa-button.component';

describe('PaypaButtonComponent', () => {
  let component: PaypaButtonComponent;
  let fixture: ComponentFixture<PaypaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaypaButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaypaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
