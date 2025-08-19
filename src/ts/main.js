// Klass TodoList
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = []; // Array som lagrar objekten
        this.loadFromLocalStorage(); // Laddar befintliga todos från LocalStorage
    }
    // Lägg till en ny todo
    TodoList.prototype.addTodo = function (task, priority) {
        // Validering av inmatning
        if (!task || task.trim().length === 0) { // Kontrollera att task inte är tom eller bara mellanslag
            return false;
        }
        if (priority !== 1 && priority !== 2 && priority !== 3) { // Kontrollera prioritet
            return false;
        }
        var newTodo = {
            task: task.trim(),
            completed: false,
            priority: priority,
        };
        this.todos.push(newTodo);
        this.saveToLocalStorage(); // Spara uppdaterad lista till localStorage
        return true;
    };
    // Markera en todo som klar
    TodoList.prototype.markTodoCompleted = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    };
    // Hämta alla todos
    TodoList.prototype.getTodos = function () {
        return this.todos;
    };
    // Spara i LocalStorage
    TodoList.prototype.saveToLocalStorage = function () {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    };
    // Ladda från LocalStorage
    TodoList.prototype.loadFromLocalStorage = function () {
        var data = localStorage.getItem("todos");
        if (data) {
            try {
                this.todos = JSON.parse(data);
            }
            catch (_a) {
                this.todos = []; // Om JSON är ogiltigt återställ listan
            }
        }
    };
    return TodoList;
}());
// Skapa en instans av TodoList
var todoList = new TodoList();
// Hämta DOM-element
var form = document.querySelector(".todoForm");
var taskInput = document.querySelector(".taskInput");
var prioritySelect = document.querySelector(".selectPriority");
var ul = document.getElementById("todoList");
// Funktion för att rendera todos
function renderTodos() {
    ul.innerHTML = ""; // Töm listan innan rendering
    todoList.getTodos().forEach(function (todo, index) {
        var li = document.createElement("li");
        li.className = todo.completed ? "completed" : "";
        // Prioritet
        var prioritySpan = document.createElement("span");
        prioritySpan.className = "priority priority-".concat(todo.priority);
        prioritySpan.textContent = "P".concat(todo.priority);
        // Uppgift
        var taskSpan = document.createElement("span");
        taskSpan.textContent = todo.task;
        // Knapp för att markera klar
        var completeBtn = document.createElement("button");
        completeBtn.textContent = "Klar";
        completeBtn.className = "complete-btn";
        completeBtn.disabled = todo.completed;
        completeBtn.addEventListener("click", function () {
            todoList.markTodoCompleted(index);
            renderTodos(); // Uppdatera listan
        });
        li.appendChild(prioritySpan);
        li.appendChild(taskSpan);
        li.appendChild(completeBtn);
        ul.appendChild(li);
    });
}
// Hantera formulärsubmit
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var task = taskInput.value;
    var priority = Number(prioritySelect.value);
    var success = todoList.addTodo(task, priority);
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
