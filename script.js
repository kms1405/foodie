var meals = {
    1: {
        id: 1,
        name: "Chicken briyani",
        image: "./images/briyani.jpeg",
        desc: "Very delicious checken briyani at affordable price",
        like: false

    },
    2: {
        id: 2,
        name: "Mutton briyani",
        image: "./images/briyani.jpeg",
        desc: "Very delicious checken briyani at affordable price",
        like: false

    },
    3: {
        id: 3,
        name: "Prawn briyani",
        image: "./images/briyani.jpeg",
        desc: "Very delicious checken briyani at affordable price",
        like: false

    },
    4: {
        id: 4,
        name: "Idly",
        image: "./images/briyani.jpeg",
        desc: "Very delicious checken briyani at affordable price",
        like: false

    },
    5: {
        id: 5,
        name: "Dosa",
        image: "./images/briyani.jpeg",
        desc: "Very delicious checken briyani at affordable price",
        like: false

    },
    6: {
        id: 6,
        name: "Pongal",
        image: "./images/briyani.jpeg",
        desc: "Very delicious checken briyani at affordable price",
        like: false

    },
}

function set_localstorage(event_id, values) {

    return window.localStorage.setItem(event_id, values);

}


function get_localstorage(event_id) {

    return window.localStorage.getItem(event_id);

}


function getBgColourUsingId(meal_id) {
    var local_value = get_localstorage(`l${meal_id}`);

    if (!local_value) {
        var color = "white";

    } else {
        var color = JSON.parse(local_value) === true ? "#c02332" : "white";

    }

    return color



}


function viewProduct(event_id) {
    document.getElementById("meal_row").style.display = "none";
    document.getElementById("banner_row").style.display = "none";
    document.getElementById("meal_favorite").style.display = "none";
    var meal_row_div = document.getElementById("meal_desc");
    meal_row_div.style.display="block";
    var previous_element = meal_row_div.lastElementChild

    if (previous_element) {
        meal_row_div.removeChild(previous_element);
    }
    const div = document.createElement('div');

    div.className = 'col';

    div.innerHTML =
        `<div class="card">
        <h5 class="card-header">${meals[event_id].name}</h5>
        <div class="card-body">
        <img class="card-img-top" src=${meals[event_id].image} style="width: 40rem; alt="Card image cap">
        <h5 class="card-title">About Meal</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a onclick={likeMeal(this.id)} id=l${event_id} class="btn btn-primary like-button" 
        style="background-color: ${getBgColourUsingId(event_id)}" value=${event_id} > Like</a>
        </div>
        </div>`;

    meal_row_div.appendChild(div);
    var search_element = document.getElementById("dynamic_search");
    search_element.style.display = "none";

}



function likeMeal(event_id) {
    console.log(event_id, "event id")
    var local_value = get_localstorage(event_id);
    bg_color = "#c02332"
    if (!local_value) {
        set_localstorage(event_id, true);
        window.document.getElementById(event_id).style.background = bg_color;

    } else {

        if (JSON.parse(local_value) === true) {
            bg_color = "white"
            set_localstorage(event_id, false);
        } else {
            set_localstorage(event_id, true);
        }

    }

    window.document.getElementById(event_id).style.background = bg_color;


}


function favoriteFood() {
    document.getElementById("meal_row").style.display = "none";
    document.getElementById("banner_row").style.display = "none";
    document.getElementById("meal_desc").style.display = "none";
    var meal_row_div = document.getElementById("meal_favorite");
    meal_row_div.style.display="flex";
    for (meal in meals) {
        var value = window.localStorage.getItem(`l${meal}`);
        if (JSON.parse(value) === true) {
            const div = document.createElement('div');
            div.className = 'col';
            div.id = "child_meal_rows";

            div.innerHTML =
                `<div class="card" style="width: 21rem;">
        <img class="card-img-top" src=${meals[meal].image} alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${meals[meal].name}</h5>
    
            <a onclick={viewProduct(this.id)} id=${meal} class="btn btn-primary" value=${meal} >View desc</a>
            <a onclick={likeMeal(this.id)} id=l${meal} class="btn btn-primary like-button${meal}"
             style = "background-color : ${getBgColourUsingId(meal)};" value=${meal} > Like</a>
        </div>`
                ;

            meal_row_div.appendChild(div);
        }
    }


}



function dynamicSearchClick(){
    var keyword=document.getElementById("dynamic_search_input").value;
    var search_element = document.getElementById("dynamic_search");
    search_element.style.display = "block";
    console.log("dsfsdg")
    for (meal in meals) {
        var name = meals[meal].name.toLowerCase()
        
        if (name.includes(keyword) == true && keyword.length > 0) {
            document.getElementById(`s${meal}`).style.display = "block";
        } else {
            document.getElementById(`s${meal}`).style.display = "none";
        }
    }

    
}

function searchViewProduct (event_id) {
    event_id = event_id.split("s")[1]
    return viewProduct(event_id)
}




function construct_rows() {

    var meal_row_div = document.getElementById("meal_row");
    var search_element = document.getElementById("dynamic_search");

    for (meal in meals) {
        const div = document.createElement('div');
        const search_div = document.createElement("div")
        div.className = 'col';
        div.id = "child_meal_rows";

        div.innerHTML =
            `<div class="card" style="width: 21rem;">
        <img class="card-img-top" src=${meals[meal].image} alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${meals[meal].name}</h5>
    
            <a onclick={viewProduct(this.id)} id=${meal} class="btn btn-primary" value=${meal} >View desc</a>
            <a onclick={likeMeal(this.id)} id=l${meal} class="btn btn-seconday"
             style = "background-color : ${getBgColourUsingId(meal)};" value=${meal} > Like </a>
        </div>`;

        meal_row_div.appendChild(div);

        search_div.innerHTML = `<div id=s${meal} onclick={searchViewProduct(this.id)} style="display : none" > <h3>${meals[meal].name}</h3>
        <hr></div>`;

        search_element.appendChild(search_div);


    }

    // search_element.style.display = "none";


}



construct_rows();