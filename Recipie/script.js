const meals = document.querySelector("#meals");
const recipie = document.getElementById("clicks");
const aboutMeal = document.querySelector(".aboutmeal");
const box=document.querySelector("#box");

function clicks(a) {
    console.log(a);
    const p = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a}`)
    p.then(response => {
        return response.json()
    })
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                <div class="donut foods" id="deleteME${meal.idMeal + '1'}">
                <p id="line"><button type="button" id="close" onclick="deleteME(${meal.idMeal})">&times;</button></p>
                <h3 id="headers">${meal.strMeal}</h3>
                <p id="aboutDish">${meal.strInstructions}
                </p>
                <a href="${meal.strYoutube}" target="_blank"><img src="${meal.strMealThumb}" alt="" srcset="" id="picc"></a><br>
                <a href="${meal.strYoutube}" target="_blank" id="youtube">Watch Video</a>
                </div>`
                    aboutMeal.innerHTML = html;

                })
            }
        })
}

function deleteME(id) {
    const recipie = "#deleteME" + id + "1";
    console.log(recipie)
    document.querySelector(recipie).remove();
}



function searchMe() {
    let searchedInput = "";
    searchedInput = document.getElementById("searcher").value;

    const p = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedInput}`)
    p.then(response => {
        return response.json()
    })
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach((meal, i) => {
                    if ((i + 1) % 3 != 0) {
                        html += `
                        <div class="card">
                        <div class="pic">
                        <img src="${meal.strMealThumb}" alt="" srcset="" id="image">
                        </div>
                        <div id="info">
                        <h3 id="name">${meal.strMeal}</h3>
                        <button id="link" value="${meal.strMeal}" onclick="clicks(${meal.idMeal})">Get Recipie</button>
                        </div>
                    </div>`
                        box.innerHTMl += html;
                    }
                    else {
                        html += `
                                <br>
                                <div class="card">
                                <div class="pic">
                                <img src="${meal.strMealThumb}" alt="" srcset="" id="image">
                                </div>
                                <div id="info">
                                <h3 id="name">${meal.strMeal}</h3>
                                <button id="link" value="${meal.strMeal}" onclick="clicks(${meal.idMeal})">Get Recipie</button>
                                </div>
                                </div> `
                    box.innerHTML = html;
                        
                    }
                })
            }
        })
        .catch(err => console.log(err));
}

