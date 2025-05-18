document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskList = document.getElementById("task-list");
  const li = createTaskElement(taskText);
  taskList.appendChild(li);
  saveTask(taskText);

  taskInput.value = "";
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span onclick="toggleTask(this)">${taskText}</span>
    <button onclick="deleteTask(this)">×</button>
  `;
  return li;
}

function toggleTask(span) {
  const li = span.parentElement;
  li.classList.toggle("completed");
  updateLocalStorage();
}

function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
  updateLocalStorage();
}

function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("task-list");

  tasks.forEach(({ text, completed }) => {
    const li = createTaskElement(text, completed);
    taskList.appendChild(li);
  });
}

function updateLocalStorage() {
  const listItems = document.querySelectorAll("#task-list li");
  const tasks = Array.from(listItems).map(li => ({
    text: li.querySelector("span").innerText,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}