

let myApp = document.getElementById('myApp')

loadingScreen()
showCharacterPage()

function loadingScreen() {
    myApp.innerHTML = "Loading..."
};

function showCharacterPage() {
    fetch("https://api.disneyapi.dev/characters/4703")
        .then((response) => { return response.json() })
        .then((data) => {

            let films = ""
            data.films.map((film) => {
                films += `${film}, `
            })

            myApp.innerHTML = `<h2>${data.name}</h2><img src="${data.imageUrl}"><h2>Films</h2><p>${films}</p>`
        })
        .catch((error) => {
            console.error(error)
        })
};

let myBar = document.getElementById('myBar')
let showAllButton = document.getElementById('showAllButton')

showAllButton.addEventListener('click', () => {
    loadingScreen()
    fetch("https://api.disneyapi.dev/characters?page=1")
        .then((response) => { return response.json() })
        .then((data) => {
            myApp.innerHTML = ''

            data.data.map((character) => {
                myApp.innerHTML += `<figure class="characterFigure"><h2>${character.name}</h2><img src="${character.imageUrl}"></figure>`
            })

            let myPage = 1

            if (myBar.childElementCount > 1) {
                return
            } else {
                setupNavButtons(myPage)
            }



        })
        .catch((error) => {
            console.error(error)
        })
})



function setupNavButtons(pageNumber) {

    let lastPage = document.createElement('button')
    lastPage.innerHTML = "Forrige"
    lastPage.addEventListener('click', () => {
        if (pageNumber == 1) {
            return
        } else {
            pageNumber--
            switchPage(pageNumber)
        }
    })

    let nextPage = document.createElement('button')
    nextPage.innerHTML = "Næste"
    nextPage.addEventListener('click', () => {
        if (pageNumber == 149) {
            return
        } else {
            pageNumber++
            switchPage(pageNumber)

        }
    })
    myBar.appendChild(lastPage)
    myBar.appendChild(nextPage)

};


function switchPage(pageNumber) {
    fetch(`https://api.disneyapi.dev/characters?page=${pageNumber}`)
        .then((response) => { return response.json() })
        .then((data) => {
            myApp.innerHTML = ''

            data.data.map((character) => {
                myApp.innerHTML += `<h2>${character.name}</h2><img src="${character.imageUrl}">`
            })


        })
        .catch((error) => {
            console.error(error)
        })
}



let mySearchElement = document.getElementById('mySearch')
let mySearchButton = document.getElementById('mySearchButton')

mySearchButton.addEventListener('click', () => {
    console.log(mySearchElement.value);
    fetch(`https://api.disneyapi.dev/character?name=${mySearchElement.value}`)
    .then((response) => { return response.json() })
    .then((data) => {
        myApp.innerHTML = ''
        data.data.map((character) => {
            myApp.innerHTML += `<h2>${character.name}</h2><img src="${character.imageUrl}">`
        })
    })
    .catch((error) => {
        console.error(error)
    })
})









// Til detaljeret view

// if (character.films.length > 0 && character.tvShows.length > 0) {
//     myApp.innerHTML += `<h2>${character.name}</h2><img src="${character.imageUrl}"><h2>Films:</h2><p>${character.films}</p><h2>TV shows:</h2><p>${character.tvShows}</p>`
// } else if (character.films.length > 0) {
//     myApp.innerHTML += `<h2>${character.name}</h2><img src="${character.imageUrl}"><h2>Films:</h2><p>${character.films}</p>`
// } else if (character.tvShows.length > 0) {
//     myApp.innerHTML += `<h2>${character.name}</h2><img src="${character.imageUrl}"><h2>TV shows:</h2><p>${character.tvShows}</p>`
// }
// else {
//     myApp.innerHTML += `<h2>${character.name}</h2><img src="${character.imageUrl}">`
// }