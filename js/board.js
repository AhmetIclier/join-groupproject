let tasks = [];


async function initBoard() {
    await loadBoardtasks();
    renderBoardTodos();
    renderBoardProgress();
    // renderBoardFeedback();
    // renderBoardDone();
}

async function loadBoardtasks() {
    let res = await getItem('allTasks');
    tasks = JSON.parse(res);
}

function renderBoardTodos() {
    let container = document.getElementById('todo-col');
    container.innerHTML = '';
    let todos = getBoardTasks('todo');
    for (let i = 0; i<todos.length; i++) {
        container.innerHTML += `
        <div class="box-task-design">
            <div class="category ${todos[i].catColor}Cat">
                <h3>${todos[i].category}</h3>
            </div>
            <div class="task-name">
                <h4>${todos[i].title}</h4>
            </div>
            <div class="task-description">
                <span>${todos[i].description}</span>
            </div>
            <div class="progress-bar"></div>
            <div class="worker" id="${todos[i].status}${i}-workers">
            </div>
        </div>
        `
        renderBoardAssignings(todos[i],i);
    }
}

function renderBoardAssignings(task, taskID) {
    let workerbox = document.getElementById(`${task.status}${taskID}-workers`);
        workerbox.innerHTML = ''
        for (let j = 0; j<task.assignedTo.length; j++) {
            workerbox.innerHTML += `
            <p class="worker-a">${task.assignedTo[j].split(" ").map((n)=>n[0]).join("")}</p>
            `
        }
}


function getBoardTasks(status) {
    let arr = [];
    for (i = 0; i<tasks.length; i++) {
        if (tasks[i].status == status) {
            arr.push(tasks[i])
        }
    }
    if (arr.length < 1) {
        return;
    } else if (arr.length>0) {
        return arr;
    }
    
}

function renderBoardProgress() {
    let container = document.getElementById('progress-col');
    container.innerHTML='';
    let todos = getBoardTasks('inProgress');
    for (let i = 0; i<todos.length; i++) {
        container.innerHTML += `
        <div class="box-task-design">
            <div class="category ${todos[i].catColor}Cat">
                <h3>${todos[i].category}</h3>
            </div>
            <div class="task-name">
                <h4>${todos[i].title}</h4>
            </div>
            <div class="task-description">
                <span>${todos[i].description}</span>
            </div>
            <div class="progress-bar"></div>
            <div class="worker" id="${todos[i].status}${i}-workers">
            </div>
        </div>
        `
        renderBoardAssignings(todos[i],i);
    }
}

Window.onload = initBoard();