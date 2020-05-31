import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CodeTemplatesService, CodeTemplateModel } from '../dometa-api';
import { MetaType } from '../models/meta-type';

@Component({
  selector: 'app-code-templates-view',
  templateUrl: './code-templates-view.component.html',
  styleUrls: ['./code-templates-view.component.scss']
})
export class CodeTemplatesViewComponent implements OnInit, OnChanges {

  @Input() metaType: MetaType;

  public codeTemplates: CodeTemplateModel[];

  constructor(private codeTemplatesService: CodeTemplatesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.codeTemplatesService.apiTemplatesTypeGet(this.metaType.type).subscribe(templates => this.codeTemplates = templates);
  }

  ngOnInit(): void {
    this.codeTemplatesService.apiTemplatesTypeGet(this.metaType.type).subscribe(templates => this.codeTemplates = templates);
  }

}
