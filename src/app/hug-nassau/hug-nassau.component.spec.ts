import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HugNassauComponent } from './hug-nassau.component';

describe('HugNassauComponent', () => {
  let component: HugNassauComponent;
  let fixture: ComponentFixture<HugNassauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HugNassauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HugNassauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
