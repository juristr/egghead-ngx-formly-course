import { Component } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyField,
  FormlyFormOptions,
  FormlyTemplateOptions
} from '@ngx-formly/core';
import { DataService } from './core/data.service';
import { switchMap, startWith, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

const formlyRow = (fieldConfig: FormlyFieldConfig[]) => {
  return {
    fieldGroupClassName: 'display-flex',
    fieldGroup: fieldConfig
  };
};

const formlyInput = (config: {
  key: string;
  label: string;
  templateOptions: FormlyTemplateOptions;
}): FormlyFieldConfig => {
  return {
    key: config.key,
    type: 'input',
    className: 'flex-3',
    templateOptions: {
      label: config.label,
      ...config.templateOptions
    }
  };
};

const formlyNationInput = (nations: Observable<any>) => {
  return {
    key: 'nationId',
    type: 'select', // <select>
    className: 'flex-3',
    templateOptions: {
      label: 'Nation',
      options: nations
    }
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  form = new FormGroup({});
  model = {
    id: 123123,
    firstname: 'Juri',
    age: 34,
    nationId: 1,
    cityId: 1,
    ip: null
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    formlyRow([
      formlyInput({
        key: 'firstname',
        label: 'Firstname',
        templateOptions: {
          required: true
        }
      }),
      {
        key: 'age',
        type: 'input',
        className: 'flex-1',
        templateOptions: {
          type: 'number',
          label: 'Age',
          min: 18
        },
        validation: {
          messages: {
            min: 'Sorry, you have to be older than 18'
          }
        }
      }
    ]),
    formlyRow([
      formlyNationInput(this.dataService.getNations()),
      {
        key: 'cityId',
        type: 'select', // <select>
        className: 'flex-3',
        templateOptions: {
          label: 'Cities',
          options: []
        },
        expressionProperties: {
          'templateOptions.disabled': model => !model.nationId,
          'model.cityId': '!model.nationId ? null : model.cityId'
        },
        hideExpression: model => !model.nationId,
        hooks: {
          onInit: (field: FormlyFieldConfig) => {
            field.templateOptions.options = field.form
              .get('nationId')
              .valueChanges.pipe(
                startWith(this.model.nationId),
                switchMap(nationId => this.dataService.getCities(nationId))
              );
          }
        }
      }
    ]),
    formlyRow([
      {
        key: 'ip',
        type: 'input',
        className: 'flex-6',
        templateOptions: {
          label: 'IP Address',
          required: true
        },
        validators: {
          // validation: ['ip']
          ip2: {
            expression: c => !c.value || /(\d{1,3}\.){3}\d{1,3}/.test(c.value),
            message: (errorr, field: FormlyFieldConfig) =>
              `"${field.formControl.value}" is not valid`
          }
        }
      }
    ])
  ];

  constructor(
    private dataService: DataService,
    private translate: TranslateService
  ) {
    // this.translate.use('de');
  }

  onSubmit({ valid, value }) {
    console.log(value);
  }
}
