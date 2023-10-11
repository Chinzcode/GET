let model = {
    app: {
        errorMessage: null,
    },
    input: {
        task: null,
        name: null,
    },
    data: [
        {text: 'Rydde', responsible: 'Trym', doneDate: null, isDone: false},
        {text: 'Støvsuge', responsible: 'Trym', doneDate: null, isDone: false},
        {text: 'Vaske', responsible: 'Trym', doneDate: null, isDone: false},
    ],
};

//View
updateView();
function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
    <h4>Oppgaver</h4>
    <input type="text" id="inputFieldTask" oninput="model.input.task = this.value" placeholder="Skriv oppgave">
    <input type="text" id="inputFieldName" oninput="model.input.name = this.value" placeholder="Skriv ansvarlig">
    <button onclick="addNewTask()">Submit</button>
    <div>${model.app.errorMessage || ''}</div>
    <ul>
        ${updateListView()}
    </ul>
    `;
}

function updateListView() {
    let html = '';
    for (let i = 0; i < model.data.length; i++) {
        html += /*HTML*/`
        <li>
            ${model.data[i].text}
            <button onclick="toggleTaskDone(${i})">
            done
            </button>
            <button onclick="deleteTask(${i})">
            Del
            </button>
            ${model.data[i].doneDate || ''}
        </li>`;
    }
    return html;
}

//Controller
function toggleTaskDone(index) {
    const d = new Date();
    let text = d.toISOString();
    model.data[index].isDone = !model.data[index].isDone
    if (model.data[index].isDone) model.data[index].doneDate = text;
    else model.data[index].doneDate = null;
    updateView();
}

function deleteTask(index) {
    model.data.splice(index, 1);
    updateView();
}

function addNewTask() {
    if (model.input.task != null && model.input.name != null) {
        model.data.push({text: model.input.task, responsible: model.input.name, doneDate: null, isDone: false});
        model.app.errorMessage = null;
    } else {
        model.app.errorMessage = 'Error: Fyll ut begge tesktfelt!'
    }
    model.input.task = null;
    model.input.name = null;
    updateView();
}