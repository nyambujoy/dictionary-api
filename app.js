const searchBtn = document.querySelector('.searchBtn')
const container = document.querySelector('.container')
const sound = document.querySelector('.sound')

function createTopDiv() {
    displayDiv = document.createElement('div')
    displayDiv.className = 'display'

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'search';
    input.placeholder = 'type here..';

    // Create the button element
    const searchButton = document.createElement('button');
    searchButton.className = 'searchBtn';
    searchButton.textContent = 'Search';
    displayDiv.append(input, searchButton)
    container.append(displayDiv)

}
createTopDiv()
// playSound()

function makeTopDivFunc() {
    const inputSearch = document.querySelector('.search')
    const searchBtn = document.querySelector('.searchBtn')

    searchBtn.addEventListener('click', () => {
        // console.log('hello') 
        const inputVal = inputSearch.value
        console.log(inputVal)
        receiveData(inputVal)

        return inputVal

    })

}

makeTopDivFunc()

async function receiveData(inputVal) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputVal}`);
    const data = await response.json()
    console.log(data)
    displayData(data)
    return data
}

function displayData(data) {
    container.textContent = ''
    createTopDiv()
    makeTopDivFunc()


    const [firstObject] = data;
    const { word, meanings } = firstObject
    // const [definitions] = meanings
    // const [definition] = definitions


    console.log(meanings[0].definitions[0].definition);
    console.log(meanings[0].definitions[0].example);
    console.log(meanings[0].synonyms[0])



    const bottom = document.createElement('div')
    bottom.className = 'bottom'

    const nameContainer = document.createElement('div')
    nameContainer.className = 'nameContainer'
    const wordDiv = document.createElement('h3')
    wordDiv.id = 'word'
    wordDiv.textContent = word

    const speaker = document.createElement('div')
    speaker.className = 'speaker'

    const speakerElement = document.createElement("i");
    speakerElement.setAttribute("class", "fa-solid fa-volume-high");
    speakerElement.classList.add = 'speakerElement'

    speaker.appendChild(speakerElement)

    nameContainer.append(wordDiv, speaker)

    const phoneticDiv = document.createElement('div')
    phoneticDiv.className = 'phoneticDiv'

    const prounP = document.createElement('p')
    prounP.className = 'prounP'
    prounP.textContent = data[0].phonetic

    const partSpeech = document.createElement('p')
    partSpeech.className = 'partSpeech'
    partSpeech.textContent = data[0].meanings[0].partOfSpeech

    phoneticDiv.append(prounP, partSpeech)


    const meaning = document.createElement('div')
    meaning.className = 'meaning'

    const definitionP = document.createElement('p')
    definitionP.className = 'definition'
    definitionP.textContent = data[0].meanings[0].definitions[0].definition

    meaning.append(definitionP)
    const { example } = data[0].meanings[0].definitions[0];

    const exampleP = document.createElement('p')
    exampleP.className = 'example'
    exampleP.textContent = `${example}`

    const synonymsDiv = document.createElement('p')
    synonymsDiv.className = 'synonyms'
    synonymsDiv.textContent = meanings[0].synonyms[0]



    bottom.append(nameContainer, phoneticDiv, meaning, exampleP, synonymsDiv)

    container.append(bottom)



    sound.setAttribute('src', `https:${data[0].phonetic[0].audio}`)
    console.log(sound)

}




function playSound() {
    const speaker = document.querySelector('.speaker')
    speaker.addEventListener('click', () => {
        sound.play()
    })
}



