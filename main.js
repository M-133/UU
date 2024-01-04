// Part 1
let textareaMake = document.querySelector("#textarea-make");
let textareaTitle = document.querySelector("#textarea-title");
let textareaPost = document.querySelector("#textarea-post");
let addButton = document.querySelector("#add");

// part 2 
let saved = document.querySelector("#saved");

// container
let main = [];

// CHECK IF WE HAVE OLD DATA to added and DISPLAY THIS DATA

if (localStorage.getItem("data")) {

    for (let i = 0; i < JSON.parse(localStorage.getItem("data")).length; i++) {
        main.push(JSON.parse(localStorage.getItem("data"))[i]);
    }

    for (let i = 0; i < JSON.parse(localStorage.getItem("data")).length; i++) {
        display(main[i].id, main[i].title);
    }

}

// =====================

function getRandomNum(min, max) {
    let x = Math.random() * (max - min) + min;
    x = Math.trunc(x);
    return x;
}

addButton.addEventListener("click", function () {

    let x = getRandomNum(1000, 6000);

    let data = {
        id: x,
        title: textareaTitle.value,
        description: textareaPost.value,
    };


    if (addButton.id === "add" && textareaTitle.value !== "" && textareaPost.value !== "") {



        main.push(data);

        saveInLocalStorage();


        display(data.id, data.title);


    }
    textareaTitle.value = "";
    textareaPost.value = "";

});

function saveInLocalStorage() {
    window.localStorage.setItem("data", JSON.stringify(main));
}

// part2


function display(id, title) {

    let x = document.createElement("div");
    let y = document.createElement("div");
    let z = document.createElement("button");

    let yText = document.createTextNode(`${title}`);
    let zText = document.createTextNode("حذف");

    x.id = id;
    y.id = "adress";
    z.id = "delete";

    y.appendChild(yText);
    z.appendChild(zText);

    x.appendChild(y);
    x.appendChild(z);

    saved.appendChild(x);
}

// ===============

//delete

saved.addEventListener("click", function (e) {

    if (e.target.id === "delete") {

        for (let i = 0; i < main.length; i++) {

            if (Number(e.target.parentElement.id) === main[i].id) {

                main.splice(i, 1);

                saveInLocalStorage();

                e.target.parentElement.remove();

            }

        }


    }

});



// display and edit


let numInMainForEdit = 0;

saved.addEventListener("click", function (e) {
    if (e.target.id === "adress") {

        for (let i = 0; i < main.length; i++) {

            if (main[i].id === Number(e.target.parentElement.id)) {

                textareaTitle.value = main[i].title;
                textareaPost.value = main[i].description;
                addButton.innerHTML = "تحديث";
                addButton.id = "update";

                numInMainForEdit = i;
            }
        }
    }
});


// update click
textareaMake.addEventListener("click", function (e) {

    if (e.target.id === "update") {

        if (addButton.id === "update" && textareaTitle.value !== "" && textareaPost.value !== "") {
            main[numInMainForEdit].title = textareaTitle.value;
            main[numInMainForEdit].description = textareaPost.value;
            saveInLocalStorage();
        }

        textareaTitle.value = "";
        textareaPost.value = "";
        addButton.innerHTML = "اضافة";
        addButton.id = "add";


        saved.innerHTML = "";
        for (let i = 0; i < JSON.parse(localStorage.getItem("data")).length; i++) {
            display(main[i].id, main[i].title);
        }

    }
});


// let test = [1, 2, 3, 4, 5];

// test.splice(2, 1, "Mohamed");

// console.log(test);