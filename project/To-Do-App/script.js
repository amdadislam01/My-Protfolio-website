document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const tasksRemaining = document.getElementById('tasksRemaining');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
    
    // Initialize the app
    function init() {
        renderTasks();
        updateTaskCount();
        setupEventListeners();
    }
    
    // Set up event listeners
    function setupEventListeners() {
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addTask();
        });
        clearCompletedBtn.addEventListener('click', clearCompletedTasks);
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                renderTasks();
            });
        });
    }
    
    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.unshift(newTask);
        saveTasks();
        renderTasks();
        updateTaskCount();
        
        taskInput.value = '';
        taskInput.focus();
    }
    
    // Render tasks based on current filter
    function renderTasks() {
        taskList.innerHTML = '';
        
        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <i class="far fa-clipboard"></i>
                    <p>No ${currentFilter} tasks found</p>
                </div>
            `;
            return;
        }
        
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.dataset.id = task.id;
            
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <div class="task-actions">
                    <button class="edit-btn" title="Edit Task"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" title="Delete Task"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            taskList.appendChild(taskItem);
            
            // Add event listeners to the new task
            const checkbox = taskItem.querySelector('.task-checkbox');
            const editBtn = taskItem.querySelector('.edit-btn');
            const deleteBtn = taskItem.querySelector('.delete-btn');
            const taskText = taskItem.querySelector('.task-text');
            
            checkbox.addEventListener('change', function() {
                toggleTaskComplete(task.id, this.checked);
            });
            
            deleteBtn.addEventListener('click', function() {
                deleteTask(task.id);
            });
            
            editBtn.addEventListener('click', function() {
                editTask(task.id, taskText);
            });
        });
    }
    
    // Toggle task completion status
    function toggleTaskComplete(id, completed) {
        tasks = tasks.map(task => 
            task.id === id ? {...task, completed} : task
        );
        saveTasks();
        updateTaskCount();
        renderTasks();
    }
    
    // Delete a task
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        updateTaskCount();
        renderTasks();
    }
    
    // Edit a task
    function editTask(id, taskTextElement) {
        const currentText = taskTextElement.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';
        
        taskTextElement.replaceWith(input);
        input.focus();
        
        function saveEdit() {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                tasks = tasks.map(task => 
                    task.id === id ? {...task, text: newText} : task
                );
                saveTasks();
            }
            renderTasks();
        }
        
        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') saveEdit();
        });
    }
    
    // Clear all completed tasks
    function clearCompletedTasks() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        updateTaskCount();
        renderTasks();
    }
    
    // Update the task counter
    function updateTaskCount() {
        const activeTasks = tasks.filter(task => !task.completed).length;
        tasksRemaining.textContent = `${activeTasks} ${activeTasks === 1 ? 'task' : 'tasks'} remaining`;
    }
    
    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Initialize the app
    init();
});