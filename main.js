'use strict'

const addTask = document.getElementById('add-btn');
const taskInput = document.getElementById('form-control');
const taskWrapper = document.querySelector('todolist');

let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoElems = [];

function СreateTask (description) {
    this.description = description;
    this.completed = false;
};


const  updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));

};


addTask.addEventListener('click', () => {
    if (taskInput.value) {
        tasks.push( new СreateTask(taskInput.value));
        updateLocal();
        listTask();
        taskInput.value = '';
    }
    
});

taskInput.addEventListener('keydown', ({key}) => {
    if (key === "Enter") {
        if (taskInput.value) {
            tasks.push( new СreateTask(taskInput.value));
            updateLocal();
            listTask();
            taskInput.value = '';
        }
    }
  });

const filterTasks = () => {

    let activTasks = tasks.length && tasks.filter(item => item.completed == false);
    let completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activTasks,...completedTasks];

};

const createTemplate = (task,index) => {
    return `
        <li class="todoItem ${task.completed ? 'chacked': ''}" >
            <div class="checkbox">
                <span class="close" onclick = "delTask(${index})" >
                    <i class="fa fa-times"></i>
                </span>
                <label>
                    <input onclick = "completeTask(${index})" type="checkbox" ${task.completed ? 'checked': ''}>${task.description}
                </label>
            </div>
        </li>
    
    `
};


const completeTask = (index) => {
    
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoElems[index].classList.add('chacked');  
    } else {
        todoElems[index].classList.remove('chacked');
    };
    updateLocal();
    listTask();  
    
};

const delTask = (index) => {
    
    todoElems[index].classList.add('deleted');
    setTimeout(() => {
    tasks.splice(index,1);
    updateLocal();
    listTask();
    }, 800);

};


const listTask = () => {
    todolist.innerHTML = "";
    if (tasks) {
        filterTasks();
        tasks.forEach((item, index) => {
            todolist.innerHTML += createTemplate(item, index)    
        });
        todoElems = document.querySelectorAll('.todoItem');
    };
};

listTask();








