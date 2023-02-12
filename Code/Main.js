var Endabgabe_Firework;
(function (Endabgabe_Firework) {
    /*
                        Aufgabe: <Endabgabe_Firework>
                        Name: <Alina Jana Hahn>
                        Matrikel: <271344>
                        Datum: < 12.02.2023 >
                        Quellen: <  >
                        */
    window.addEventListener("load", handleLoad);
    let json = {};
    let fireworkObject = [];
    async function handleLoad(_event) {
        let response = await fetch("https://webuser.hs-furtwangen.de/~hahnalin/Firework/?command=find&collection=Data");
        let offer = await response.text();
        let data = JSON.parse(offer);
        Endabgabe_Firework.canvas = document.querySelector("canvas");
        Endabgabe_Firework.crc2 = Endabgabe_Firework.canvas.getContext("2d");
        let openbutton = document.querySelector("#open");
        // openbutton.addEventListener("click", dataList(data));
        let savebutton = document.querySelector("#save");
        savebutton.addEventListener("click", addFirework);
        let canvaspicture = document.querySelector("#canvas");
        canvaspicture.addEventListener("click", createFirework);
        dataList(data);
        setInterval(update, 20);
    }
    function update() {
        // console.log("update");
        for (let heart of fireworkObject) {
            heart.draw();
            heart.move(1 / 50);
        }
        for (let circle of fireworkObject) {
            circle.draw();
            circle.move(1 / 50);
        }
        for (let fountain of fireworkObject) {
            fountain.draw();
            fountain.move(1 / 50);
        }
    }
    async function dataList(_data) {
        console.log("DataList");
        let type;
        let color;
        let size;
        let query = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Data");
        query.toString();
        let response = await fetch("https://webuser.hs-furtwangen.de/~hahnalin/Firework/?" + query.toString());
        let offer = await response.text();
        let entry = response.json;
        for (let category in _data) {
            let items = _data[category];
            for (let index = 0; index < items.length; index++) {
                type = items[index].type;
                // color = items[index].color;
                size = items[index].size;
                let createDiv = document.createElement("div");
                createDiv.innerHTML = type + " " + color + " " + size;
                createDiv.classList.add("dataList");
                document.body.appendChild(createDiv);
            }
        }
    }
    function addFirework(_event) {
        // console.log("Add");
        let selectValue = document.getElementById("type");
        // let colorValue: HTMLInputElement = document.getElementsByTagName("Input");
        let sizeValue = document.getElementById("size");
        let i = {
            type: selectValue.value,
            size: +sizeValue.value,
            // color: colorValue.value
        };
        addItem(i);
    }
    function addItem(_element) {
        let list = document.querySelector(".list");
        let div = document.createElement("div");
        let label = document.createElement("label");
        let iconTrash = document.createElement("i");
        iconTrash.addEventListener("click", deleteBox);
        iconTrash.classList.add("trash");
        div.classList.add("box");
        div.addEventListener("click", checkedBox);
        iconTrash.innerHTML = '<i class="fa-solid fa-trash"> </i>';
        label.innerHTML += -_element.type + " " + _element.size;
        div.append(iconTrash, label);
        list.append(div);
        sendFirework(event);
    }
    async function deleteBox(_event) {
        // console.log("delete");
        this.parentElement.remove();
        let query = new URLSearchParams();
        query.set("commend", "delete");
        query.set("collection", "Data");
        query.set("Data", JSON.stringify(json));
        let response = await fetch("https://webuser.hs-furtwangen.de/~hahnalin/Firework/?" + query.toString());
        console.log(response);
    }
    function checkedBox(_event) {
        console.log("checked");
    }
    async function sendFirework(_event) {
        console.log("send Firework");
        let form = document.querySelector("form");
        let formData = new FormData(form);
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Data");
        query.set("Data", JSON.stringify(json));
        console.log(JSON.stringify(json));
        let response = await fetch("https://webuser.hs-furtwangen.de/~hahnalin/Firework/?" + query.toString());
        console.log(response);
        alert("Send Firework to Data");
    }
    function createFirework() {
        console.log("Create");
        let canvasPosition = document.getElementById("canvas");
        canvasPosition.addEventListener("mousedown", getPosition);
        let selectValue = document.getElementById("type");
        let type = selectValue.value;
        if (type = "heart") {
            let heartFirework = new Endabgabe_Firework.Heart();
            fireworkObject.push(heartFirework);
        }
        else if (type = "Circle") {
            let circleFirework = new Endabgabe_Firework.Circle();
            fireworkObject.push(circleFirework);
        }
        else {
            let fountainFirework = new Endabgabe_Firework.Fountain();
            fireworkObject.push(fountainFirework);
        }
    }
    function getPosition(_event) {
        this.position.x = _event.offsetX;
        this.position.y = _event.offsetY;
        console.log("x " + this.position.x + "x " + this.position.y);
    }
})(Endabgabe_Firework || (Endabgabe_Firework = {}));
//# sourceMappingURL=Main.js.map