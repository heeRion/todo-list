document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");
    const taskList = document.getElementById("taskList");
    const addButton = document.getElementById("addButton");
    const allFilter = document.getElementById("allFilter");
    const activeFilter = document.getElementById("activeFilter");
    const completedFilter = document.getElementById("completedFilter");
  
    let tasks = [];
  
    tasks = [
      { text: "팀로그 동아리 시연회", date: "2024-03-07", completed: false }
    ];
  
    renderTasks();
  
    addButton.addEventListener("click", addTask);
  
    taskInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  
    function addTask() {
      const taskText = taskInput.value.trim();
      const taskDate = dateInput.value;
      if (taskText !== "" && taskDate !== "") {
        tasks.push({ text: taskText, date: taskDate, completed: false });
        renderTasks();
        taskInput.value = "";
        dateInput.value = "";
      }
    }
  
    taskList.addEventListener("change", function(event) {
      const checkbox = event.target;
      const li = checkbox.closest("li");
      const index = Array.from(li.parentElement.children).indexOf(li);
      tasks[index].completed = checkbox.checked;
      renderTasks();
    });
  
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = `${task.text} - ${task.date}`; 
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        li.insertBefore(checkbox, li.firstChild);
  
        taskList.appendChild(li);
      });
    }
  
    allFilter.addEventListener("click", function() {
      renderTasks();
      toggleFilterButton(allFilter);
    });
  
    activeFilter.addEventListener("click", function() {
      const activeTasks = tasks.filter(task => !task.completed);
      renderFilteredTasks(activeTasks);
      toggleFilterButton(activeFilter);
    });
  
    completedFilter.addEventListener("click", function() {
      const completedTasks = tasks.filter(task => task.completed);
      renderFilteredTasks(completedTasks);
      toggleFilterButton(completedFilter);
    });
  
    function renderFilteredTasks(filteredTasks) {
      taskList.innerHTML = "";
      filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = `${task.text} - ${task.date}`; 
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        li.insertBefore(checkbox, li.firstChild);
  
        taskList.appendChild(li);
      });
    }
  
    function toggleFilterButton(activeButton) {
      [allFilter, activeFilter, completedFilter].forEach(button => {
        button.classList.remove("active");
      });
      activeButton.classList.add("active");
    }
  });