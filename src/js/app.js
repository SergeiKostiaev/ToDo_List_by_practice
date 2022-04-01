const deskTaskInput = document.getElementById('inpt_text');
const todosWrapper = document.querySelector(".main_content");
const addTaskBtn = document.getElementById('add_task');


let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

/////Tasks
function Task(description) {
    this.description = description;
    this.complited = false;

}

const createTemplate = (task, index) => {
    return `
    <div class="todo_task ${task.complited}">
        <div class="task_content">
            <span class="description" id="text">${task.description}</span>
            <span class="circle_color ${task.complited ? 'checked' : ''}" id="color_change"></span>
        </div>
        <div class="btn_del_done">
            <input onclick="deleteTask(${index})" class="del" id="delete_btn" type="button" value="Удалить"></button>
            <input onclick="completeTask(${index})" class="done" id="done_btn" type="button" value="Сделанно"></button>
        </div>
    </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length &&  tasks.filter(item => item.complited == false);
    const completedTasks = tasks.length &&  tasks.filter(item => item.complited == true);
    tasks =[...activeTasks,...completedTasks];
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if(tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index); 
        })
        todoItemElems = document.querySelectorAll('.todo_task');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].complited = !tasks[index].complited;
    if(tasks[index].complited) {
        todoItemElems[index].classList.add('checked');   
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
} 

/////add task
addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value)); 
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = '';
})

/////delete task
const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    },500)
}

