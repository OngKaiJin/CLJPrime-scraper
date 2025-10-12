suffix = "_mmu1.pdf";
previous = "";
checked = [];
imperfect = [];
output = 'identifier,file,REMOTE_NAME,title,date,mediatype,collection\n';
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
hasmask = (id) => {
    for (j of mask) {
        if (id == j.id) {
            citation = j.citation[0];
            pdf = j.pdf;
        }
    }
}
for (i of nodes) {
    citation = i.citation[0];
    pdf = i.pdf;
    hasmask(i.id);
    for (k of [["CLJ Rep", "CLJRep", "Current Law Journal Reprint", "cljrep"], ["CLJ", "CLJ", "Current Law Journal", "clj"]]) {
        if (citation.includes(k[0])) {
            cite = citation.replace(" " + k[0], "").replace("[", "").replace("]", "").replace("  ", " ").replaceAll(" ", "_");
            testing = "/tempreport/" + k[1] + "_" + cite + suffix;
            if (testing != pdf) {
                imperfect.push([testing, pdf, ('' + isinvalid(i.id)).replace("true", "not in table").replace("undefined", "in table")]);
            }
            citation = citation.replace(" " + k[0], "").replace("[", "").replace("]", "").split(" ");
            if (citation[1] != "") {
                volume = '_' + citation[1];
                volume2 = ', Volume ' + citation[1];
            } else {
                volume = '';
                volume2 = '';
            }
            identifier = k[3] + "_" + citation[0] + volume;
            if (!isinvalid(i.id) && !isduplicate(pdf)) {
                if (previous != identifier) {
                    output += identifier;
                }
                output += ',"' + i.pdf.replace("/tempreport/", "").replace(suffix, "") + '"';
                output += ',"' + pdf.replace("/tempreport/", "").replace(suffix, "").replaceAll("_", " ") + ".pdf" + '"';
                if (previous != identifier) {
                    output += ',"' + k[2] + ', ' + citation[0] + volume2 + '"';
                    output += ',[' + citation[0] + ']';
                    output += ',texts';
                    output += ',current-law-journal';
                }
                previous = identifier;
            }
        }
    }
    output += '\n';
}
console.log(output.slice(0, -1));
