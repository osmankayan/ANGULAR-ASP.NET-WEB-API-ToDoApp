import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoAddComponent } from './pages/todo-add/todo-add.component';
import { TodoUpdateComponent } from './pages/todo-update/todo-update.component';

const routes: Routes = [
  {path:'',redirectTo:'todos',pathMatch:'full'},
  {path:'todos',component:TodoListComponent},
  {path:'todo-add',component:TodoAddComponent},
  {path:'todo-update/:id',component:TodoUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
