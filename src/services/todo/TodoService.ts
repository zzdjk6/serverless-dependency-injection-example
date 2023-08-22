export interface TodoService {
  createTodo(content: string): Promise<string>;
}
