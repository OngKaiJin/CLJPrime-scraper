command = '';
suffix = '_mmu1.pdf';
isinvalid = (id) => {
    for (j of invalid.nopdf) {
        if (id == j) {
            return true;
        }
    }
}
for (i of nodes) {
    if (!isinvalid(i.id)) {
        command += i.id + " " + i.pdf.replace("/tempreport/","").replace(suffix,"");
    }
    command += '\n';
}
console.log(command.slice(0, -1));
