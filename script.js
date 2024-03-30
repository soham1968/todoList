// Function to add an item to the ToDo list
function addItem() {
  let itemName = document.getElementById("itemName").value;
  let itemDate = document.getElementById("itemDate").value;
  let priority = document.getElementById("priority").value;

  if (itemName && itemDate && priority) {
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    let newItem = {
      name: itemName,
      date: itemDate,
      priority: priority,
      completed: false,
    };
    todoList.push(newItem);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    updateTasks();
  } else {
    alert("Please fill in all fields!");
  }
}

// Function to update tasks in respective sections
function updateTasks() {
  let todayTasks = [];
  let futureTasks = [];
  let completedTasks = [];

  let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

  let todayDate = new Date().toISOString().slice(0, 10);

  todoList.forEach((item) => {
    if (item.date === todayDate) {
      todayTasks.push(item);
    } else if (new Date(item.date) > new Date()) {
      futureTasks.push(item);
    }

    if (item.completed) {
      completedTasks.push(item);
    }
  });

  // Update Today's Tasks
  document.getElementById("todayTasks").innerHTML = renderTasks(todayTasks);

  // Update Future Tasks
  document.getElementById("futureTasks").innerHTML = renderTasks(futureTasks);

  // Update Completed Tasks
  document.getElementById("completedTasks").innerHTML =
    renderTasks(completedTasks);
}

// Function to render tasks
function renderTasks(tasks) {
  let html = "";
  let currentDate = new Date();

  tasks.forEach((item) => {
    let taskDate = new Date(item.date);
    let isFutureTask = taskDate > currentDate;
    let isOverdueTask = !item.completed && taskDate < currentDate;

    let taskClass = "";
    if (isFutureTask) {
      taskClass = "future-task";
    } else if (isOverdueTask) {
      taskClass = "overdue-task";
    }

    html += `
            <div class="row mb-2 mx-0 p-0 task ${taskClass} ${
      item.completed ? "completed" : ""
    }">
                <p class="col-sm">${item.name}</p>
                <p class="col-sm"> ${item.date}</p>
                <p class="col-sm">Priority: ${item.priority}</p>
                <button class="col-sm btn btn-danger" onclick="deleteItem('${
                  item.name
                }')">Delete</button>
                <button class="col-sm btn btn-success" onclick="toggleCompleted('${
                  item.name
                }')">${item.completed ? "Undo" : "Complete"}</button>
            </div>
        `;
  });
  return html;
}

// Function to delete an item from the ToDo list
function deleteItem(name) {
  let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  let updatedList = todoList.filter((item) => item.name !== name);
  localStorage.setItem("todoList", JSON.stringify(updatedList));
  updateTasks();
}

// Function to toggle completed status of an item
function toggleCompleted(name) {
  let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  let updatedList = todoList.map((item) => {
    if (item.name === name) {
      item.completed = !item.completed;
    }
    return item;
  });
  localStorage.setItem("todoList", JSON.stringify(updatedList));
  updateTasks();
}

// Initialize the application
updateTasks();
