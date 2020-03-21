
async function fetchHeroes(){
    const response = await fetch('src/heroes.json');
    return await response.json();
}


export async function getAll(){
    if(storedHeroes.length === 0){
        storedHeroes = await fetchHeroes();
    }
    return [...storedHeroes, ...tempHeroes];
}

export async function findById(id){
    const heroes = await getAll();
    return [...heroes].find(h => h.id === id);
}

export async function save(hero){
    if(!hero.id){
        const allHeroes = [...storedHeroes, ...tempHeroes];
        const maxTempId = allHeroes.length > 0 ? allHeroes.sort((a, b) => b.id - a.id)[0].id : 1;
        hero.id = +maxTempId + 1;
        tempHeroes = [...tempHeroes, {...hero}]
    }else{
        storedHeroes = storedHeroes.map(h => {
            if(h.id === hero.id){
                return {...hero};
            }else{
                return h;
            }
        })
    }
   
    
    return hero;
}



let storedHeroes = [];
let tempHeroes = [];  