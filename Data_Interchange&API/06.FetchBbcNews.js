async function fetchNews() {
    try {
        const BASE_URL = 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey="<Your BBC News API key goes here>"'

        const response = await fetch(BASE_URL) 
        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status}`);
            
        }
        const data = await response.json()
        processData (data)

    } catch (error) {
        console.log(error)
    }
}

function processData (data) {
    // console.log(data)
    data.articles.forEach(el => {
        
        console.log(`Author: ${el.author}`),
        console.log(`Title: ${el.title}`),
        console.log(`Description: ${el.description}`),
        console.log(`For more info, please click at the following url: ${el.url}`)
        console.log()
    });
        
}


// Call the function to fetch news and display
fetchNews ()