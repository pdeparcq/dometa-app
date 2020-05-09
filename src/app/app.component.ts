import { Component, OnInit } from '@angular/core';
import { AggregatesService } from './dometa-api/api/aggregates.service';
import { EntityModel } from './dometa-api/model/entityModel';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ AggregatesService ]
})
export class AppComponent implements OnInit {

    public aggregates : EntityModel[] = [];

    constructor(private aggregateService: AggregatesService) { }

    ngOnInit() {
        this.aggregateService.apiBcBoundedContextIdAggregatesGet(environment.boundedContextId).subscribe(r => this.aggregates = r)
    }
}