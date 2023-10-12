//View
function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
    <div>
        ${updateInputView()}
    </div>
    <ul>
        ${updateListView()}
    </ul>
    `;
}

function updateInputView() {
    let html = /*HTML*/`
    <input type="text" id="inputFieldTask" 
    oninput="model.input.task = this.value" placeholder="Write task">
    <input type="text" id="inputFieldName" 
    oninput="model.input.name = this.value" placeholder="Write responsible">
    <button onclick="addTask()">Submit</button>
    <div>${model.app.errorMessage || ''}</div>
    `;
    return html;
}

function updateListView() {
    let html = '';
    for (let i = 0; i < model.data.length; i++) {
        html += `<li>${test(i)}</li>`;
    }
    return html;
}

function test(index) {
    let html = '';
    if (!model.input.editMode) {
        html = /*HTML*/`
        ${model.data[index].text}
        ${model.data[index].responsible}
        <button onclick="toggleTaskDone(${index})">done</button>
        <button onclick="deleteTask(${index})">del</button>
        <button onclick="editTask(${index})">edit</button>
        `; 
    } else 
        html = /*HTML*/`
        <input type="text" value="${model.data[index].text}" oninput="model.input.edit.text = this.value"/>
        <input type="text" value="${model.data[index].responsible}" oninput="model.input.edit.responsible = this.value"/>
        <button onclick="updateTask(${index})">Save</button>
        `;
    
    html += model.data[index].doneDate || '';
    return html;
}

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
        model.data.push({text: model.input.task, responsible: model.input.name, doneDate: null, isDone: false});
        model.app.errorMessage = null;
    } else {
        model.app.errorMessage = 'Error: Fyll ut begge tesktfelt!'
    }
    model.input.task = null;
    model.input.name = null;
    updateView();
}

function editTask(index) {
    model.input.editMode = true;
    updateView();
}

function updateTask(index) {
    model.input.editMode = false;
    if (model.input.edit.text != null && model.input.edit.responsible != null) {
        model.data[index].text = model.input.edit.text;
        model.data[index].responsible = model.input.edit.responsible;
        model.app.errorMessage = null;
    } else {
        model.app.errorMessage = 'Error: Fyll ut begge tesktfelt!'
    }
    // <input type="text" value="${model.data[index].text}" oninput="model.input.edit.text = this.value"/>
    // <input type="text" value="${model.data[index].responsible}" oninput="model.input.edit.responsible = this.value"/>
    updateView();
}