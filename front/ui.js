const taskForm = document.querySelector("#taskForm");

taskForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const title =   taskForm["title"].value;
    const desc  =   taskForm["description"].value; 

    APP.createTask(title,desc);
});