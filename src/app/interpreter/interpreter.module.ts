import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterpreterComponent } from './interpreter.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RequestComponent } from './request/request.component';
import { PathTransformPipe } from './pipe/path-transform.pipe';
import { ResponseComponent } from './response/response.component';
import { BodyComponent } from './body/body.component';
import { FormsModule } from '@angular/forms';
import { ToStringPipe } from './pipe/to-string.pipe';
import { SchemaGuard } from '../core/guard/schema.guard';


const routes: Routes = [
  { path: '', component: InterpreterComponent, canActivate: [SchemaGuard] }
]


@NgModule({
  declarations: [
    InterpreterComponent,
    RequestComponent,
    PathTransformPipe,
    ResponseComponent,
    BodyComponent,
    ToStringPipe
  ],
  imports: [
    CommonModule,
    // CoreModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class InterpreterModule { }
