document.addEventListener('DOMContentLoaded',()=>{
const todoInput=document.getElementById("task-input");
const addTaskButton=document.getElementById("add-btn");
const todoList=document.getElementById("task-list");

let tasks=JSON.parse(localStorage.getItem('tasks'))||[];
tasks.forEach((task)=>renderTasks(task));                                                  
addTaskButton.addEventListener("click",()=>{
    const taskText=todoInput.value.trim()
    if (taskText ==="")return;

    const newTask={
        id:Date.now(),//a way of creating a new id unique
        text:taskText,
        completed:false
    }
    tasks.push(newTask)
    saveTasks();//for local storage
    renderTasks(newTask);//so that new task get added and showed without refreshing 
    todoInput.value="";
    console.log(tasks)
})
function renderTasks(task){
   const li=document.createElement('li')
   li.setAttribute('data-id',task.id)
   if(task.completed)li.classList.add('completed');
   li.innerHTML=`
   <span>${task.text}</span>
   <button>Remove</button>
   `;

    li.addEventListener('ckick',(e)=>{
        if(e.target.tagName==='BUTTON')return;
        task.completed=!task.completed
        li.classList.toggle("completed")
        saveTasks();
    });
    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation()//prevent toggle from firing bubbling
        tasks=tasks.filter(t=>t.id!==task.id)
        li.remove();
        saveTasks();
    })
    todoList.appendChild(li);
}
//rewrite the whole thing 
function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks));//in setItem the key value pair should be in such  a way that value should only be string
}
})