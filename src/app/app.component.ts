import { Component, OnInit } from '@angular/core';
import { AggregatesService } from './dometa-api/api/aggregates.service';
import { environment } from 'src/environments/environment';
import { TreeNode } from 'primeng/api/treenode';
import { MetaType } from './models/meta-type';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ AggregatesService ]
})
export class AppComponent implements OnInit {

    public boundedContextId: string = environment.boundedContextId;
    public metaType: MetaType;

    constructor() { 
    }

    ngOnInit() {
    }

    public onMetaTypeSelected(metaType: MetaType){
        this.metaType = metaType;
    }
}