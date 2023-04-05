import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../../models/todo.model";
import {animate, state, style, transition, trigger} from "@angular/animations";

const fadeStrikeThroughAnimation = trigger('fadeStrikeThrough', [
  state(
    'active',
    style({
      fontSize: '18px',
      color: 'black'
    })
  ),
  state(
    'completed',
    style({
      fontSize: '17px',
      color: 'lightgrey',
      textDecoration: 'line-through'
    }),
  ),
  transition('active <=> completed', [animate(250)])
]);

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [fadeStrikeThroughAnimation]
})
export class TodoItemComponent {

  @Input() todo!: Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() removeTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  isHovered = false;
  isEditing = false;

  changeTodoStatus() {
    this.changeStatus.emit({...this.todo, isCompleted: !this.todo?.isCompleted });
  }

  submitEdit(event: KeyboardEvent) {
    const {keyCode} = event;
    event.preventDefault();

    if (keyCode === 13) {
      this.editTodo.emit(this.todo);
      this.isEditing = false;
    }
  }

  deleteTodo() {
    this.removeTodo.emit(this.todo);
  }
}
