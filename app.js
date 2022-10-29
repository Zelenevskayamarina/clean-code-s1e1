//document is the DOM can be accessed in the console with document.window
//tree is from the top, html, body, p etc
//problem: User interaction does not provide the correct results
//solution: Add interactivity so the user can manage daily tasks
//break things down into smaller steps and take each step at a time
// event handling, user interaction is what starts the code execution

var taskInput=document.querySelector(".task-input");//add a new task
var addButton=document.getElementsByTagName("button")[0];//button add task
var incompleteTaskHolder=document.getElementById("tasks-incomplete");//tasks-incomplete
var completedTasksHolder=document.getElementById("tasks-completed");//tasks-completed


//new task list
var createNewTaskElement=function(taskString){

  var listTask=document.createElement("li");

  //input (checkbox)
  var checkBox=document.createElement("input");//checkbx
  //label
  var label=document.createElement("label");//label
  //input (text)
  var editInput=document.createElement("input");//text
  //button.edit
  var editButton=document.createElement("button");//edit button

  //button.delete
  var deleteButton=document.createElement("button");//delete button
  var deleteButtonImg=document.createElement("img");//delete button image

  listTask.className='task';
  checkBox.className='task-checkbox';
  label.innerText=taskString;
  label.className='task-subtitle';

  //each elements, needs appending
  checkBox.type="checkbox";
  editInput.type="text";
  editInput.className="input";

  editButton.innerText="edit"; //innerText encodes special characters, HTML does not
  editButton.className="button task-button-edit";

  deleteButton.className="button task-button-delete";
  deleteButtonImg.className="button-delete-img";
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.alt='button-delete-task';
  deleteButton.appendChild(deleteButtonImg);


  //and appending
  listTask.appendChild(checkBox);
  listTask.appendChild(label);
  listTask.appendChild(editInput);
  listTask.appendChild(editButton);
  listTask.appendChild(deleteButton);
  return listTask;
}



var addTask=function(){
  console.log("Add Task...");
  //create a new list task with the text from the #new-task
  if (!taskInput.value) return;
  var listTask=createNewTaskElement(taskInput.value);

  //append listTask to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listTask);
  bindTaskEvents(listTask, taskCompleted);

  taskInput.value="";

}

//edit an existing task

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listTask=this.parentNode;

  var editInput=listTask.querySelector('.input');
  var label=listTask.querySelector("label");
  var editBtn=listTask.querySelector(".task-button-edit");
  var containsClass=listTask.classList.contains("task-edit-mode");
  //if class of the parent is task-edit-mode
  if(containsClass){

    //switch to task-edit-mode
    //label becomes the inputs value
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }
  else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  //toggle .task-edit-mode on the parent
  listTask.classList.toggle("task-edit-mode");
};


//delete task
var deleteTask=function(){
  console.log("Delete Task...");

  var listTask=this.parentNode;
  var ul=listTask.parentNode;
  //remove the parent list task from the ul
  ul.removeChild(listTask);

}


//mark tasks-completed
var taskCompleted=function(){
  console.log("Complete Task...");

  //append the task list task to the tasks-completed
  var listTask=this.parentNode;
  completedTasksHolder.appendChild(listTask);
  bindTaskEvents(listTask, taskIncomplete);

}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
  //mark task as incomplete
  //when the checkbox is unchecked
  //append the task list task to the #tasks-incomplete
  var listTask=this.parentNode;
  incompleteTaskHolder.appendChild(listTask);
  bindTaskEvents(listTask,taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}

//the glue to hold it all together


//set the click handler to the addTask function
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(listTask,checkBoxEventHandler){
  console.log("bind list task events");
  //select listTasks children
  var checkBox=listTask.querySelector(".task-checkbox");
  var editButton=listTask.querySelector(".task-button-edit");
  var deleteButton=listTask.querySelector(".task-button-delete");

  console.log(editButton)

  //bind editTask to edit button
  editButton.onclick=editTask;
  //bind deleteTask to delete button
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list tasks
//for each list task
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list tasks chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list tasks
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list tasks chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// issues with usability don't get seen until they are in front of a human tester

//prevent creation of empty tasks

//change edit to save when you are in edit mode