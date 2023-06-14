var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var form = document.querySelector('#form');
var mainBody = document.querySelector('.main__body');
var alertElement = document.querySelector('.alert');
var inputValue = '';
var InputMode = {
    mode: "normal"
};
var taskObject = {
    id: 0,
    task: ''
};
var Tasks = [
    {
        id: 1892892,
        task: 'Tarea de matematicas'
    }
];
var idEdit = 0;
printTasks(Tasks);
form === null || form === void 0 ? void 0 : form.addEventListener('input', function (e) {
    var input = e.target;
    inputValue = input.value;
    console.log(inputValue);
});
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (inputValue) {
        form.reset();
        if (InputMode.mode === 'normal') {
            taskObject.task = inputValue;
            setTasks(taskObject);
            printAlert('Tarea agregada correctamente', 'success');
            inputValue = '';
            return;
        }
        InputMode.mode = "normal";
        Tasks = Tasks.map(function (task) { return task.id !== idEdit ? task : {
            id: task.id,
            task: inputValue
        }; });
        printAlert('Tarea editada correctamente', 'success');
        printTasks(Tasks);
        inputValue = '';
        return;
    }
    printAlert('Llene los campos ', 'error');
});
function printAlert(mensaje, tipo) {
    alertElement.textContent = mensaje.toString();
    alertElement === null || alertElement === void 0 ? void 0 : alertElement.classList.add('active', tipo);
    setTimeout(function () {
        alertElement === null || alertElement === void 0 ? void 0 : alertElement.classList.remove('active', tipo);
    }, 2400);
}
function setTasks(taskItem) {
    taskItem.id = Date.now();
    Tasks = __spreadArray(__spreadArray([], Tasks, true), [__assign({}, taskItem)], false);
    printTasks(Tasks);
}
function printTasks(arrayTasks) {
    // let html: string = ''
    cleanHTML();
    if (!arrayTasks.length) {
        mainBody.innerHTML = "<h2 class=\"main__message\">there aren't tasks</h2>";
        return;
    }
    arrayTasks.forEach(function (taskitem) {
        var id = taskitem.id, task = taskitem.task;
        var card = document.createElement('article');
        var cardText = document.createElement('p');
        var cardActions = document.createElement('div');
        var btnEdit = document.createElement('button');
        var btnRemove = document.createElement('button');
        card.classList.add('card');
        cardText.classList.add('card__text');
        cardActions.classList.add('card__actions');
        btnEdit.classList.add('card__btn', 'card__btn--edit');
        btnRemove.classList.add('card__btn', 'card__btn--remove');
        btnEdit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"/></svg>';
        btnRemove.innerHTML = '  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>';
        btnEdit.onclick = function (e) { return editTask(e, id); };
        btnRemove.onclick = function (e) { return removeTask(e, id); };
        cardText.textContent = task;
        cardActions.appendChild(btnEdit);
        cardActions.appendChild(btnRemove);
        card.appendChild(cardText);
        card.appendChild(cardActions);
        mainBody === null || mainBody === void 0 ? void 0 : mainBody.appendChild(card);
    });
}
function editTask(e, id) {
    var _a;
    e.preventDefault();
    InputMode.mode = "edit";
    var inputForm = form === null || form === void 0 ? void 0 : form.elements['inputTask'];
    inputForm.value = (_a = Tasks.find(function (item) { return item.id === id; })) === null || _a === void 0 ? void 0 : _a.task;
    idEdit = id;
    console.log(InputMode);
}
function removeTask(e, id) {
    e.preventDefault();
    Tasks = Tasks.filter(function (task) { return task.id !== id && task; });
    printTasks(Tasks);
}
function cleanHTML() {
    while (mainBody === null || mainBody === void 0 ? void 0 : mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    }
}
