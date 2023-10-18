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