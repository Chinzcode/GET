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
    //'All'
    let html = `Filter by name <select onchange="test()">`;
    let filteredNames = filterByResponsible();
    for (let names of filteredNames) {
        html += `<option>${names}</option>`;
    }
    return html += '</select>';
}