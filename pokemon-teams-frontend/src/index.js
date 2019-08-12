    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`

    const cardContainer = document.querySelector("main")

    document.addEventListener("DOMContentLoaded", () => {





        fetch(TRAINERS_URL)
            .then(response => response.json())
            .then(data => {
                data.forEach(trainer => {
                    cardContainer.insertAdjacentHTML("beforeend",
                        `<div class="card" data-id=${trainer.id}> 
                    <p> ${trainer.name} </p> 
                    <button class="add" data-trainer-id=${trainer.id}> Add Pokemon </button> 
                    <ul id = "list-${trainer.id}">     
                    </ul>
                    </div>`
                    ) // end insertAdjacentHTML for trainers
                    trainer.pokemons.forEach(pokemon => {
                        let trainers_pokemons_list = document.getElementById(`list-${trainer.id}`)
                        trainers_pokemons_list.insertAdjacentHTML("beforeend",
                            `<li> ${pokemon.nickname} (${pokemon.species}) <button class="release"
                    data-pokemon-id="${pokemon.id}" > Release </button></li>`

                        ) // end inserAdjacentHTML for pokemons
                    }) // end trainer.pokemons.forEach
                }) // end date.forEach
            }) // end second then
        ; // end fetch

        // DELETE pokemon
        cardContainer.addEventListener("click", function (e) {
            let deleteBtn = e.target.className
            if (deleteBtn === "release") {
                let pokemonId = e.target.dataset.pokemonId
                fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
                        method: "delete"
                    })
                    .then(response => response.json()
                        .then(pokemon => {
                            allReleaseBtns = document.querySelectorAll(".release")
                            allReleaseBtns.forEach(button => {
                                if (button.dataset.pokemonId === pokemonId) {
                                    button.parentElement.remove()
                                }
                            })
                        }))
            }
        })

        // ADD pokemon
        cardContainer.addEventListener("click", function (e) {
            let addBtn = e.target.className
            if (addBtn === "add") {
                let trainerId = e.target.dataset.trainerId
                console.log(trainerId)
                fetch(`http://localhost:3000/pokemons`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            "trainer_id": trainerId
                        })
                    })
                    .then(response => response.json())
                    .then(pokemon => {
                        const trainers_pokemons_list = document.getElementById(`list-${trainerId}`)
                        trainers_pokemons_list.insertAdjacentHTML("beforeend",
                            `<li> ${pokemon.nickname} (${pokemon.species}) <button class="release"
                            data-pokemon-id="${pokemon.id}" > Release </button></li>`)
                    })
            }
        })










    }) //end DOMContentLoaded event listener