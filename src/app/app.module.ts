import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { DadDirective } from './directives/dad.directive';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { NotSchemaGuard } from './core/guard/not-schema.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [NotSchemaGuard] },
  { path: 'interpreter', loadChildren: () => import('./interpreter/interpreter.module').then(m => m.InterpreterModule) }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DadDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SharedModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
