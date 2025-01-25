import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { DyanamicFormComponent } from './dyanamic-form/dyanamic-form.component';


const routes: Routes = [

  { path: '', redirectTo: 'system-management', pathMatch: 'full' },
  { path: 'system-management', component: UserManagementComponent },
  { path: 'dynamic', component: DyanamicFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
