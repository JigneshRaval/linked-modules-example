import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhCarouselComponent } from './ah-carousel.component';

describe('AhCarouselComponent', () => {
  let component: AhCarouselComponent;
  let fixture: ComponentFixture<AhCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
