const api = `https://rickandmortyapi.com/api/character?name=`;


function search() {
    const conteudoPrincipal = document.getElementById('conteudo-principal');
    conteudoPrincipal.innerHTML = '';

    let inputSearch = document.getElementById('input-search');



    fetch(api + inputSearch.value)
        .then(resposta => {
            return resposta.json();
        })
        .then(async function (json) {

            const resultPages = json.info.pages;


            const resultQuantity = json.info.count;

            const rows = resultQuantity / 3;




            const conteudoPrincipal = document.getElementById('conteudo-principal');

            const arrayResults = await createArray(inputSearch, resultPages, json.results);
            console.log('arrayResults', arrayResults);

            let count = 0;

            for (let i = 0; i < rows; i++) {
                const section = document.createElement('section');
                section.classList.add('d-flex', 'flex-row', 'justify-content-around', 'mt-4');
                for (let k = 0; k < 3; k++) {
                    if(count <= arrayResults.length -1){
                     let card = document.createElement('div');
                     card.classList.add('cards');
                     let imgContainer = document.createElement('div');
                     let imgCard = document.createElement('img');
                     imgCard.src = arrayResults[count].image;
                     imgContainer.appendChild(imgCard);
                     let infoContainer = document.createElement('div');
                     infoContainer.classList.add('d-flex', 'text-center', 'flex-column')
                     let nameChar = document.createElement('h4');
                     let speciesChar = document.createElement('h5');
                     let statusChar = document.createElement('h5');
                     let speciesSpan = document.createElement('span');
                     let statusSpan= document.createElement('span');
                     speciesSpan.innerHTML = arrayResults[count].species;
                     statusSpan.innerHTML = arrayResults[count].status;
                    if(arrayResults[count].name.length > 14){
                        arrayResults[count].name = arrayResults[count].name.substring(0, 14) + '...';
                    }
                     nameChar.innerHTML =  'Nome: ' + arrayResults[count].name;
                     speciesChar.innerHTML = 'Espécie: ';
                     statusChar.innerHTML = 'Status: ';
                     speciesChar.appendChild(speciesSpan);
                     statusChar.appendChild(statusSpan);
                     infoContainer.appendChild(nameChar);
                     infoContainer.appendChild(speciesChar);
                     infoContainer.appendChild(statusChar);
                     card.appendChild(imgContainer);
                     card.appendChild(infoContainer);
                     section.appendChild(card);
                     if(arrayResults[count].species == 'Human'){
                        speciesSpan.style.color='blue';
                     } else{
                        speciesSpan.style.color='yellow';
                     }

                     switch(arrayResults[count].status){
                        case 'Alive':{
                            statusSpan.style.color='green';
                            break; 
                        };
                        case 'Dead':{
                            statusSpan.style.color='red';
                            break;
                        };
                        default :{
                            statusSpan.style.color='orange';
                        }
                        
                     }
                    count++;
                    }
                    
                }
                conteudoPrincipal.appendChild(section);

            }

        })
        .catch(erro => {
            console.log(erro);
            conteudoPrincipal.innerHTML = 'Not found';
        })


}


async function createArray(banana, maca, uva) {
    let newArray = uva;
    for (let i = 2; i <= maca; i++) {
        await fetch(api + banana.value + '&page=' + i)
            .then(resposta => {
                return resposta.json();
            })
            .then(function (json) {
                newArray = newArray.concat(json.results);
            })
    }
    console.log('dentro da função', newArray);
    return newArray;
}



// section.innerHTML += `
// <div class='cards'>
// <div>
// <img src=` + arrayResults[count].image + `>
// </div>
// <div class='d-flex text-center flex-column'>
// <h3>Name:<strong> ` + arrayResults[count].name + ` </strong></h3>
// <h4><span>Espécie: ` + arrayResults[count].species + ` </span></h4>
// <h4>Status:<i> ` + arrayResults[count].status + ` </i></h4>
// </div>
// </div>
// `