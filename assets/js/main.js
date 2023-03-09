

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
            console.log(data);

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


let showAllButton = document.getElementById('showAllButton')

showAllButton.addEventListener('click', () => {
    loadingScreen()
    fetch("https://api.disneyapi.dev/characters")
        .then((response) => { return response.json() })
        .then((data) => {
            console.log(data.data);


            myApp.innerHTML = ''

            data.data.map((character) => {


                if (character.films.length > 0 && character.tvShows.length > 0) {
                    myApp.innerHTML += `<h2>${character.name}</h2><img src="${character.imageUrl}"><h2>Films:</h2><p>${character.films}</p><h2>TV shows:</h2><p>${character.tvShows}</p>`
                } else if (character.films.length > 0) {
                    myApp.innerHTML += `<h2>${character.name}</h2><img src="${character.imageUrl}"><h2>Films:</h2><p>${character.films}</p>`
                } else if (character.tvShows.length > 0) {
                    myApp.innerHTML += `<h2>${character.name}</h2><img src="${character.imageUrl}"><h2>TV shows:</h2><p>${character.tvShows}</p>`
                }
                else {
                    myApp.innerHTML += `<h2>${character.name}</h2><img src="${character.imageUrl}">`
                }



                // myApp.innerHTML += `<h2>${character.name}</h2><img src="${character.imageUrl}"><h2>Films</h2><p>${cFilms}</p>`
            })


        })
        .catch((error) => {
            console.error(error)
        })

    myApp.innerHTML
})