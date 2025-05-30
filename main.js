// consts!!!!

const input = document.querySelector(".input");
const select_btn = document.getElementById("selec");
const teach = document.querySelector(".teach");
const addbtn = document.querySelector(".addbtn");
const delbtn = document.querySelector(".delbtn");
const search = document.querySelector(".search");
const learned = document.querySelector(".learned");
const addplace = document.querySelector(".addplace");


// constructor function

function NewCard(text, position, selected) {
    this.text = text;
    this.position = position;
    this.selected = selected;
}

// lets!!!

let cards = [];
let select = false;
let addplacevisible = true;

// load json in the localstogare

window.onload = () => {
    const savedCards = localStorage.getItem('cards');

    if(savedCards) {
        cards = JSON.parse(savedCards);
        render();
    }
}

// add, select and remove

function add() {  
    cards.push(new NewCard(input.value, "search", false));
    render();
    saveCards();
    input.focus();
 
}

function selec() {   
    if (select == false) {
        select_btn.src = "img/select1.png";
        select = true;
        render();
        hidesmth(addplace);
        hidesmth(addbtn);
        showssmth(delbtn);
    }else {
        select_btn.src = "img/select0.png";
        select = false;
        render();
        hidesmth(delbtn);
        showssmth(addbtn);

        if (addplacevisible == true) {
            showssmth(addplace)
        }
    }
    
}

function del() {
    cards.forEach((card, index) => {
        const {selected} = card;
        if (cards[index].selected == true) {
            cards.splice(index, 1);
        }
        render();
        saveCards();
    })
}

// appeareances (show/hide, left/right)

function showssmth(something) {
    something.classList.remove('hidden');
    input.focus();
}

function hidesmth(something) {
    something.classList.add('hidden');
    input.value = null;
}

function left(index, position) {
    console.log(index)
    if (position == "teach") {
        cards.push(new NewCard(cards[index].text, "search", false));
        cards.splice(index, 1);
        render();
        saveCards();
    }
    if (position == "learned") {
        cards.push(new NewCard(cards[index].text, "teach", false));
        cards.splice(index, 1);
        render();
        saveCards();
    }
}

function right(index, position) {
    if (position == "teach") {
        cards.push(new NewCard(cards[index].text, "learned", false));
        cards.splice(index, 1);
        render();
        saveCards();
    }
    if (position == "search") {
        cards.push(new NewCard(cards[index].text, "teach", false));
        cards.splice(index, 1);
        render();
        saveCards();
    }
}

// save cards in localstorage 

function saveCards() {
    localStorage.setItem("cards", JSON.stringify(cards));
}

// render ;)

function render(){
    search.innerHTML = "";
    teach.innerHTML = "";
    learned.innerHTML = "";
    cards.forEach((card, index) => {
        const {text, position, selected} = card;
        
        const article = document.createElement('article');
        const img1 = document.createElement('img');
        const p = document.createElement('p');
        const img2 = document.createElement('img');
        const div = document.createElement('div');
        const input = document.createElement('img');

        if (select == true) {
            div.classList.remove('hidden');
            img1.classList.add('hidden');
            img2.classList.add('hidden');
            article.classList.add('card');
        }else {
            div.classList.add('hidden');
            img1.classList.remove('hidden');
            img2.classList.remove('hidden');
            article.classList.add('remove');
        }

        function sele() {
            console.log(index)
            if(cards[index].selected == false) {
                cards[index].selected = true;
                input.src = "img/select1.png";
                
            } else {
                cards[index].selected = false;
                input.src = "img/select0.png";   
            }
        }
        
        input.src = "img/select0.png";
        input.onclick = () => sele();
        input.classList.add('check');
        img1.src = "img/left.png";
        img1.classList.add('padbutton');
        img1.onclick = () => left(index, position)
        p.classList.add('content');
        p.textContent = text;
        img2.src = "img/right.png";
        img2.classList.add('padbutton');
        img2.onclick = () => right(index, position);

        article.appendChild(div);
        div.appendChild(input);
        
        let maxse = null;
        let maxte = null;
        let maxle = null;
        
        if (position == "search") {
            article.appendChild(p);
            article.appendChild(img2);
            search.appendChild(article);

            maxse = index;

            console.log(maxse, " s");
        }
        if (position == "teach") {
            article.appendChild(img1);
            article.appendChild(p);
            article.appendChild(img2);
            teach.appendChild(article); 

            maxte = index;

            console.log(maxte, " t");
        }
        if (position == "learned") {
            article.appendChild(img1);
            article.appendChild(p);
            learned.appendChild(article);
            
            maxle = index;

            console.log(maxle, " l");
        }
    })
}

// MOBILE

// mobile consts!!

const se = document.querySelector(".se");
const te = document.querySelector(".te");
const le = document.querySelector(".le");
const sea = document.querySelector(".sea");
const tea = document.querySelector(".tea");
const lea = document.querySelector(".lea");

function chance_section(input) {
    console.log(input.textContent)
    if (input.textContent == "Search") {

        // btn

        se.classList.add('btn-selected-mobile');
        te.classList.remove('btn-selected-mobile');
        le.classList.remove('btn-selected-mobile');

        // section

        sea.classList.remove('hide-on-mobile');
        tea.classList.add('hide-on-mobile');
        lea.classList.add('hide-on-mobile');
    }
    if (input.textContent == "Teach") {

        // btn

        se.classList.remove('btn-selected-mobile');
        te.classList.add('btn-selected-mobile');
        le.classList.remove('btn-selected-mobile');

        // section

        sea.classList.add('hide-on-mobile');
        tea.classList.remove('hide-on-mobile');
        lea.classList.add('hide-on-mobile');
    }
    if (input.textContent == "Learned") {

        // btn

        se.classList.remove('btn-selected-mobile');
        te.classList.remove('btn-selected-mobile');
        le.classList.add('btn-selected-mobile');

        // section

        sea.classList.add('hide-on-mobile');
        tea.classList.add('hide-on-mobile');
        lea.classList.remove('hide-on-mobile');
    }
}

// trash? idk

/*
<article class="card"> 
    <div class="hidden" style="display: none;"><input class="check" type="checkbox"></div>
    <p class="content">Exemple text</p>
    <img src="img/right.png" class="padbutton">
</article>


let tcards = [];
let lcards = [];
tcards = JSON.parse(savedTeach);
lcards = JSON.parse(savedLearned);
const savedTeach = localStorage.getItem('teach');
const savedLearned = localStorage.getItem('learned');
*/