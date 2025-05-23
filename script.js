document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const toggleTheme = document.getElementById('toggleTheme');
  
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
  
        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) span.classList.add('completed');
        span.addEventListener('click', () => {
          task.completed = !task.completed;
          saveAndRender();
        });
  
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        editBtn.addEventListener('click', () => {
          const newText = prompt('Edit task:', task.text);
          if (newText !== null && newText.trim() !== '') {
            task.text = newText;
            saveAndRender();
          }
        });
  
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', () => {
          tasks.splice(index, 1);
          saveAndRender();
        });
  
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    };
  
    const saveAndRender = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    };
  
    addTaskBtn.addEventListener('click', () => {
      const text = taskInput.value.trim();
      if (text !== '') {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveAndRender();
      }
    });
  
    toggleTheme.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  
    // Load theme from localStorage (optional enhancement)
    // if (localStorage.getItem('theme') === 'dark') {
    //   document.body.classList.add('dark-mode');
    // }
  
    renderTasks();
  });