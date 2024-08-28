async function fetchData() {
    let url = 'https://www.quoteoftheday.nu/'
    try {
        const response = await fetch (url)
        if (!response.OK) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.text()
        console.log(data)
        
    } catch (error) {
        console.log("Error", error)
    }

}

fetchData ()