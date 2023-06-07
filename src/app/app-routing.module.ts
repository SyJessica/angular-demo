import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragDemoComponent } from './drag-demo/drag-demo.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'drag-demo', component: DragDemoComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
