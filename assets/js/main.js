

let myApp = document.getElementById('myApp')
let myPage = 1

loadingScreen()
showCharacterPage(4703)

function loadingScreen() {
    myApp.innerHTML = "Loading..."
};







function showCharacterPage(characterId, sender) {
    fetch(`https://api.disneyapi.dev/characters/${characterId}`)
        .then((response) => { return response.json() })
        .then((character) => {

            if (character.films.length > 0 && character.tvShows.length > 0) {
                myApp.innerHTML = `<h2>${character.name}</h2><img src="${character.imageUrl}"><h2>Films:</h2><p>${character.films}</p><h2>TV shows:</h2><p>${character.tvShows}</p>`
            } else if (character.films.length > 0) {
                myApp.innerHTML = `<h2>${character.name}</h2><img src="${character.imageUrl}"><h2>Films:</h2><p>${character.films}</p>`
            } else if (character.tvShows.length > 0) {
                myApp.innerHTML = `<h2>${character.name}</h2><img src="${character.imageUrl}"><h2>TV shows:</h2><p>${character.tvShows}</p>`
            }
            else {
                myApp.innerHTML = `<h2>${character.name}</h2><img src="${character.imageUrl}">`
            }
            switch (sender) {
                case 'showAll':
                    createBackButton()
                    break;
                case 'search':
                    createBackButton2()
                    break;
                default:
                    break;
            }
        })
        .catch((error) => {
            console.error(error)
        })



};


function createBackButton() {
    let backButton = document.createElement('button')
    backButton.innerHTML = "Tilbage"
    myApp.prepend(backButton)
    backButton.addEventListener('click', () => {
        switchPage()
    })
};





let myBar = document.getElementById('myBar')
let showAllButton = document.getElementById('showAllButton')

showAllButton.addEventListener('click', () => {
    loadingScreen()
    fetch(`https://api.disneyapi.dev/characters?page=${myPage}`)
        .then((response) => { return response.json() })
        .then((data) => {
            myApp.innerHTML = ''
            console.log(data);



            data.data.map((character) => {
                let characterFigure = document.createElement('figure')
                characterFigure.innerHTML = `<h2>${character.name}</h2><img src="${character.imageUrl}">`
                myApp.appendChild(characterFigure)

                characterFigure.addEventListener('click', () => {
                    showCharacterPage(character._id, 'showAll')
                })
            })





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
            console.log(pageNumber);
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
            console.log(pageNumber);


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
                let characterFigure = document.createElement('figure')
                characterFigure.innerHTML = `<h2>${character.name}</h2><img src="${character.imageUrl}">`
                myApp.appendChild(characterFigure)

                characterFigure.addEventListener('click', () => {
                    showCharacterPage(character._id, 'showAll')
                })
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
                myApp.innerHTML += `<figure class="characterFigure" id="${character._id}"><h2>${character.name}</h2><img src="${character.imageUrl}"></figure>`
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