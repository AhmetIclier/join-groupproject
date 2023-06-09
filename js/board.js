async function initBoard() {
    await loadAllTasksFromStg();
    renderBoardTodos();
    renderBoardProgress();
    renderBoardFeedback();
    renderBoardDone();
    //openTaskDetails(); //SPÄTER DIESEN AUFRUF LÖSCHEN. NUR ZUM ERSTELLEN STEHEN LASSEN
    //getTaskDetails(); //SPÄTER DIESEN AUFRUF LÖSCHEN. NUR ZUM ERSTELLEN STEHEN LASSEN
}

function renderBoardTodos() {
    let container = document.getElementById('todo-col');
    container.innerHTML = '';
    let todos = getBoardTasks('todo');
    for (let i = 0; i < todos.length; i++) {
        container.innerHTML += `
        <div class="box-task-design" draggable="true" onclick="openTaskDetails(${todos[i]['task-id']})" ondragstart="startDragging(${todos[i]['task-id']})">
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
        renderBoardAssignings(todos[i], i);
    }
}

function renderBoardAssignings(task, taskID) {
    let workerbox = document.getElementById(`${task.status}${taskID}-workers`);
    workerbox.innerHTML = ''
    for (let j = 0; j < task.assignedTo.length; j++) {
        workerbox.innerHTML += `
            <p class="worker-a">${task.assignedTo[j].split(" ").map((n) => n[0]).join("")}</p>
            `
    }
}


function getBoardTasks(status) {
    let arr = [];
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].status == status) {
            arr.push(allTasks[i])
        }
    }
    if (arr.length < 1) {
        return false;
    } else if (arr.length > 0) {
        return arr;
    }

}

function renderBoardProgress() {
    let container = document.getElementById('progress-col');
    container.innerHTML = '';
    let todos = getBoardTasks("inProgress");
    for (let i = 0; i < todos.length; i++) {
        container.innerHTML += `
        <div class="box-task-design" draggable="true" onclick="openTaskDetails(${todos[i]['task-id']} ondragstart="startDragging(${todos[i]['task-id']})">
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
        renderBoardAssignings(todos[i], i);
    }
}

function renderBoardFeedback() {
    let container = document.getElementById('feedback-col');
    container.innerHTML = '';
    let todos = getBoardTasks('feedback');
    for (let i = 0; i < todos.length; i++) {
        container.innerHTML += `
        <div class="box-task-design" draggable="true" onclick="openTaskDetails(${todos[i]['task-id']} ondragstart="startDragging(${todos[i]['task-id']})">
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
        renderBoardAssignings(todos[i], i);
    }
}

function renderBoardDone() {
    let container = document.getElementById('done-col');
    container.innerHTML = '';
    let todos = getBoardTasks('done');
    for (let i = 0; i < todos.length; i++) {
        container.innerHTML += `
        <div class="box-task-design" draggable="true" onclick="openTaskDetails(${todos[i]['task-id']} ondragstart="startDragging(${todos[i]['task-id']})">
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
        renderBoardAssignings(todos[i], i);
    }
}

let currentDraggedElement;

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    allTasks[currentDraggedElement]['status'] = category;
    uploadTasks();
    initBoard();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
    initBoard();
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
    initBoard();
}

//****** Open task details *******//
function openTaskDetails(i) {
    document.getElementById('show-details').classList.remove('d-none');
    getTodoTaskDetails(i);
    getProgressTaskDetails(i)
}


function getTodoTaskDetails(i) {
    let container = document.getElementById('show-details');
    container.innerHTML = '';
    
    let todos = getBoardTasks('todo');
    for (let i = 0; i < todos.length; i++) {
        console.log(todos);
        container.innerHTML = /*html*/`
         <div class="task-info" id="card-detail">
             <div class="close-btn" onclick="closeWindow()">
                <img src="../../assets/img/icons/cross.svg" alt="Close button">
             </div>

             <div class="delete-edit-btn" onclick="closeWindow()">
                <img src="../../assets/img/icons/delete-btn-bright.svg" alt="Delete button">
                <img src="../../assets/img/icons/edit-btn-dark.svg" alt="Edit button">
            </div>

                <h3>${todos[i].category}</h3>
                <h2>${todos[i].title}</h2>
                <h3>${todos[i].description}</h3>
                <h3>Due date:<br> ${todos[i].dueDate}</h3>
                <h3>Priority:<br> ${todos[i].prio}</h3>
                <h3>Assigned To:<br></h3>
       </div>
       <div class="worker" id="${todos[i].status}${i}-workers">
       <div class="popup-bg"></div>
        `;
        renderBoardAssignings(todos[i], i);
    }
}

function getProgressTaskDetails(i) {
    let container = document.getElementById('show-details');
    container.innerHTML = '';
    
    let todos = getBoardTasks("inProgress");
    for (let i = 0; i < todos.length; i++) {
        console.log(todos);
        container.innerHTML = /*html*/`
         <div class="task-info" id="card-detail">
             <div class="close-btn-container" onclick="closeWindow()">
                <img src="../../assets/img/icons/cross.svg" alt="Close button">
             </div>
             <div class="delete-edit-container" onclick="closeWindow()">
                <img class="del-btn" src="../../assets/img/icons/delete-btn-bright.svg" alt="Delete button">
                <img class="edit-btn" src="../../assets/img/icons/edit-btn-dark.svg" alt="Edit button">
            </div>
      
                 <h3 >${todos[i].category}</h3>
                 <h2 class="cat-det">${todos[i].title}</h2>
                 <h3 class="descr-det">${todos[i].description}</h3>
                 <h3>Due date: ${todos[i].dueDate}</h3>
                 <h3>Priority: ${todos[i].prio}</h3>
                 <h3>Assigned To:<br></h3>
       </div>
       <div class="worker" id="${todos[i].status}${i}-workers">
       <div class="popup-bg"></div>
        `;
        renderBoardAssignings(todos[i], i);
    }
}


function closeWindow(){
    document.getElementById('show-details').classList.add('d-none');
}
