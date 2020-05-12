const storageKey = 'heroes';

function updateStorage(heroes){
    localStorage.setItem(storageKey, JSON.stringify(heroes));
}

function clearStorage(){
    localStorage.clear(storageKey);
}

async function initStorage(){
    const storage = localStorage.getItem(storageKey);
    if(!storage){
        const response = await fetch('src/heroes/heroes.json');
        const heroes = await response.json();
        updateStorage(heroes);
    }
};
initStorage();

const idComparatorAsc = (a, b) => a.id - b.id;
const idComparatorDesc = (a, b) => b.id - a.id;


export async function getAll(){
    if(!localStorage.getItem(storageKey)){
        await initStorage();
    }
    const storage = localStorage.getItem(storageKey)

    return JSON.parse(storage).sort(idComparatorDesc);
}    

export async function findById(id){
    const heroes = await getAll();
    return [...heroes].find(h => +h.id === +id);
}

function getMaxId(heroes){
    return !!heroes && heroes.length > 0 ? heroes.sort(idComparatorAsc)[heroes.length-1].id : 0
}

export async function save(hero){
    const heroes = await getAll();
    let updatedHeroes;
    if(!hero.id){
        hero.id = +getMaxId(heroes) + 1;
        updatedHeroes = [...heroes, hero];
    }else{
        updatedHeroes = heroes.map(h => ( +h.id === +hero.id ? {...hero} : h))
    }

    updateStorage(updatedHeroes);
    return hero;
}

export async function reset(){
    clearStorage();
}