count = 0;
suffix = "_mmu1.pdf";
imperfect = [];
output = 'identifier,file,REMOTE_NAME,title,date,mediatype,collection\n';
isinvalid = (id) => {
    for (k of invalid.nopdf) {
        if (id == k) {
            return true;
        }
    }
}
for (i of nodes) {
    citation = i.citation[0];
    for (j of [["CLJ Rep", "CLJRep", "Current Law Journal Reprint", "cljrep"], ["CLJ", "CLJ", "Current Law Journal", "clj"]]) {
        if (citation.includes(j[0])) {
            citation = i.citation[0].replace(" " + j[0], "").replace("[", "").replace("]", "").split(" ");
            cite = i.citation[0].replace(" " + j[0], "").replace("[", "").replace("]", "").replace("  ", " ").replaceAll(" ", "_");
            testing = "/tempreport/" + j[1] + "_" + cite + suffix;
            if (testing != i.pdf) {
                imperfect.push([testing, i.pdf, ('' + isinvalid(i.id)).replace("true", "not in table").replace("undefined", "in table")]);
            }
            if (count == 0) {
                previous = "";
            }
            if (citation[1] != "") {
                volume = '_' + citation[1];
                volume2 = ', Volume ' + citation[1];
            } else {
                volume = '';
                volume2 = '';
            }
            identifier = j[3] + "_" + citation[0] + volume;
            if (!isinvalid(i.id)) {
                if (previous != identifier) {
                    output += identifier;
                }
                output += ',"' + i.pdf.replace("/tempreport/", "").replace(suffix, "") + '"';
                output += ',"' + i.pdf.replace("/tempreport/", "").replace(suffix, "") + ".pdf" + '"';
                if (previous != identifier) {
                    output += ',"' + j[2] + ', ' + citation[0] + volume2 + '"';
                    output += ',' + citation[0];
                    output += ',texts';
                    output += ',current-law-journal';
                }
            }
            previous = identifier;
        }
    }
    output += '\n';
    count++;
}
console.log(output.slice(0, -1));
