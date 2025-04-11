database = "Case";
invalid = new Object();
invalid.nopdf = [];
invalid.unmatchingid = [];
loop = (i) => {
    if (i < nodes.length) {
        fetch(document.location.origin + "/Members/Display" + database + "_CLJ.aspx?" + database + "Id=" + nodes[i].id).then((resp) => {
            if (resp.status == 200) {
                return resp.text();
            } else {
                return loop(i);
            }
        })
        .then((content) => {
            pdfbutton = (new DOMParser).parseFromString(content, "text/html").querySelector("#ctl00_CMain_ibpdf");
            if (!pdfbutton) {
                invalid.nopdf.push(nodes[i].id);
            } else if (pdfbutton.getAttribute("href").split("CaseId=")[1].split("&SearchId")[0] != nodes[i].id) {
                invalid.unmatchingid.push([nodes[i].id, pdfbutton.getAttribute("href").split("CaseId=")[1].split("&SearchId")[0]]);
            }
        })
        .then(() => loop(i + 1));
    } else {
        console.log(invalid);
    }
}
loop(0);
