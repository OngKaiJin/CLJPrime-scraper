nodes = [];
count = 0;
journal = 'CLJ';
SearchID = '';
doc = '';
load = (path, body) =>
        fetch(document.location.origin + path, {
        "headers": {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        "body": body,
        "method": "POST",
    }).then((resp) => resp.text())
    .then((content) => {
        doc = parser.parseFromString(content, "text/html");
        return content;
    });
loop = (j) => {
    load(SearchID, "__EVENTTARGET=ctl00%24CMain%24btnPage&__VIEWSTATE=" + encodeURIComponent(doc.querySelector("#__VIEWSTATE").value) + "&ctl00%24CMain%24ddlSortOrder=4&ctl00%24CMain%24ddlSortType=asc&ctl00%24CMain%24txtGoPage=" + j)
    .then((content) => {
        if (doc.querySelector("#ctl00_CMain_lblMatchedCount")) {
            if (nodes.length == 0) {
                count = doc.querySelector("#ctl00_CMain_lblMatchedCount").innerText;
            }
            if (doc.querySelector("#ctl00_CMain_lblMatchedCount").innerText == count) {
                for (i of doc.querySelectorAll("#ctl00_CMain_gdCasesDisplay > tbody > tr:not(.title)")) {
                    let obj = new Object;
                    cite = document.createElement("div");
                    obj.title = i.querySelector("td:nth-child(2) > span:nth-child(1) > a").innerHTML.split("<br>").map((x) => {
                        cite.innerHTML = x;
                        return cite.innerText;
                    });
                    obj.citation = i.querySelector("td:nth-child(4) > a").innerHTML.split("<br>").map((x) => {
                        cite.innerHTML = x;
                        return cite.innerText;
                    });
                    obj.id = i.querySelector("td:nth-child(4) > a").getAttribute("href").split("CaseId=")[1].split("&SearchId")[0];
                    nodes.push(obj);
                    i++;
                }
                if (j < doc.querySelector("#ctl00_CMain_lbltotPage").innerText.replace("of ","")) {
                    loop(j + 1);
                } else {
                    console.log(nodes);
                }
            } else {
                search(j);
                console.log("Search was being changed, resubmitted search");
            }
        } else {
            search(j);
            console.log("Search was empty, resumbitted search");
        }
    });
}
search = (j) => {
    parser = new DOMParser();
    fetch(document.location.origin + "/Members/Welcome.aspx").then((resp) => resp.text())
    .then((content) => {
        doc = parser.parseFromString(content, "text/html");
        load("/Members/Welcome.aspx", "__EVENTTARGET=ctl00%24CMain%24rdbDatabase%240&__VIEWSTATE=" + encodeURIComponent(doc.querySelector("#__VIEWSTATE").value) + "&__EVENTVALIDATION=" + encodeURIComponent(doc.querySelector("#__EVENTVALIDATION").value) + "&ctl00%24CMain%24rdbDatabase=CASELAW")
        .then(() => load("/Members/Welcome.aspx", "__VIEWSTATE=" + encodeURIComponent(doc.querySelector("#__VIEWSTATE").value) + "&__EVENTVALIDATION=" + encodeURIComponent(doc.querySelector("#__EVENTVALIDATION").value) + "&__EVENTTARGET=ctl00%24CMain%24lnkAdvSearch"))
        .then(() => load("/Members/Welcome.aspx", "ctl00%24CMain%24ddlJournal=" + journal + "&__VIEWSTATE=" + encodeURIComponent(doc.querySelector("#__VIEWSTATE").value) + "&__EVENTVALIDATION=" + encodeURIComponent(doc.querySelector("#__EVENTVALIDATION").value) + "&ctl00%24CMain%24imgbtnGo=SEARCH"))
        .then((content) => SearchID = content.split("window.open('")[1].split("','DispResults")[0])
        .then(() => {
            fetch(document.location.origin + SearchID).then((resp) => resp.text())
            .then((content) => {
                doc = parser.parseFromString(content, "text/html");
                load(SearchID, "__EVENTTARGET=ctl00%24CMain%24btnPage&__VIEWSTATE=" + encodeURIComponent(doc.querySelector("#__VIEWSTATE").value) + "&ctl00%24CMain%24ddlSortOrder=4&ctl00%24CMain%24ddlSortType=asc&ctl00%24CMain%24txtGoPage=" + j)
                .then(() => loop(j));
            });
        });
    });
}
search(1);
