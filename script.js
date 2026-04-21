// ================= GLOBAL STATE =================
// Stores all tasks (each task = { text, completed })
let tasks = [];

// ================= ADD TASK =================
function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    // Prevent empty tasks
    if (text === "") return;

    // Add new task at TOP
    tasks.unshift({ text: text, completed: false });

    // Clear input field
    input.value = "";

    // Save + re-render UI
    saveTasks();
    renderTasks();
}

// ================= TOGGLE TASK =================
// Toggle completion status
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// ================= RENDER TASKS =================
function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let remaining = 0;

    // Loop through each task
    tasks.forEach((task, index) => {

        // Create list item
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        // Make whole row clickable
        li.onclick = function () {
            toggleTask(index);
        };

        // Left section (checkbox + text)
        let left = document.createElement("div");
        left.className = "d-flex align-items-center";

        // Checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input me-2";
        checkbox.checked = task.completed;

        // Prevent double trigger when clicking checkbox
        checkbox.onclick = function (e) {
            e.stopPropagation();
            toggleTask(index);
        };

        // Task text
        let span = document.createElement("span");
        span.textContent = task.text;

        // Apply completed styling
        if (task.completed) {
            span.classList.add("completed");
        } else {
            remaining++;
        }

        // Append checkbox + text
        left.appendChild(checkbox);
        left.appendChild(span);

        // Delete button
        let del = document.createElement("button");
        del.className = "btn btn-sm btn-outline-danger";
        del.innerHTML = "🗑";

        // Prevent toggle when deleting
        del.onclick = function (e) {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        // Add elements to list item
        li.appendChild(left);
        li.appendChild(del);

        // Append to list
        list.appendChild(li);
    });

    // Update remaining task count
    document.getElementById("taskCount").textContent =
        remaining + " tasks remaining";
}

// ================= SAVE TASKS =================
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ================= LOAD TASKS =================
window.onload = function () {
    let saved = localStorage.getItem("tasks");

    // Load saved tasks or start empty
    tasks = saved ? JSON.parse(saved) : [];

    renderTasks();

    document.getElementById("taskInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
};
