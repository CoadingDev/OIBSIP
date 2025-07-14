let todoList = [];
let editingIndex = -1;

function handleKeyEvent(event) {
    if (event.key === 'Enter') {
        addtoDo();
    }
}

function addtoDo() {
    let inputElement = document.querySelector('.js-name-input');
    let name = inputElement.value.trim();

    if (!name) {
        alert('Please enter a task name!');
        return;
    }

    let dateElement = document.querySelector('.js-date-input');
    let duedate = dateElement.value;

    // Create timestamp for when task was added
    let createdAt = new Date().toLocaleString();

    todoList.push({
        name,
        duedate,
        completed: false,
        createdAt,
        completedAt: null
    });

    inputElement.value = '';
    dateElement.value = '';
    console.log(todoList);
    renderToDoList();
}

document.querySelector('.js-add-button').addEventListener('click', () => {
    addtoDo();
});

function completeTask(index) {
    todoList[index].completed = true;
    todoList[index].completedAt = new Date().toLocaleString();
    renderToDoList();
}

function uncompleteTask(index) {
    todoList[index].completed = false;
    todoList[index].completedAt = null;
    renderToDoList();
}

function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        todoList.splice(index, 1);
        renderToDoList();
    }
}

function editTask(index) {
    editingIndex = index;
    renderToDoList();
}

function saveEdit(index) {
    let editInput = document.querySelector(`.edit-input-${index}`);
    let newName = editInput.value.trim();

    if (newName) {
        todoList[index].name = newName;
    }

    editingIndex = -1;
    renderToDoList();
}

function cancelEdit() {
    editingIndex = -1;
    renderToDoList();
}

function renderToDoList() {
    let pendingHTML = '';
    let completedHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        const { name, duedate, completed, createdAt, completedAt } = todoObject;

        let taskHTML = '';

        if (editingIndex === i) {
            // Edit mode
            taskHTML = `
                        <div class="task-item">
                            <div>${i + 1}</div>
                            <div><input type="text" value="${name}" class="edit-input edit-input-${i}"></div>
                            <div>${duedate || 'No date'}</div>
                            <div class="timestamp">Added: ${createdAt}</div>
                            <div>
                                <button onclick="saveEdit(${i})" class="edit-button">Save</button>
                                <button onclick="cancelEdit()" class="delete-button">Cancel</button>
                            </div>
                            <div></div>
                        </div>
                    `;
        } else {
            // Display mode
            let taskClass = completed ? 'completed-task' : '';
            let actionButton = completed
                ? `<button onclick="uncompleteTask(${i})" class="complete-button">Undo</button>`
                : `<button onclick="completeTask(${i})" class="complete-button">Complete</button>`;

            taskHTML = `
                        <div class="task-item ${taskClass}">
                            <div>${i + 1}</div>
                            <div>${name}</div>
                            <div>${duedate || 'No date'}</div>
                            <div class="timestamp">
                                Added: ${createdAt}
                                ${completedAt ? `<br>Completed: ${completedAt}` : ''}
                            </div>
                            <div>${actionButton}</div>
                            <div>
                                <button onclick="editTask(${i})" class="edit-button">Edit</button>
                                <button onclick="deleteTask(${i})" class="delete-button">Delete</button>
                            </div>
                        </div>
                    `;
        }

        if (completed) {
            completedHTML += taskHTML;
        } else {
            pendingHTML += taskHTML;
        }
    }

    document.querySelector('.js-pending-tasks').innerHTML = pendingHTML || '<div style="text-align: center; color: #666;">No pending tasks</div>';
    document.querySelector('.js-completed-tasks').innerHTML = completedHTML || '<div style="text-align: center; color: #666;">No completed tasks</div>';
}

// Initialize the app
renderToDoList();