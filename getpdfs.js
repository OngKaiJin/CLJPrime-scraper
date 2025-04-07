database = "Case";
loop = (i) => {
    if (i < nodes.length) {
        fetch(document.location.origin + "/Members/View" + database + "PDF.aspx?" + database + "Id=" + nodes[i].id).then((resp) => {
            if (resp.status == 200) {
                return resp.text();
            } else {
                return loop(i);
            }
        })
        .then((content) => nodes[i].pdf = (new DOMParser).parseFromString(content, "text/html").querySelector("#imgViewer").getAttribute("src"))
        .then(() => loop(i + 1));
    } else {
        console.log(nodes);
    }
}
loop(0);
