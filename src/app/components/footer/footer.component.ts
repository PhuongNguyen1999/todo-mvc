import {Component, OnDestroy, OnInit} from '@angular/core';
import {Filter, FilterButton} from "../../models/filtering.model";
import {TodoService} from "../../services/todo.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  filterButtons: FilterButton[] = [
    { type: Filter.All, label: "All", active: true },
    { type: Filter.Active, label: "Active", active: false },
    { type: Filter.Completed, label: "Completed", active: false },
  ];

  length = 0;
  hasComplete$: Observable<boolean> | undefined;
  destroy$: Subject<null> = new Subject<null>();

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.hasComplete$ = this.todoService.todos$.pipe(
      map(todos => todos.some(t => t.isCompleted)),
      takeUntil(this.destroy$)
    );

    this.todoService.length$.pipe(takeUntil(this.destroy$)).subscribe(length => {
      this.length = length;
    });
  }

  filter(type: Filter) {
    this.setActiveFilterBtn(type);
    this.todoService.filterTodos(type);
  }

   private setActiveFilterBtn(type: Filter) {
     this.filterButtons.forEach(btn => {
       btn.active = btn.type === type;
     });
   }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  ngOnDestroy() {
    // @ts-ignore
    this.destroy$.next();
    this.destroy$.complete();
  }
}
