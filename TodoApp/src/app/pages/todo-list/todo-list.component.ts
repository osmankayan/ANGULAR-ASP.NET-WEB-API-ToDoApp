import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todolist: Todo[] = []
  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {
    this.load();
  }

  
  load() {
    this.todoService.getAll().subscribe(x =>  this.todolist = x )
  }

  delete(id: number) {
    this.todoService.delete(id).subscribe(x => {
      if (x == true) {this.load()}
      else{ alert("hata")}
    })
  }

  isCompleted(id:number)
  {
    this.todoService.isCompleted(id).subscribe(x=>{
      if(x==true)
      {
        let index=this.todolist.findIndex(x=>x.id==id);
        this.todolist[index].isCompleted=!this.todolist[index].isCompleted;
      }
    })
  }


}
