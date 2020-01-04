import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import {
  ReactiveFormsModule,
  FormControl,
  ValidationErrors
} from '@angular/forms';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectFormlyComponent } from './ng-select.type';
import { dataCyExtension } from './data-cy.extension';

export function minValidationMessage(err, field: FormlyFieldConfig) {
  return `Please provide a value bigger than ${err.min}. You provided ${err.actual}`;
}

export function ipValidationMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid IP address`;
}

export function IpValidator(control: FormControl): ValidationErrors {
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value)
    ? null
    : { ip: true };
}

@NgModule({
  declarations: [AppComponent, NgSelectFormlyComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormlyModule.forRoot({
      validators: [
        {
          name: 'ip',
          validation: IpValidator
        }
      ],
      validationMessages: [
        {
          name: 'required',
          message: 'This field is required'
        },
        {
          name: 'min',
          message: minValidationMessage
        },
        {
          name: 'ip',
          message: ipValidationMessage
        }
      ],
      types: [
        {
          name: 'my-autocomplete',
          component: NgSelectFormlyComponent
        }
      ],
      extensions: [
        {
          name: 'data-cy-extension',
          extension: dataCyExtension
        }
      ]
    }),
    FormlyMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
