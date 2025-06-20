export class Task {
  private _id: string;
  private _title: string;
  private _description: string;
  private _completed: boolean;

  constructor(id: string, title: string, description: string = "", completed: boolean = false) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._completed = completed;
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

  get description(): string {
    return this._description;
  }

  set description(newDescription: string) {
    this._description = newDescription;
  }

  get completed(): boolean {
    return this._completed;
  }

  set completed(value: boolean) {
    this._completed = value;
  }

  toggleCompleted(): void {
    this._completed = !this._completed;
  }
}