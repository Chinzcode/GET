//View
function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
    <div>
        ${updateInputView()}
    </div>
    <div>
        ${updateDropdownBoxView()}
    </div>
    <ul>
        ${updateListView()}
    </ul>
    `;
}

function updateInputView() {
    let html = /*HTML*/`
    <input type="text" id="inputFieldTask" oninput="model.input.task = this.value" placeholder="Write task">
    <input type="text" id="inputFieldName" oninput="model.input.name = this.value" placeholder="Write responsible">
    <button onclick="addTask()">Submit</button>
    <div>${model.app.errorMessage || ''}</div>
    `;
    return html;
}

function updateListView() {
    let html = '';
    for (let i = 0; i < model.data.length; i++) {
        html += `<li>${updateEditModeView(i)}</li>`;
    }
    return html;
}
function updateEditModeView(index) {
    let html = '';
    if (!model.data[index].editMode) { // Check the editMode property
        html = /*HTML*/`
        ${model.data[index].text}
        ${model.data[index].responsible}
        <button onclick="toggleTaskDone(${index})">✓</button>
        <button onclick="editTask(${index})">✎</button>
        <button onclick="deleteTask(${index})">✖</button>
        `;
    } else {
        html = /*HTML*/`
        <input type="text" value="${model.data[index].text}" oninput="model.input.edit.text = this.value"/>
        <input type="text" value="${model.data[index].responsible}" oninput="model.input.edit.responsible = this.value"/>
        <button onclick="updateTask(${index})">Save</button>
        `;
    }
    html += model.data[index].doneDate || '';
    return html;
}

function updateDropdownBoxView() {
    let html = '<select>';
    let names = ['All'];
    for (let i = 0; i < model.data.length; i++) {
        let responsible = model.data[i].responsible;
        if (!names.includes(responsible)) {
            names.push(responsible);
        }
    }
    for (let element of names) {
        html += `<option>${element}</option>`;
    }
    html += '</select>';
    return html;
}

// html += `<option>${model.data[i].responsible}</option>`;
 
//Controller
function toggleTaskDone(index) {
    const d = new Date();
    let text = d.toISOString();
    let task = model.data[index];
    task.isDone = !task.isDone
    if (task.isDone) task.doneDate = text;
    else task.doneDate = null;
    updateView();
}

function deleteTask(index) {
    model.data.splice(index, 1);
    updateView();
}

function addTask() {
    if (model.input.task != null && model.input.name != null) {
        model.data.push({text: model.input.task, responsible: model.input.name, doneDate: null, isDone: false, editMode: false,});
        model.app.errorMessage = null;
    } else {
        model.app.errorMessage = 'Error: Fyll ut begge tesktfelt!'
    }
    model.input.task = null;
    model.input.name = null;
    updateView();
}

function editTask(index) { //NB! Kan kun redigere enn oppgave om gangen
    model.data[index].editMode = true;
    model.input.edit.text = model.data[index].text;
    model.input.edit.responsible = model.data[index].responsible;
    updateView();
}

function updateTask(index) {
    if (model.input.edit.text === '' || model.input.edit.responsible === '') {
        model.app.errorMessage = 'Error: Fyll ut begge tesktfelt!'
    } else {
        model.data[index].text = model.input.edit.text;
        model.data[index].responsible = model.input.edit.responsible;
        model.app.errorMessage = null;
    }
    model.data[index].editMode = false;
    updateView();
}
