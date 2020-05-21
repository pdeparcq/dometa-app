import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { TabViewModule } from 'primeng/tabview';
import { ApiModule } from './dometa-api/api.module';

import { AppComponent } from './app.component';
import { Configuration } from './dometa-api';
import { environment } from 'src/environments/environment';
import { BoundedContextTreeViewComponent } from './bounded-context-tree-view/bounded-context-tree-view.component';

@NgModule({
    declarations: [
        AppComponent,
        BoundedContextTreeViewComponent
    ],
    imports: [
        ApiModule.forRoot(() => new Configuration(
            {
                basePath: environment.apiBasePath
            }
        )),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        AccordionModule,
        ListboxModule,
        ScrollPanelModule,
        TreeModule,
        TreeTableModule,
        TabViewModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }