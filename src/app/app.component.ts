import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from './core/data.service';
import { switchMap, startWith, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  form = new FormGroup({});
  model = {
    id: 123123,
    firstname: 'Juri',
    age: 34,
    nationId: 1,
    cityId: 1,
    ip: null
  };
  fields: FormlyFieldConfig[] = [];

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private formlyJsonSchema: FormlyJsonschema
  ) {}

  ngOnInit() {
    this.http
      .get<FormlyFieldConfig[]>('/assets/dynamic-form.json')
      .subscribe(jsonSchema => {
        const formlyConfig = this.formlyJsonSchema.toFieldConfig(jsonSchema);

        this.fields = formlyConfig.fieldGroup;
      });
  }

  onSubmit({ valid, value }) {
    console.log(value);
  }
}
