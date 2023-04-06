const API_URL = "http://localhost:3001/api/clients";

async function createTable() {
    const response = await fetch(API_URL);
    const data = await response.json();

    // Clear the container div
    const container = document.getElementById("cont");
    container.innerHTML = "";

    // Create the table element
    const table = document.createElement("table");
    table.className = "stable";

    // Create the header row and cells
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    ["Id", "E-mail", "Prénom", "Nom", "Société", "Date", "Pays"].forEach(header => {
        const th = document.createElement("th");
        th.innerText = header;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    // Populate the table rows and cells
    data.clients.forEach(item => {
        const tr = document.createElement("tr");
        Object.values(item).forEach(value => {
            const td = document.createElement("td");
            td.innerText = value;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    // Append the table to the container div
    container.appendChild(table);
}

async function getTotalPages() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.totalPages;
}

function addRemovePage(param) {
    const url = new URL(API_URL);
    let page = url.searchParams.get("page") || 1;
    if (page == 1 && param == "-") return;
    getTotalPages().then(totalPages => {
        if (page == totalPages && param == "+") return;
        page = parseInt(page) + (param == "+" ? 1 : -1);
        changeParam("page", page);
    });
}

function colorPage() {
    const url = new URL(API_URL);
    let page = url.searchParams.get("page") || 1;
    const pageLink = document.querySelector("#page" + page);
    if (pageLink) {
        pageLink.classList.add("bg-custom");
    }
}

function changeParam(param, value) {
    const url = new URL(API_URL);
    if (value === "last") {
        getTotalPages().then(totalPages => {
            changeParam(param, totalPages);
        });
        return;
    }
    url.searchParams.set(param, value);
    history.replaceState(null, "", url);
    createTable();
    if (param === "page") {
        createPagination();
    }
}

function changeSelectValue() {
    const e = document.getElementById("nbelt");
    changeParam("number", e.value);
    getTotalPages().then(totalPages => {
        let page = url.searchParams.get("page") || 1;
        page = parseInt(page);
        if (page > totalPages) {
            changeParam("page", totalPages);
        }
    });
}

async function createPagination() {
    const url = new URL(API_URL);
    const page = url.searchParams.get("page") || 1;
    const paginationDiv = document.getElementById("pagin");
    paginationDiv.innerHTML = "";

    const totalPages = await getTotalPages();
    const firstPage = Math.max(1, parseInt(page) - 1);
    const lastPage = Math.min(totalPages, parseInt(page) + 1);

    const createPageButton = pageNumber => {
        const button = document.createElement("button");
        button.className = "page-link";
        button.id = "page" + pageNumber;
        button.innerText = pageNumber;
        button.addEventListener("click", () => {
            changeParam("page", pageNumber + "");
        });
        return button;
    };

    const createPaginationButton = (text, param) => {
        const button = document.createElement("button");
        button.className = "page-link";
        button.innerText = text;
        button.addEventListener("click", () => {
            addRemovePage(param);
        });
    return button;
    };

    const createPaginationItem = (content, className) => {
        const li = document.createElement("li");
        li.className = "page-item" + (className ? " " + className : "");
        li.appendChild(content);
        return li;
    };

    const first = createPaginationItem(createPaginationButton("<<", "-"));
    const last = createPaginationItem(createPaginationButton(">>", "+"));
    const prev = createPaginationItem(createPaginationButton("<", "-"));
    const next = createPaginationItem(createPaginationButton(">", "+"));

    const ul = document.createElement("ul");
    ul.className = "pagination";

    if (page > 1) {
        ul.appendChild(first);
        ul.appendChild(prev);
    }

    for (let i = firstPage; i <= lastPage; i++) {
        const button = createPaginationItem(createPageButton(i));
        ul.appendChild(button);
    }

    if (page < totalPages) {
        ul.appendChild(next);
        ul.appendChild(last);
    }

    paginationDiv.appendChild(ul);
    colorPage();
}

createTable();
createPagination();

