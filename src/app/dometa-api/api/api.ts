export * from './aggregates.service';
import { AggregatesService } from './aggregates.service';
export * from './codeTemplates.service';
import { CodeTemplatesService } from './codeTemplates.service';
export * from './entities.service';
import { EntitiesService } from './entities.service';
export * from './valueObjects.service';
import { ValueObjectsService } from './valueObjects.service';
export const APIS = [AggregatesService, CodeTemplatesService, EntitiesService, ValueObjectsService];
