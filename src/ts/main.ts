// Definiera möjliga prioriteringar (1 = högst, 3 = lägst)
type Priority = 1 | 2 | 3;

// Interface för en todo-uppgift
interface Todo {
  task: string;       // Själva uppgiftens text
  completed: boolean; // Om uppgiften är klar eller inte
  priority: Priority; // Prioritet (1–3)
}

// Klass TodoList
class TodoList {
    private todos: Todo[] = []; // Array som lagrar objekten
  
    constructor() {
      this.loadFromLocalStorage(); // Laddar befintliga todos från LocalStorage
    }
  
    // Lägg till en ny todo
    addTodo(task: string, priority: number): boolean {
      // Validering av inmatning
      if (!task || task.trim().length === 0) { // Kontrollera att task inte är tom eller bara mellanslag
        return false; 
      }
      if (priority !== 1 && priority !== 2 && priority !== 3) { // Kontrollera prioritet
        return false; 
      }
  
      const newTodo: Todo = { // Lägg till todo i listan
        task: task.trim(),
        completed: false,
        priority: priority as Priority,
      };
  
      this.todos.push(newTodo);
      this.saveToLocalStorage(); // Spara uppdaterad lista till localStorage
      return true;
    }
  
    // Markera en todo som klar
    markTodoCompleted(todoIndex: number): void {
      if (todoIndex >= 0 && todoIndex < this.todos.length) {
        this.todos[todoIndex].completed = true;
        this.saveToLocalStorage();
      }
    }
  
    // Hämta alla todos
    getTodos(): Todo[] {
      return this.todos;
    }
  
    // Spara i LocalStorage
    saveToLocalStorage(): void {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
  
    // Ladda från LocalStorage
    loadFromLocalStorage(): void {
      const data = localStorage.getItem("todos");
      if (data) {
        try {
          this.todos = JSON.parse(data) as Todo[];
        } catch {
          this.todos = []; // Om JSON är ogiltigt återställ listan
        }
      }
    }
  }