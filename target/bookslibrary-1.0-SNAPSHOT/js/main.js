document.addEventListener("DOMContentLoaded", () => {
    fetchAndFillBooks();
});

function editClick(e) {
    const pid = findBookId(e);

    const container = e.target.parentNode.parentNode.parentNode;

    const title = container.querySelector("h5");
    const author = container.querySelector("p");

    // Edit mode if no saved text
    if (typeof title.savedText == 'undefined') {
        title.setAttribute("contenteditable", "true");
        title.focus();
        title.savedText = title.innerText;

        author.setAttribute("contenteditable", "true");
        author.savedText = title.innerText;

        e.target.innerText = "Save";
    } else {
        title.removeAttribute("contenteditable");
        author.removeAttribute("contenteditable");

        e.target.innerText = "Edit";

        if (title.savedText !== title.innerText || author.savedText !== author.innerText) {
            fetch("books", {
                method: "PUT",
                body: JSON.stringify({id: pid, title: title.innerText, author: author.innerText}),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).then(resp => resp.json()).then(json => {
                alert(json.message);
                if (json.error) {
                    title.innerText = title.savedText;
                    author.innerText = author.savedText;
                }

                delete title.savedText;
                delete author.savedText;
            });
        } else {
            delete title.savedText;
            delete author.savedText;
        }
    }
}

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

            for (let btn of document.querySelectorAll(".edit-book")) {
                btn.addEventListener("click", editClick);
            }

            for (let btn of document.querySelectorAll(".download-book")) {
                btn.addEventListener("click", downloadClick);
            }
        });
}


function downloadClick(e) {
    const pid = findBookId(e);

    window.location = "download/" + pid;
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
