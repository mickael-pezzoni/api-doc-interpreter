import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

const materialModules = [
  MatExpansionModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
  MatListModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  ClipboardModule,
  MatTooltipModule,
  MatToolbarModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [materialModules]
})
export class SharedModule { }
