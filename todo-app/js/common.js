function filterByResponsible() {
    let filteredNames = ['Alle'];
    for (let i = 0; i < model.data.length; i++) {
        let responsible = model.data[i].responsible.toLowerCase();
        if (!filteredNames.includes(responsible)) {
            filteredNames.push(responsible);
        }
    }
    return filteredNames;
}