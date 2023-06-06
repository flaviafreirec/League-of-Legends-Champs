let currentLanguage = 'en_US'
let endpoint = `http://ddragon.leagueoflegends.com/cdn/12.6.1/data/${currentLanguage}/champion.json`
const modal = document.getElementById('modal')
let currentPage = 1;
const cardsPerPage = 10;

const nextButton = document.getElementById('next-button')
const backButton = document.getElementById('back-button')
const portugueseButton = document.getElementById('portuguese-button');




 function toggleLanguage() {
    event.preventDefault();
    portugueseButton.innerText = currentLanguage
    currentLanguage = currentLanguage === 'en_US' ? 'pt_BR' : 'en_US';
    endpoint = `http://ddragon.leagueoflegends.com/cdn/12.6.1/data/${currentLanguage}/champion.json`
    console.log(currentLanguage)
    loadCharacters(endpoint, 1)
    buttonVisibility()
    
}

portugueseButton.onclick = toggleLanguage;



window.onload = async () => {
    try {
        toggleLanguage()
       await loadCharacters(endpoint, 1);
       buttonVisibility();
    } catch(error) {
        console.log('Erro ao carregar cards');
    }
    

     nextButton.addEventListener('click', loadNextPage)
     backButton.addEventListener('click', loadBackPage)
};


async function loadCharacters(urlEndpoint, page = 1) {
    
    const mainContent = document.getElementById('main-content')
    
    mainContent.innerHTML = '';     


    try {

        const response = await fetch(urlEndpoint);
        const responseJson = await response.json();
        const {data} = await responseJson
        let caracteresIndesejados = /[.,'&]/g;
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = page * cardsPerPage
        
          
        let count = 0;
        for (let item in data) {
            count++;
            if(count > startIndex && count <= endIndex) {
                const card = document.createElement('div')
                
                const imgNames = data[item].name.split(' ')

                for(let i=0; i < imgNames.length; i++) {
                    imgNames[i] = imgNames[i].charAt(0).toUpperCase() + imgNames[i].slice(1) 
                    imgNames[i] = imgNames[i].replace(caracteresIndesejados, "")

                    if(imgNames[i] === 'ChoGath') {
                        imgNames[i] = 'Chogath'
                    }

                    if(imgNames[i] === 'KaiSa') {
                        imgNames[i] = 'Kaisa'
                    }

                    if(imgNames[i].includes('Willump')) {
                        imgNames[i] = ''                
                    }               

                    if(imgNames[i] === 'Wukong') {
                        imgNames[i] = 'MonkeyKing'
                    }

                    if(imgNames[i] === 'LeBlanc') {
                        imgNames[i] = 'Leblanc'
                    }

                    if(imgNames[i] === 'KhaZix') {
                        imgNames[i] = 'Khazix'
                    }

                    if(imgNames[i].includes('Glasc')) {
                        imgNames[i] = ''
                    }

                    if(imgNames[i] === 'VelKoz') {
                        imgNames[i] = 'Velkoz'
                    }
                    
                    
                }          

                
                
                const finalName = imgNames.join('')
                
            

                card.style.backgroundImage = `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${finalName}_0.jpg')`
                card.className = "cards"

                const characterNameBg = document.createElement('div')
                characterNameBg.className = "character-name-bg"

                const characterName = document.createElement('span')
                characterName.className = "character-name"
                characterName.innerText = `${data[item].name}`

                characterNameBg.appendChild(characterName)
                card.appendChild(characterNameBg)

                card.onclick = () => {
                    modal.style.visibility = 'visible';

                    const modalContent = document.getElementById('modal-content')
                    modalContent.innerHTML = ''

                    const characterImg = document.createElement("div")
                    characterImg.style.backgroundImage = `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${finalName}_0.jpg')`
                    characterImg.className = "character-image"

                    const name = document.createElement('span')
                    name.className = 'character-details'
                    name.innerHTML = `${data[item].name}`

                    const title = document.createElement('span')
                    title.className = 'character-details'
                    title.innerHTML = `${data[item].title}`

                    const tags = document.createElement('span')
                    tags.className = 'character-details'
                    tags.innerHTML = data[item].tags.join(', ')

                    modalContent.appendChild(characterImg)
                    modalContent.appendChild(name)
                    modalContent.appendChild(title)
                    modalContent.appendChild(tags)
                }

                mainContent.appendChild(card)

            
        }        }
            
        
 

        //endpoint = urlEndpoint

    } catch (error) {
        console.log('erro ao carregar os personagens')
    }
}

 async function loadNextPage() {
    currentPage++
    loadCharacters(endpoint, currentPage)
    buttonVisibility()
    
 }


 async function loadBackPage() {
    
    if(currentPage > 1) {
        
        currentPage--;
        loadCharacters(endpoint, currentPage);
        buttonVisibility()
    } else {
        backButton.style.visibility = 'hidden'
    }


 }

 function buttonVisibility() {
    if (currentPage > 1) {
        backButton.style.visibility = 'visible';
    } else {
        backButton.style.visibility = 'hidden';
    }
 }

 function hideModal() {
    
    modal.style.visibility = 'hidden'
 }

