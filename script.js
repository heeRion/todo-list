document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const addButton = document.getElementById("addButton");
    const allFilter = document.getElementById("allFilter");
    const activeFilter = document.getElementById("activeFilter");
    const completedFilter = document.getElementById("completedFilter");
  
    let tasks = [];
  
    
    tasks = ["할 일 1", "할 일 2", "할 일 3"];
  
    renderTasks();
  
    addButton.addEventListener("click", addTask); 
    taskInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  
    function addTask() {
      if (taskInput.value.trim() !== "") {
        tasks.push({ text: taskInput.value.trim(), completed: false });
        renderTasks();
        taskInput.value = "";
      }
    }
  
    taskList.addEventListener("click", function(event) {
      const target = event.target;
      if (target.classList.contains("circle")) {
        const index = Array.from(target.closest("li").parentElement.children).indexOf(target.closest("li"));
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
      }
    });
  
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        
        const circle = document.createElement("span");
        circle.classList.add("circle");
        if (task.completed) {
          circle.classList.add("completed");
        }
        li.insertBefore(circle, li.firstChild);
        
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
        li.textContent = task.text;
        
        const circle = document.createElement("span");
        circle.classList.add("circle");
        if (task.completed) {
          circle.classList.add("completed");
        }
        li.insertBefore(circle, li.firstChild);
        
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