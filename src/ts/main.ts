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
  
    // Ta bort todo helt när klar
    removeTodo(todoIndex: number): void {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos.splice(todoIndex, 1);
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
  // Skapa en instans av TodoList
const todoList = new TodoList();

// Hämta DOM-element
const form = document.querySelector<HTMLFormElement>(".todoForm")!;
const taskInput = document.querySelector<HTMLInputElement>(".taskInput")!;
const prioritySelect = document.querySelector<HTMLSelectElement>(".selectPriority")!;
const ul = document.getElementById("todoList")!;

// Funktion för att rendera todos
function renderTodos() {
  ul.innerHTML = ""; // Töm listan innan rendering

  todoList.getTodos().forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";

    // Prioritet
    const prioritySpan = document.createElement("span");
    prioritySpan.className = `priority priority-${todo.priority}`;
    prioritySpan.textContent = `P${todo.priority}`;

    // Uppgift
    const taskSpan = document.createElement("span");
    taskSpan.textContent = todo.task;

    // Knapp för att markera klar
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Klar";
    completeBtn.className = "complete-btn";
    completeBtn.disabled = todo.completed;
    completeBtn.addEventListener("click", () => {
      todoList.removeTodo(index); // Ta bort istället för att markera
      renderTodos(); // Uppdatera listan
    });

    li.appendChild(prioritySpan);
    li.appendChild(taskSpan);
    li.appendChild(completeBtn);

    ul.appendChild(li);
  });
}

// Hantera formulärsubmit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = taskInput.value;
  const priority = Number(prioritySelect.value);

  const success = todoList.addTodo(task, priority);
  if (!success) {
    alert("Ogiltig uppgift eller prioritet!");
    return;
  }

  // Rensa formuläret
  taskInput.value = "";
  prioritySelect.value = "2";

  renderTodos();
});

// Rendera vid sidladdning
renderTodos();