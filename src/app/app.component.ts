import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from './core/data.service';
import { switchMap, startWith, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<FormlyFieldConfig[]>('/assets/dynamic-form.json')
      .subscribe(fields => {
        this.fields = fields;
      });
  }

  onSubmit({ valid, value }) {
    console.log(value);
  }
}
