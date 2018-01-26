import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDetailsPaneComponent } from './action-details-pane.component';

describe('ActionDetailsPaneComponent', () => {
  let component: ActionDetailsPaneComponent;
  let fixture: ComponentFixture<ActionDetailsPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionDetailsPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDetailsPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
