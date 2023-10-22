import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoUpdate } from 'src/app/models/todo-update';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css']
})
export class TodoUpdateComponent implements OnInit {
  todoForm=new FormGroup({
    content:new FormControl(''),
    id:new FormControl(0)
  })
  id:number|undefined
  constructor(private todoService:TodoServiceService,private router:Router,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.id=Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.todoService.get(this.id).subscribe(x=>{
      this.todoForm.get('content')?.setValue(x.content)
      this.todoForm.get('id')?.setValue(x.id)
    })
  }
  update()
  {
    this.todoService.update(this.todoForm.value as TodoUpdate).subscribe(x=>{
      if(x==true) this.router.navigateByUrl('/todos')
      else alert("güncelleme gerçekleşemedi")
    })
  }

}
