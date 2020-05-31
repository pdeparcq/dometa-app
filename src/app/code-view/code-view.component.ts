import { Component, OnInit, Input } from '@angular/core';
import { MetaType } from '../models/meta-type';
import { EntitiesService, CodeTemplateModel, CodeTemplatesService } from '../dometa-api';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.scss']
})
export class CodeViewComponent implements OnInit {

  @Input() metaType: MetaType;
  @Input() template: CodeTemplateModel;

  public code : string;

  constructor(private entitiesService: EntitiesService, private codeTemplatesService: CodeTemplatesService) { }

  ngOnInit(): void {
    this.entitiesService.apiBcBoundedContextIdEntitiesIdCodeTemplateIdGet(
      this.metaType.boundedContextId, 
      this.metaType.id, 
      this.template.id
      ).subscribe(model => this.code = model.value);
  }

  onTemplateValueChanged(newValue: string){
    this.codeTemplatesService.apiTemplatesTypeTemplateIdPut(this.metaType.type, this.template.id, {value: newValue}).subscribe(() => this.ngOnInit());
  }
}
