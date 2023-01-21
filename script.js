const form = document.querySelector('#todo-form');
// console.log(todo-form)
const taskInput = document.querySelector('#task-input')
// console.log(taskInput)
const tasksList = document.querySelector('#tasks-list')
// console.log(tasksList)
const closeChangeBtn = document.querySelector('.close__changePopUp');

const changeInput = document.querySelector('#change__Area');






function addtask(e) {
    e.preventDefault();
    const inputValue = taskInput.value;

    if(inputValue == '') {
        ShowAlertMessage();
        setInterval(HideAlertMessage, 2000);
        return;
    }

    const createItem = `              
        <li class="rounded shadow list-group-item d-flex align-items-center justify-content-between mb-2">
                    
            <div class="list-group-item__inner w-75">${inputValue}</div>
            
            <div class="list-group-buttons">
                <button type="button" class="btn btn-success" id="done" data-action="done">
                    <i class="bi bi-check-lg"></i>
                </button>

                <button type="button" class="btn btn-primary bg-secondary" data-action="change">
                    <i class="bi bi-pencil"></i>
                </button>

                <button type="button" class="btn btn-danger" data-action="delete">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </div>

        </li>
    `
    tasksList.insertAdjacentHTML('beforeend', createItem);
    taskInput.value = '';
    taskInput.focus();
    saveHTMLStorage()
}











tasksList.addEventListener('mouseover', function (e) {
    if (e.target.dataset.action === 'delete') {
        const ListItem = e.target.closest('.list-group-item');
        ListItem.classList.add('bg-danger');
    }   
});

tasksList.addEventListener('mouseout', function(e) {
    const OutListItem = e.target.closest('.list-group-item');
    OutListItem.classList.remove('bg-danger');
})












if (localStorage.getItem('tasks')) {
    tasksList.innerHTML = localStorage.getItem('tasks');
}











form.addEventListener('submit', addtask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);


function deleteTask(e) {
    if (e.target.dataset.action === 'delete') {
        const task = e.target.closest('.list-group-item');
        task.classList.toggle('deleteAnim');

        setInterval(task.remove(e), 3000)
    }
    saveHTMLStorage();
}


function doneTask(e) {
    if (e.target.dataset.action === 'done') {
        const list__item = e.target.closest('.list-group-item');
        list__item.classList.toggle('bg-success');




        // const ListItem__Text = e.target.closest('.list-group-item__inner');
        // ListItem__Text.classList.add('crossed-text');
    }
    saveHTMLStorage()
}




function changeTask(e) {
    if (e.target.dataset.action === 'change') {
        const inputValue = changeInput.value;
        const task = e.target.closest('.list-group-item');
        const task__text = task.querySelector('.list-group-item__inner');
        console.log(task__text);


        const changeTask__popUp = document.querySelector('.popUp__Change');
        // console.log(changeTask__popUp);
        changeTask__popUp.style.transform = "translate(-50%, 0%)"


        
    }
}
tasksList.addEventListener('click', changeTask);

function closeChange(e) {
    if (e.target.dataset.action === 'change-btn') {
        const PopUp = e.target.closest('.popUp__Change');

        PopUp.style.transform = 'translate(-50%, -200%)'
    }

}
closeChangeBtn.addEventListener('click', closeChange);














function ShowAlertMessage() {
    const ShowAlert__item = document.querySelector('.alert__item');
    ShowAlert__item.classList.add('alert__item-show');
}

function HideAlertMessage() {
    const ShowAlert__item = document.querySelector('.alert__item');
    ShowAlert__item.classList.remove('alert__item-show');
}










function saveHTMLStorage() {
    localStorage.setItem('tasks', tasksList.innerHTML);
}

saveHTMLStorage()



// function getHTMLStorage() {
    
//     console.log(localStorage.getItem('tasks'))
// }

// getHTMLStorage()