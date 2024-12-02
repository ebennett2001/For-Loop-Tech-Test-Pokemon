
let currentPokeNum = 1;  // This will be updated as we want new Pokemon
let currentPage = 0;     // Used to flick through pages


// Build functions to fetch data

// Function for next and back buttons 
async function fetchPokeInfoByNum(PokeNum, button){

    const url = `https://pokeapi.co/api/v2/pokemon/${PokeNum}/`;
    const response = await fetch(url);                              //fetch data from PokeAPI

    if(!response.ok){
        throw new Error("Could not fetch resource");                //throw error if data not found, i.e: pokedex number not compatible
    }

    const data = await response.json();                             // convert fetch response to json
    const pokeSprite = data.sprites.front_default;                  // fetch sprite data 
    console.log(data.types);

    button.innerHTML = `<img src="${pokeSprite}" alt="Pokemon Sprite" style="width: 100px; height: 100px;">`;
    button.append(`Name: ${data.name.charAt(0).toUpperCase()}${data.name.slice(1)}. 
                   Dex Number: #${data.id}. 
                   Type 1: ${data.types[0].type.name}.`);
    if(data.types[1].type.name !== undefined){

        button.append(` Type 2: ${data.types[1].type.name}.`)

    };
    
                            
    //console.log(data);                                       //see pokedex number of pokemon in console

}

// Function for searching by name 
async function fetchPokeInfoByName(){

    try{

        const PokeName = document.getElementById("PokeName").value.toLowerCase().replace(" ", "-"); // pokemon name in search bar
        
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokeName}`);              // fetch pokemon by name 
        
        if(!response.ok){
            throw new Error("Could not fetch resource");            // throw error if name invalid
        }

        const data = await response.json();                         // store response as json
        const pokeSprite = data.sprites.front_default;              // get sprite

    
        currentPokeNum = data.id;
        console.log(data.id);

        if(document.getElementById("PokeName").value === Number){
            fetchPokeInfoByNum(document.getElementById("PokeName").value);  // if number used instead of name, call function to get info by number 
        }
        const btn13 = document.getElementById("specBtn");

        btn13.innerHTML = `<img src="${pokeSprite}" alt="Pokemon Sprite" style="width: 100px; height: 100px;">`;
        btn13.append(`Name: ${data.name.charAt(0).toUpperCase()}${data.name.slice(1)}. 
                   Dex Number: #${data.id}. 
                   Type 1: ${data.types[0].type.name}.`);
        if(data.types[1].type.name !== undefined){

        btn13.append(` Type 2: ${data.types[1].type.name}.`)

    };
        
    }
    catch(error){
        console.error(error)
    }

}


// Event listeners for buttons


document.getElementById("pageNext")
        .addEventListener('click', () => {

            if(currentPage !== (Math.floor(1024/12))){
                currentPage++;
                const pageCount = document.getElementById("pageCounter");
                pageCount.textContent = `Page Number: ${currentPage+1}. (Mons ${currentPage*12 + 1} - ${currentPage*12 + 12})`;
                
                let buttons = document.querySelectorAll('.monBtns');
                buttons.forEach(button => {
                    button.innerHTML = ``;
                });
                
            };

        });

document.getElementById("pageBack")
        .addEventListener('click', () => {

            if(currentPage !== 0){
                currentPage--;  
                const pageCount = document.getElementById("pageCounter");
                pageCount.textContent = `Page Number: ${currentPage+1}. (Mons ${currentPage*12 + 1} - ${currentPage*12 + 12})`;
                
                let buttons = document.querySelectorAll('.monBtns');
                buttons.forEach(button => {
                    button.innerHTML = ``;
                });
            };

        });

// Event listener to cycle through pokemon with arrow keys 

document.addEventListener("keydown", event => {

if(event.key.startsWith("Enter")){
    fetchPokeInfoByName();
}                                       // allows us to search for pokemon with enter

});

let buttons = document.querySelectorAll('.monBtns');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        
        const pokeNum = Number(button.dataset.pokenum) + (12 * currentPage); // Fetch the Pokémon number from the "data-pokenum" attribute
        fetchPokeInfoByNum(pokeNum, button);                                         // Call the function with the Pokémon number
    
    });
});


   
        
