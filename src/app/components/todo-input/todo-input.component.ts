import { Component } from '@angular/core';
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent {

  todoContent = '';

  constructor(private todoService: TodoService) {}

  // @ts-ignore
  onSubmit() {
    if (this.todoContent.trim() === '') {
      return false;
    }
    this.todoService.addTodo(this.todoContent);
    this.todoContent = '';
  }
}
