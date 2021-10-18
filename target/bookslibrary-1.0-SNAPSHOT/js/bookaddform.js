document.addEventListener("submit",sendClick);
document.addEventListener("DOMContentLoaded", () => {
    const cover = document.getElementById("cover");

    cover.onchange = coverChange;
});

function sendClick(e) {
    e.preventDefault();

    const author = e.target.querySelector("input[name=author]");
    const title  = e.target.querySelector("input[name=title]");
    const cover  = e.target.querySelector("input[name=cover]");

    const formData = new FormData();
    formData.append("author", author.value);
    formData.append("title",  title.value);
    formData.append("cover",  cover.files[0]);

    fetch("books", { method: "POST", body: formData })
        .then(resp => resp.text()).then((json) => { fetchAndFillBooks(); console.log(json); });
}

function coverChange(e) {
    if(e.target.files) {
        const coverImg = document.getElementById("coverImg");

        coverImg.src = URL.createObjectURL(e.target.files[0]);
    }
}

