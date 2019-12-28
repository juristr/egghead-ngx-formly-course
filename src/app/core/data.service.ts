import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {}

  getNations() {
    return of([
      {
        value: null,
        label: ' -- '
      },
      {
        value: 1,
        label: 'Italy'
      },
      {
        value: 2,
        label: 'Germany'
      },
      {
        value: 3,
        label: 'U.S.'
      }
    ]);
  }
}
