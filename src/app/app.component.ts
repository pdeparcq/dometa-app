import { Component, OnInit } from '@angular/core';
import { AggregatesService } from './dometa-api/api/aggregates.service';
import { EntitiesService } from './dometa-api/api/entities.service';
import { ValueObjectsService } from './dometa-api/api/valueObjects.service';
import { EntityModel } from './dometa-api/model/entityModel';
import { environment } from 'src/environments/environment';
import { TreeNode } from 'primeng/api';
import { PropertyModel, EntityRelationModel, ValueObjectModel } from './dometa-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ AggregatesService ]
})
export class AppComponent implements OnInit {

    public nodes : TreeNode[] = [];

    private aggregatesNode : TreeNode;
    private entitiesNode: TreeNode;
    private valuesNode: TreeNode;
    
    constructor(
        private aggregateService: AggregatesService,
        private entityService: EntitiesService,
        private valueObjectService: ValueObjectsService
        ) { 
        
        //Create node for aggregates
        this.aggregatesNode = {
            data: {
                name: "Aggregates"
            },
            expandedIcon: "pi pi-folder-open",
            collapsedIcon: "pi pi-folder"
        }
        this.nodes.push(this.aggregatesNode);

        // Create node for entities
        this.entitiesNode = {
            data: {
                name: "Entities"
            },
            expandedIcon: "pi pi-folder-open",
            collapsedIcon: "pi pi-folder"
        }
        this.nodes.push(this.entitiesNode);

        // Create node for value objects
        this.valuesNode = {
            data: {
                name: "ValueObjects"
            },
            expandedIcon: "pi pi-folder-open",
            collapsedIcon: "pi pi-folder"
        }
        this.nodes.push(this.valuesNode);
    }

    ngOnInit() {
        this.aggregateService.apiBcBoundedContextIdAggregatesGet(environment.boundedContextId).subscribe(aggregates => {
            this.aggregatesNode.children = this.mapEntities(aggregates);
        });
        this.entityService.apiBcBoundedContextIdEntitiesGet(environment.boundedContextId).subscribe(entities => {
            this.entitiesNode.children = this.mapEntities(entities);
        });
        this.valueObjectService.apiBcBoundedContextIdValueObjectsGet(environment.boundedContextId).subscribe(valueObjects => {
            this.valuesNode.children = this.mapValueObjects(valueObjects);
        });
    }

    mapEntities(entities: EntityModel[]) : TreeNode[]{
        return entities.map<TreeNode>(e => {
            let entity = {
                data: {
                    name: e.name
                },
                children: [
                    {
                        data: {
                            name: "Properties"
                        },
                        children: this.mapProperties(e.properties)
                    },
                    {
                        data: {
                            name: "Relations"
                        },
                        children: this.mapRelations(e.relations)
                    }
                ]
            }
            // Map domain events if any
            if(e.domainEvents.length > 0){
                entity.children.push({
                    data: {
                        name: "DomainEvents"
                    },
                    children: e.domainEvents.map<TreeNode>(de => {
                        return {
                            data: {
                                name: de.name
                            },
                            children: [
                                {
                                    data: {
                                        name: "Properties"
                                    },
                                    children: this.mapProperties(de.properties)
                                }
                            ]
                        }
                    })
                });
            }
            return entity;
        });
    }

    mapValueObjects(valueObjects: ValueObjectModel[]) : TreeNode[]{
        return valueObjects.map<TreeNode>(v => {
            return {
                data: {
                    name: v.name
                },
                children: [
                    {
                        data: {
                            name: "Properties"
                        },
                        children: this.mapProperties(v.properties)
                    }
                ]
            };
        });
    }

    mapProperties(properties: PropertyModel[]) : TreeNode[]
    {
        return properties.map<TreeNode>(p => {
            return {
                data: {
                    name: p.name,
                    type: p.systemType ?? p.metaType.name
                }
            }
        });
    }

    mapRelations(relations: EntityRelationModel[]) : TreeNode[]
    {
        return relations.map<TreeNode>(r => {
            return {
                data: {
                    name: r.name,
                    type: r.metaType.name
                }
            }
        });
    }
}