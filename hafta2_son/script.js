document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.querySelector("input[name='priority']:checked");

    if (!title) {
        alert("Görev başlığı zorunludur.");
        return;
    }

    if (!priority) {
        alert("Lütfen bir öncelik seçin.");
        return;
    }

    const task = {
        title,
        description,
        priority: priority.value,
        completed: false
    };

    addTaskToDOM(task);
    this.reset();
});

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.innerHTML = `
        <strong>${task.title}</strong> - ${task.description} 
        [${task.priority.toUpperCase()}]
        <button class="completeBtn">Tamamlandı</button>
        <button class="deleteBtn">Sil</button>
    `;
    li.dataset.priority = task.priority;
    li.dataset.completed = "false";
    document.getElementById("taskList").appendChild(li);
}

document.getElementById("taskList").addEventListener("click", function(event) {
    if (event.target.classList.contains("completeBtn")) {
        const li = event.target.parentElement;
        li.classList.toggle("completed");
        li.dataset.completed = li.classList.contains("completed");
    } else if (event.target.classList.contains("deleteBtn")) {
        event.target.parentElement.remove();
    }
});

document.getElementById("filterCompleted").addEventListener("change", function() {
    const tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(task => {
        const isCompleted = task.dataset.completed === "true";
        task.style.display = this.checked && !isCompleted ? "none" : "list-item";
    });
});
