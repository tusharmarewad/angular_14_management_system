import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Angular Material animations
import { AppRoutingModule } from './app-routing.module'; // Routing module
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Forms modules


// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Components
import { AppComponent } from './app.component';

import { UserManagementComponent } from './user-management/user-management.component';
import { DyanamicFormComponent } from './dyanamic-form/dyanamic-form.component';


@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    DyanamicFormComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Required for Angular Material animations
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Forms modules for template-driven and reactive forms
    // Angular Material Modules
    MatTableModule,       // For tables
    MatPaginatorModule,   // For pagination
    MatSortModule,        // For sorting
    MatInputModule,       // For input fields
    MatButtonModule,      // For buttons
    MatCardModule,        // For cards
    MatFormFieldModule,   // For form fields
    MatDialogModule,      // For dialog boxes
    MatSelectModule,   // For select dropdowns
    MatIconModule,
    MatRadioModule,
    MatDividerModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
