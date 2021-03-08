import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { GenericsModule } from '../../generics/generics.module';
import { NisqAnalyzerComponent } from './nisq-analyzer.component';
import { NisqAnalyzerService } from './nisq-analyzer.service';

@NgModule({
  declarations: [NisqAnalyzerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    GenericsModule,
  ],
  exports: [NisqAnalyzerComponent],
  providers: [NisqAnalyzerService],
})
export class NisqAnalyzerModule {}
