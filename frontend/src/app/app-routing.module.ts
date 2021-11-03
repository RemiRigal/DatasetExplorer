import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BrowserComponent} from './pages/browser/browser/browser.component';
import {ProcessorComponent} from './pages/processor/processor/processor.component';
import {ToolsComponent} from './pages/tools/tools/tools.component';
import {FlowsComponent} from './pages/flows/flows/flows.component';
import {TasksComponent} from './pages/tasks/tasks/tasks.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'browser'},
  {path: 'browser', component: BrowserComponent},
  {path: 'processor', component: ProcessorComponent},
  {path: 'flows', component: FlowsComponent},
  {path: 'tools', component: ToolsComponent},
  {path: 'tasks', component: TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
