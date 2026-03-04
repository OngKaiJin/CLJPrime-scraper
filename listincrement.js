nodes = [];
checked = [];
for (let i of newnodes) {
    matched = false;
    for (let j of oldnodes) {
        if (i.citation[0] == j.citation[0]) {
            matched = true;
        }
    };
    if (!matched) {
        nodes.push({title: i.title, citation: i.citation, id: i.id});
    }
}
oldnodes.forEach(i => checked.push(i.pdf));
