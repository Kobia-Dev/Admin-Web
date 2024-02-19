import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigitalTrainingRoutingModule } from './digital-training-routing.module';
import { DigitaltrainingComponent } from './digitaltraining/digitaltraining.component';
import { ComponentsModule } from '../shared/components/components.module';
import { ExternalLinkDirective } from './external-link.directive';




@NgModule({
  declarations: [
    DigitaltrainingComponent,
    ExternalLinkDirective
    
    
    
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DigitalTrainingRoutingModule
  ]
})
export class DigitalTrainingModule { }
