import { Component, OnInit } from '@angular/core';
import { AggregatesService } from './dometa-api/api/aggregates.service';
import { environment } from 'src/environments/environment';
import { TreeNode } from 'primeng/api/treenode';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ AggregatesService ]
})
export class AppComponent implements OnInit {

    public boundedContextId: string = environment.boundedContextId;
    public selectedNode: any;

    constructor() { 
    }

    ngOnInit() {
    }

    public onNodeSelected(node: TreeNode){
        if(node.data){
            this.selectedNode = node.data;
        }
    }
}