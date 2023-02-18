const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input_search = document.querySelector('.input_search');
const getRandom = document.querySelector('.random');
const getPrevious = document.querySelector('.btn-prev');
const getNext = document.querySelector('.btn-next');
const loadingAudio = '../audio/loading.mp3';
pokemonName.innerHTML = '';
pokemonNumber.innerHTML = '';
pokemonImage.src = 'https://www.gifcen.com/wp-content/uploads/2022/10/charizard-gif.gif'

let searchPokemon = 1
var audio
const fetchPokemon = async(pokemon) => {
    pokemonImage.src = 'https://thumbs.gfycat.com/DefenselessPoisedArizonaalligatorlizard-max-1mb.gif'
    pokemonName.innerHTML = 'Loading ...'
    pokemonNumber.innerHTML = '-'
    audio = new Audio(loadingAudio);
    audio.play();
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
    const data =  await APIResponse.json();
    return data;
    }
    else{

    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    if(data){
    console.log(data);
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    imageUrl = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id
    if(imageUrl == 'null')
    {
        pokemonImage.src = imageUrl
    }
    else{
        pokemonImage.src = data['sprites']['front_default'];
    }
    input_search.value  = ''
    }
    else{
        pokemonName.innerHTML = 'Not Found'; 
        pokemonNumber.innerHTML = '-'
        pokemonImage.src = 'https://i.pinimg.com/originals/8b/22/c2/8b22c2b446f9f539693c305d7e599ef6.gif';
        input_search.value  = ''
    }
    audio.pause();

}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    renderPokemon(input_search.value);
})

const randomNumber = ()=>{
    var randNum =  Math.floor(Math.random() * 1008) + 1;
     return randNum
}

getRandom.addEventListener('click',() =>{
   rannum =  randomNumber()
   console.log(rannum);
   renderPokemon(rannum)
})

getPrevious.addEventListener('click',() =>{
    if(searchPokemon > 1)
    {
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
    }
})

getNext.addEventListener('click',() =>{
    if(searchPokemon <= 1008)
    searchPokemon += 1;
    renderPokemon(searchPokemon)
})

renderPokemon(1)