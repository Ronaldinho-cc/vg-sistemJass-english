import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesDetailComponent } from './zones-detail.component';

describe('ZonesDetailComponent', () => {
  let component: ZonesDetailComponent;
  let fixture: ComponentFixture<ZonesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
