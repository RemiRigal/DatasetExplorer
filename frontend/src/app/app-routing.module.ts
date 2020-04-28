import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BrowserComponent} from './browser/browser.component';
import {ProcessorComponent} from './processor/processor.component';
import {ToolsComponent} from './tools/tools.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'browser'},
  {path: 'browser', component: BrowserComponent},
  {path: 'processor', component: ProcessorComponent},
  {path: 'tools', component: ToolsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
