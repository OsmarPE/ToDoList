const form = document.querySelector<HTMLFormElement>('#form')
const mainBody = document.querySelector<HTMLDivElement>('.main__body')
const alertElement = document.querySelector<HTMLDivElement>('.alert')

let inputValue: string = ''


interface typeTask {
    id: number,
    task: string
}

type Mode = 'normal' | 'edit'
type Mensaje = 'success' | 'error'

interface typeModeInput {
    mode: Mode
}

const InputMode: typeModeInput = {
    mode: "normal"
}

const taskObject: typeTask = {
    id: 0,
    task: ''
}


let Tasks: typeTask[] = [
    {
        id: 1892892,
        task: 'Tarea de matematicas'
    }
]

let idEdit: number = 0

printTasks(Tasks)

form?.addEventListener('input', (e: Event): void => {
    const input = e.target as HTMLInputElement
    inputValue = input.value
    console.log(inputValue);

})


form?.addEventListener('submit', (e: Event): void => {
    e.preventDefault()
    if (inputValue) {
        form.reset()
        if (InputMode.mode === 'normal') {
            taskObject.task = inputValue
            setTasks(taskObject)
            printAlert('Tarea agregada correctamente','success')
            inputValue = ''
            return
        }
        
        InputMode.mode = "normal"
        
        Tasks = Tasks.map(task => task.id !== idEdit ? task : {
            id: task.id,
            task: inputValue
          
        })

        printAlert('Tarea editada correctamente','success')

        printTasks(Tasks)

        inputValue = ''

        return
    }

    printAlert('Llene los campos ','error')

})


function printAlert(mensaje: string, tipo: Mensaje ) {
    alertElement!.textContent = mensaje.toString()

    alertElement?.classList.add('active',tipo)
    setTimeout(() => {
        alertElement?.classList.remove('active',tipo)
    }, 2400);

}


function setTasks(taskItem: typeTask) {
    taskItem.id = Date.now()
    Tasks = [...Tasks, { ...taskItem }]
    printTasks(Tasks)

}

function printTasks(arrayTasks: typeTask[]): void {
    // let html: string = ''
    cleanHTML()

    if (!arrayTasks.length) {
        mainBody!.innerHTML = `<h2 class="main__message">there aren't tasks</h2>`
        return
    }

    arrayTasks.forEach(taskitem => {
        const { id, task } = taskitem

        const card = document.createElement('article')
        const cardText = document.createElement('p')
        const cardActions = document.createElement('div')
        const btnEdit = document.createElement('button')
        const btnRemove = document.createElement('button')
        card.classList.add('card')
        cardText.classList.add('card__text')
        cardActions.classList.add('card__actions')
        btnEdit.classList.add('card__btn', 'card__btn--edit')
        btnRemove.classList.add('card__btn', 'card__btn--remove')
        btnEdit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"/></svg>'
        btnRemove.innerHTML = '  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>'
        btnEdit.onclick = (e) => editTask(e, id);
        btnRemove.onclick = (e) => removeTask(e, id);

        cardText.textContent = task

        cardActions.appendChild(btnEdit)
        cardActions.appendChild(btnRemove)

        card.appendChild(cardText)
        card.appendChild(cardActions)

        mainBody?.appendChild(card)
    });
}

function editTask(e: Event, id: number) {
    e.preventDefault()
    InputMode.mode = "edit"
    const inputForm = form?.elements['inputTask'] as HTMLInputElement
    inputForm.value = Tasks.find(item => item.id === id)?.task as string
    idEdit = id
    console.log(InputMode);

}

function removeTask(e: Event, id: number) {
    e.preventDefault()
    Tasks = Tasks.filter(task => task.id !== id && task)
    printTasks(Tasks)
}

function cleanHTML(): void {
    while (mainBody?.firstChild) {
        mainBody.removeChild(mainBody.firstChild)
    }
}
