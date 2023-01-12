function listOfTasks() {
    const form = document.querySelector('.form');
    const listTasks = document.querySelector('.list-tasks');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const task = form.querySelector('#task');

        if (!task.value) return;

        createTask(task.value);    
    })

    function createLi() {
        const li = document.createElement('li');
        return li;
    }

    function createBtnDelete(li) {
        li.innerText += ' ';
        const btnDelete = document.createElement('button');

        btnDelete.setAttribute('class', 'del-button');
        btnDelete.setAttribute('title', 'Delete this task');
        btnDelete.innerText = 'Delete';
        li.appendChild(btnDelete);
    }

    function createTask(task) {
        const li = createLi();
        
        task = task[0].toUpperCase() + task.substr(1);
        li.innerText = task;
        listTasks.appendChild(li);
        clearTask();
        createBtnDelete(li);
        saveTasks();
    }

    function clearTask() {
        task.value = '';
        task.focus(); // colocar o cursor no input
    }

    function saveTasks() {
        const liTasks = listTasks.querySelectorAll('li');
        const listOfTasks = [];

        for (let i of liTasks) {
            let text = i.innerText;
            text = text.replace('Delete', '').trim();

            listOfTasks.push(text);
        }

        const json = JSON.stringify(listOfTasks);
        localStorage.setItem('tasks', json);
    }

    function addSaveTasks() {
        const tasks = localStorage.getItem('tasks');
        const listOfTasks = JSON.parse(tasks);

        for (let i of listOfTasks) {
            createTask(i);
        }
    }

    addSaveTasks();

    // function delete tasks
    document.addEventListener('click', function(e) {
        const element = e.target;

        if (element.classList.contains('del-button')) {
            element.parentElement.remove();
            saveTasks();
        }
    })
}

listOfTasks();