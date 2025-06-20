import { Task } from './Task';

export class ToDoList {
  private _id: string;
  private _title: string;
  private _tasks: Task[];

  constructor(id: string, title: string) {
    this._id = id;
    this._title = title;
    this._tasks = [];
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(newTitle: string) {
    this._title = newTitle;
  }

  get tasks(): Task[] {
    return [...this._tasks];
  }

  set tasks(tasks: Task[]) {
    this._tasks = [...tasks];
  }

  addTask(task: Task): void {
    this._tasks = [...this._tasks, task];
  }

  deleteTask(taskId: string): void {
    this._tasks = this._tasks.filter((t) => t.id !== taskId);
  }

  updateTask(updatedTask: Task): void {
    this._tasks = this._tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
  }

  toggleTask(taskId: string): void {
    this._tasks = this._tasks.map((t) =>
      t.id === taskId ? new Task(t.id, t.title, t.description, !t.completed) : t
    );
  }
}