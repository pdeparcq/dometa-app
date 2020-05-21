import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { AggregatesService, EntitiesService, ValueObjectsService, EntityModel, ValueObjectModel, PropertyModel, EntityRelationModel } from '../dometa-api';

@Component({
  selector: 'app-bounded-context-tree-view',
  templateUrl: './bounded-context-tree-view.component.html',
  styleUrls: ['./bounded-context-tree-view.component.scss']
})
export class BoundedContextTreeViewComponent implements OnInit {

  @Input() boundedContextId: string;
  @Output() selectedNode: EventEmitter<TreeNode> = new EventEmitter<TreeNode>()

  public nodes: TreeNode[] = [];
  
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
          }
      }
      this.nodes.push(this.aggregatesNode);

      // Create node for entities
      this.entitiesNode = {
          data: {
              name: "Entities"
          }
      }
      this.nodes.push(this.entitiesNode);

      // Create node for value objects
      this.valuesNode = {
          data: {
              name: "ValueObjects"
          }
      }
      this.nodes.push(this.valuesNode);
  }

  ngOnInit() {
      this.aggregateService.apiBcBoundedContextIdAggregatesGet(this.boundedContextId).subscribe(aggregates => {
          this.aggregatesNode.children = this.mapEntities(aggregates);
      });
      this.entityService.apiBcBoundedContextIdEntitiesGet(this.boundedContextId).subscribe(entities => {
          this.entitiesNode.children = this.mapEntities(entities);
      });
      this.valueObjectService.apiBcBoundedContextIdValueObjectsGet(this.boundedContextId).subscribe(valueObjects => {
          this.valuesNode.children = this.mapValueObjects(valueObjects);
      });
  }

  public onNodeSelect(node: TreeNode){
    this.selectedNode.emit(node);
  }

  mapEntities(entities: EntityModel[]) : TreeNode[]{
      return entities.map<TreeNode>(e => {
          let entity = {
              data: {
                  id: e.id,
                  name: e.name,
                  type: e.domainEvents.length > 0 ? "Aggregate" : "Entity"
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
                              name: de.name,
                              type: "DomainEvent"
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
                  id: v.id,
                  name: v.name,
                  type: "ValueObject"
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
                  type: "Property",
                  metaType: p.systemType ?? p.metaType.name
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
                  type: "Relation",
                  metaType: r.metaType.name
              }
          }
      });
  }
}
