import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Form, FormGroup } from "@angular/forms";
import { MatTab, MatTabGroup } from "@angular/material/tabs";

@Component({
  selector: "app-form-debug",
  template: `
    <mat-expansion-panel
      [(expanded)]="isExpanded"
      (expandedChange)="onExpandedChange($event)"
    >
      <mat-expansion-panel-header>
        <mat-panel-title>
          Debug
        </mat-panel-title>
      </mat-expansion-panel-header>
      <mat-card-content>
        <mat-tab-group [(selectedIndex)]="selectedIndex">
          <mat-tab label="Form value">
            <pre>{{ form | json }}</pre>
          </mat-tab>
          <mat-tab label="Model" [disabled]="!model">
            <pre>{{ model | json }}</pre>
          </mat-tab>
          <mat-tab label="Submitted" [disabled]="submittedValue === null">
            <p>You just submitted ({{ submittedDate | date: "short" }}):</p>
            <pre>{{ submittedValue | json }}</pre>
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
    </mat-expansion-panel>
  `,
  styles: [
    `
      :host {
        margin: 20px;
      }

      .mat-expansion-panel-header {
        background: rgba(0, 0, 0, 0.03);
      }

      .mat-expansion-panel-header.mat-expanded:focus,
      .mat-expansion-panel-header.mat-expanded:hover {
        background: rgba(0, 0, 0, 0.03);
      }
    `
  ]
})
export class DebugComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() model;

  submittedValue = null;
  isExpanded = false;
  selectedIndex = 0;
  submittedDate = null;

  @ViewChild(MatTabGroup, { static: true }) tabGroup: MatTabGroup;

  constructor() {}

  ngOnInit() {
    this.isExpanded = sessionStorage.getItem("debug-expanded") === "true";
  }

  onExpandedChange(isExpanded) {
    sessionStorage.setItem("debug-expanded", isExpanded);
  }
}
