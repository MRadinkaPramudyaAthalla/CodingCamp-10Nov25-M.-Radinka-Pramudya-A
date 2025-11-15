document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    tasks = storedTasks;
  }

  updateTasksList();
  updateStats();
});

let tasks = [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    // reset input biar auto reset
    taskInput.value = "";

    updateTasksList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completeTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  let progress = 0;
  if (totalTasks > 0) {
    progress = (completeTasks / totalTasks) * 100;
  }

  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  document.getElementById("number").innerText = `${completeTasks} / ${totalTasks}`;
};


const updateTasksList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const ListItem = document.createElement("li");

    ListItem.innerHTML = `
       <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox"${
                  task.completed ? "checked" : ""
                }/>
                <p>${task.text}</p>
        </div>
        <div class="icons">
            <img src="./edit.svg" onClick="editTask(${index})"/>
            <img src="./trash-2.svg" onClick="deleteTask(${index})"/>
        </div>
       </div>
    `;
    ListItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(ListItem);
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();

  addTask();
});
