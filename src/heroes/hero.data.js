const storageKey = 'heroes';

function updateStorage(heroes){
    localStorage.setItem(storageKey, JSON.stringify(heroes));
}

(async function initStorage(){
    const storage = localStorage.getItem(storageKey);
    if(!storage){
        const response = await fetch('src/heroes/heroes.json');
        const heroes = await response.json();
        updateStorage(heroes);
    }
})();

const idComparator = (a, b) => a.id - b.id;


export async function getAll(){
    const storage = localStorage.getItem(storageKey)
    if(!storage){
        await initStorage();
    }
    return JSON.parse(storage).sort(idComparator);
}    

export async function findById(id){
    const heroes = await getAll();
    return [...heroes].find(h => +h.id === +id);
}

function getMaxId(heroes){
    return !!heroes && heroes.length > 0 ? heroes.sort(idComparator)[heroes.length-1].id : 0
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