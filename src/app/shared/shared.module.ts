import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DebugComponent } from "./debug.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

const sharedStuff = [
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatButtonModule,
  MatTabsModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule,
  MatExpansionModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  imports: [CommonModule, ...sharedStuff],
  declarations: [DebugComponent],
  exports: [...sharedStuff, DebugComponent]
})
export class SharedModule {}
