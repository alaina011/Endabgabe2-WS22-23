namespace Endabgabe_Firework {

    /*
                        Aufgabe: <Endabgabe_Firework>
                        Name: <Alina Jana Hahn>
                        Matrikel: <271344>
                        Datum: < 12.02.2023 >
                        Quellen: <  >
                        */

    window.addEventListener("load", handleLoad);

    interface Vector {
        x: number;
        y: number;
    }

    export interface Item {
        type: string;
        // color: string;
        size: number;
    }

    export interface Data {
        [category: string]: Item[];
    }

    interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }

    let json: FormDataJSON = {};


    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;

    let fireworkObject: Firework[] = [];


    async function handleLoad(_event: Event): Promise<void> {

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~hahnalin/Firework/?command=find&collection=Data");
        let offer: string = await response.text();
        let data: Data = JSON.parse(offer);

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let openbutton: Element = document.querySelector("#open");
        // openbutton.addEventListener("click", dataList(data));

        let savebutton: Element = document.querySelector("#save");
        savebutton.addEventListener("click", addFirework);

        let canvaspicture: Element = document.querySelector("#canvas");
        canvaspicture.addEventListener("click", createFirework);

        dataList(data);
        setInterval(update, 20);

    }


    function update(): void {
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



    async function dataList(_data: Data): Promise<void> {
        console.log("DataList");


        let type: string;
        let color: string;
        let size: number;

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Data");
        query.toString();

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~hahnalin/Firework/?" + query.toString());
        let offer: string = await response.text();
        let entry: any = response.json; 


        for (let category in _data) {
            let items: Item[] = _data[category];

            for (let index: number = 0; index < items.length; index++) {

                type = items[index].type;
                // color = items[index].color;
                size = items[index].size;

                let createDiv: HTMLElement = document.createElement("div");
                createDiv.innerHTML = type + " " + color + " " + size;
                createDiv.classList.add("dataList");
                document.body.appendChild(createDiv);
            }
        }
    }






    function addFirework(_event: Event): void {
        // console.log("Add");

        let selectValue: HTMLOptionElement = <HTMLOptionElement>document.getElementById("type");
        // let colorValue: HTMLInputElement = document.getElementsByTagName("Input");
        let sizeValue: HTMLInputElement = <HTMLInputElement>document.getElementById("size");

        let i: Item = {
            type: selectValue.value,
            size: +sizeValue.value,
            // color: colorValue.value
        };
        addItem(i);
    }

    function addItem(_element: Item): void {

        let list: HTMLElement = document.querySelector(".list");
        let div: HTMLElement = document.createElement("div");
        let label: HTMLElement = document.createElement("label");
        let iconTrash: HTMLElement = document.createElement("i");

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

    async function deleteBox(_event: Event): Promise<void> {
        // console.log("delete");
        this.parentElement.remove();

        let query: URLSearchParams = new URLSearchParams();
        query.set("commend", "delete");
        query.set("collection", "Data");
        query.set("Data", JSON.stringify(json));

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~hahnalin/Firework/?" + query.toString());
        console.log(response);
    }


    function checkedBox(_event: Event): void {
        console.log("checked");

        


    }

    async function sendFirework(_event: Event): Promise<void> {
        console.log("send Firework");

        let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form");
        let formData: FormData = new FormData(form);

        for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Data");
        query.set("Data", JSON.stringify(json));
        console.log(JSON.stringify(json));

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~hahnalin/Firework/?" + query.toString());
        console.log(response);
        alert("Send Firework to Data");


    }




    function createFirework(): void {
        console.log("Create");

        let canvasPosition: HTMLElement = document.getElementById("canvas");
        canvasPosition.addEventListener("mousedown", getPosition);

        let selectValue: HTMLOptionElement = <HTMLOptionElement>document.getElementById("type");
      
        let type: string = selectValue.value;
     

        if (type = "heart") {
            let heartFirework: Heart = new Heart();
            fireworkObject.push(heartFirework);
            
        }
        else if (type = "Circle") {
            let circleFirework: Circle = new Circle();
            fireworkObject.push(circleFirework);
        }
        else {
            let fountainFirework: Fountain = new Fountain();
            fireworkObject.push(fountainFirework);
        }
    }


    function getPosition(_event: MouseEvent): void {
        this.position.x = _event.offsetX;
        this.position.y = _event.offsetY;

        console.log("x " + this.position.x + "x " + this.position.y);
    }
}