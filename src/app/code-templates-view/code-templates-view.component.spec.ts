import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTemplatesViewComponent } from './code-templates-view.component';

describe('CodeTemplatesViewComponent', () => {
  let component: CodeTemplatesViewComponent;
  let fixture: ComponentFixture<CodeTemplatesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeTemplatesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeTemplatesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
