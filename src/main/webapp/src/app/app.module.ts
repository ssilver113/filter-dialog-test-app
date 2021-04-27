import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MaterialModule } from './material.module'
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component'
import { FilterSettingsComponent } from './components/filter-controls/filter-settings.component'
import { FilterFieldConditionComponent } from './components/filter-controls/filter-condition/filter-field-condition.component'
import { APIInterceptor } from './services/api/api-interceptor'

@NgModule({
    declarations: [
        AppComponent,
        FilterDialogComponent,
        FilterSettingsComponent,
        FilterFieldConditionComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        DragDropModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
