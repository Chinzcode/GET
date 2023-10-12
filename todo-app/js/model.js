let model = {
    app: {
        errorMessage: null,
    },
    input: {
        task: null,
        name: null,
        editMode: false,
        // edit: {
        //     task: `<input type="text" 
        //     id="inputFieldTask" 
        //     oninput="model.input.task = this.value" 
        //     placeholder="Skriv oppgave">`,
        //     name: `<input type="text" 
        //     id="inputFieldName" 
        //     oninput="model.input.name = this.value" 
        //     placeholder="Skriv ansvarlig">`,
        // },
    },
    data: [
        {text: 'Rydde', 
        responsible: 'Trym', 
        doneDate: null, 
        isDone: false},

        {text: 'Støvsuge', 
        responsible: 'Trym', 
        doneDate: null, 
        isDone: false},

        {text: 'Vaske', 
        responsible: 'Trym', 
        doneDate: null, 
        isDone: false},
    ],
};