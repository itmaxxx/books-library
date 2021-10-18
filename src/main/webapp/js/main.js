document.addEventListener("DOMContentLoaded", () => {
    fetchAndFillBooks();
});

function fetchAndFillBooks() {
    const container = document.getElementById("books-container");

    if (!container) throw "books-container not found";

    fetch("books")
        .then(resp => resp.json())
        .then(json => {
            fillBooks(container, json);
        });
}

function fillBooks(container, books) {
    fetch("templates/bookitem.html")
        .then(r => r.text())
        .then(tpl => {
            let html = "";

            for (let book of books) {
                html += tpl
                    .replace("{{id}}", book["id"])
                    .replace("{{author}}", book["author"])
                    .replace("{{title}}", book["title"])
                    .replace("{{cover}}", book["cover"]);
            }

            container.innerHTML = html;
        }).then(() => {
            for (let btn of document.querySelectorAll(".delete-book")) {
                btn.addEventListener("click", deleteClick);
            }
        });
}

function deleteClick(e) {
    const pid = findBookId(e);

    if (confirm("Are you sure you want to delete book?")) {
        fetch("books?id=" + pid, { method: "delete" })
            .then(resp => resp.json())
            .then(json => {
                if (json.error) {
                    alert(json.message);
                } else {
                    let bookItem = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;

                    // Remove book item from books container
                    bookItem.parentNode.removeChild(bookItem);
                }
            });
    }
}

function findBookId(e) {
    const tt = e.target.parentNode.parentNode.parentNode.querySelector("tt");

    if (!tt) throw "tt not found in parent node";

    return tt.innerHTML;
}
