import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from './core/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  form = new FormGroup({});
  model = {
    firstname: 'Juri',
    age: 34,
    nationId: 1
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstname',
      type: 'input',
      templateOptions: {
        label: 'Firstname'
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.label = 'Firstname changed';
        }
      }
    },
    {
      key: 'age',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Age'
      }
    },
    {
      key: 'nationId',
      type: 'select', // <select>
      templateOptions: {
        label: 'Nation',
        options: this.dataService.getNations()
      }
    }
  ];

  constructor(private dataService: DataService) {}

  onSubmit({ valid, value }) {
    console.log(value);
  }
}
