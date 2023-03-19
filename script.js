
// All meals details
var meals = {
    1: {
        id: 1,
        name: "Chicken briyani",
        image: "./images/chicken.webp",
        desc: "Very delicious chicken briyani at affordable price",
        like: false

    },
    2: {
        id: 2,
        name: "Mutton briyani",
        image: "./images/muttonbriyani.jpg",
        desc: "Very delicious mutton briyani at affordable price",
        like: false

    },
    3: {
        id: 3,
        name: "Prawn briyani",
        image: "./images/prawn.jpg",
        desc: "Very delicious prawn briyani at affordable price",
        like: false

    },
    4: {
        id: 4,
        name: "Idly",
        image: "./images/idly.jpeg",
        desc: "Delicious soft idly",
        like: false

    },
    5: {
        id: 5,
        name: "Dosa",
        image: "./images/dosa.jpg",
        desc: "Crispy plain delicious roast cooked with ghee served with chutney and sambhar.",
        like: false

    },
    6: {
        id: 6,
        name: "Pongal",
        image: "./images/pongalnew.jpg",
        desc: "Very delicious ghee pongal",
        like: false

    },
}


// To set local staorage value
function set_localstorage(event_id, values) {
    return window.localStorage.setItem(event_id, values);

}


// To get local staorage value
function get_localstorage(event_id) {

    return window.localStorage.getItem(event_id);

}


// To fetch favorite meal color
function getBgColourUsingId(meal_id) {
    var local_value = get_localstorage(`l${meal_id}`);

    if (!local_value) {
        var color = "white";

    } else {
        var color = JSON.parse(local_value) === true ? "pink" : "white";

    }

    return color

}



// To view particular meal
function viewProduct(event_id) {

    document.getElementById("meal_row").style.display = "none";
    document.getElementById("banner_row").style.display = "none";
    document.getElementById("meal_favorite").style.display = "none";
    var meal_row_div = document.getElementById("meal_desc");
    meal_row_div.style.display = "block";
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
        <p class="card-text">${meals[event_id].desc}</p>
        <a onclick={descLikeMeal(this.id)} id=l${event_id} class="btn btn-primary" 
        style="background-color: ${getBgColourUsingId(event_id)}" value=${event_id} > Like</a>
        </div>
        </div>`;

    meal_row_div.appendChild(div);
    var search_element = document.getElementById("dynamic_search");
    search_element.style.display = "none";

}


// To add favorite meal
function likeMeal(event_id) {
    var local_value = get_localstorage(event_id);
    bg_color = "pink"
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
    var r = document.getElementById(event_id).style.background = bg_color;


}


// Add or Remove like from description page
function descLikeMeal(event_id) {
    likeMeal(event_id)

    event_id = event_id.split("l")[1]

    viewProduct(event_id)

};

// Add or Remove like from favorite meal page
function favLikeMeal(event_id) {
    likeMeal(event_id);
    favoriteFood()
};

function favoriteFood() {
    document.getElementById("meal_row").style.display = "none";
    document.getElementById("banner_row").style.display = "none";
    document.getElementById("meal_desc").style.display = "none";
    var meal_row_div = document.getElementById("meal_favorite");
    meal_row_div.style.display = "flex";

    while (meal_row_div.firstChild) {
        meal_row_div.removeChild(meal_row_div.lastChild);
    };

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
            <a onclick={favLikeMeal(this.id)} id=l${meal} class="btn btn-secondary"
             style = "background-color : ${getBgColourUsingId(meal)};" value=${meal} > Like</a>
        </div>`
                ;

            meal_row_div.appendChild(div);
        }
    }


}


// To featch meals using search bar
function dynamicSearchClick() {
    var keyword = document.getElementById("dynamic_search_input").value;
    var search_element = document.getElementById("dynamic_search");
    search_element.style.display = "block";
    for (meal in meals) {
        var name = meals[meal].name.toLowerCase()

        if (name.includes(keyword) == true && keyword.length > 0) {
            document.getElementById(`s${meal}`).style.display = "block";
        } else {
            document.getElementById(`s${meal}`).style.display = "none";
        }
    }


}

// To view product from search results
function searchViewProduct(event_id) {
    event_id = event_id.split("s")[1]
    return viewProduct(event_id)
}



// This function will initilize all our elemts
function initializeRows() {

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
            <a onclick={likeMeal(this.id)} id=l${meal} class="btn btn-secondary"
             style = "background-color : ${getBgColourUsingId(meal)};" value=${meal} > Like </a>
        </div>`;

        meal_row_div.appendChild(div);

        search_div.innerHTML = `<div id=s${meal} 
        onclick={searchViewProduct(this.id)} style="display : none;" > <h3>${meals[meal].name}</h3>
        <hr></div>`;

        search_element.appendChild(search_div);


    }

}



initializeRows();