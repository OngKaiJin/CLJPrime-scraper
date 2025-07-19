command = '';
checked = [];
suffix = '_mmu1.pdf';
isinvalid = (id) => {
    for (j of invalid.nopdf) {
        if (id == j) {
            return true;
        }
    }
}
isduplicate = (pdf) => {
    count = 0;
    for (j of checked) {
        if (pdf == j) {
            count = count + 1;
        }
    }
    checked.push(pdf);
    if (count) {
        return true;
    }
}
for (i of nodes) {
    if (!isinvalid(i.id) && !isduplicate(i.pdf)) {
        command += i.id + " " + i.pdf.replace("/tempreport/","").replace(suffix,"");
    }
    command += '\n';
}
console.log(command.slice(0, -1));
