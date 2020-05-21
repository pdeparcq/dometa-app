import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoundedContextTreeViewComponent } from './bounded-context-tree-view.component';

describe('BoundedContextTreeViewComponent', () => {
  let component: BoundedContextTreeViewComponent;
  let fixture: ComponentFixture<BoundedContextTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoundedContextTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoundedContextTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
