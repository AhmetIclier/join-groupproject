let loadedTasks = [];
console.log(loadedTasks);


async function initSummary() {
    await taskLoader();
    renderOpenTasks()
    renderProgressTasks();
    renderFeedbackTasks();
    renderprioTasks();
    renderTodos();
    renderDoneTasks();
}
initSummary();

async function taskLoader() {
    let res = await getItem('allTasks');
    loadedTasks = JSON.parse(res);
}
console.log(loadedTasks);

function renderAllTasks() {
    let openTasks = document.getElementById('taskSum');
    let progressTasks = document.getElementById('progressSum');
    let feedbackTasks = document.getElementById('feedbackSum');

    console.log(loadedTasks);
    openTasks.innerHTML = `
        <p>${loadedTasks.length}</p>
        <span>Tasks in <br> Board</span>
    `
}

/**
 * function to render all tasks which are prio "urgent"
 */
function renderprioTasks() {
    let counter = 0;
    let dueDate;
    let content = document.querySelector('.border-urgend-task > p');
    for (let i = 0; i<loadedTasks.length; i++) {
        const element = loadedTasks[i]
        if (element.prio === 'urgent') {
            counter++;
            dueDate = element.dueDate;
        }
    };
    content.innerText = `${counter}`;
    convertToDateObject(dueDate);
    
}

/**
 * function to render due date of urgent task
 * 
 * @param {number} day - actual day of duedate
 * @param {string} month - actual month of duedate
 * @param {number} year - actual year of duedate
 */
function renderDate(day, month, year) {
    let dueDateBox = document.querySelector('.deadline-task-position > span > b');
    dueDateBox.innerText = `${month} ${day}, ${year}`;
}

/**
 * This functions gets a date object as parameter to read day, month and year to pass (call) it to the rendering function
 * 
 * @param {Object} dateObject - to get the needed format for rendering
 */
function formatDate(dateObject) {
    let day = dateObject.getDate();
    let month = months[dateObject.getMonth()];
    let year = dateObject.getFullYear();
    renderDate(day, month, year);
}

/**
 * This function gets a date string from html date input and converts it to a date-object for formatting
 * 
 * @param {string} dueDate - date string from date input
 */
function convertToDateObject(dueDate) {
    let date = new Date(dueDate);
    formatDate(date);
}

//Window.onload = initSummary();
