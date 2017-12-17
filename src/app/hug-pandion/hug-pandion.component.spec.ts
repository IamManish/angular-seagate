import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HugPandionComponent } from './hug-pandion.component';

describe('HugPandionComponent', () => {
  let component: HugPandionComponent;
  let fixture: ComponentFixture<HugPandionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HugPandionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HugPandionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
