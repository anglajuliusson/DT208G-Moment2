// Definiera möjliga prioriteringar (1 = högst, 3 = lägst)
type Priority = 1 | 2 | 3;

// Interface för en todo-uppgift
interface Todo {
  task: string;       // Själva uppgiftens text
  completed: boolean; // Om uppgiften är klar eller inte
  priority: Priority; // Prioritet (1–3)
}