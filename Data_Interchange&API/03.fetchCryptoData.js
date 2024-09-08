async function fetchData() {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
        const  response = await fetch(url)
        if (!response.ok) {
            throw new Error (`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        processApiData(data)
    } catch (error) {
        console.error("Error", error)
    }}

function processApiData(data) {
    let cryptoArray = []
    // console.log("Data:", data)
    data.forEach(element => {
        cryptoArray.push({
            'name': element['name'],
            'symbol': element['symbol'],
            'current_price': element['current_price'],
            'market_cap': element['market_cap'],
            'total_volume': element['total_volume'],
            'high_24h': element['high_24h'],
            'low_24h': element['low_24h'],
            'price_change_24h': element['price_change_24h'],
        })
    });
    console.log(cryptoArray)
}

fetchData()

// below you can find with map function 
// function processApiData(data) {
//     // Use map to transform the data into a new array
//     const cryptoArray = data.map(element => ({
//         'name': element['name'],
//         'symbol': element['symbol'],
//         'current_price': element['current_price'],
//         'market_cap': element['market_cap'],
//         'total_volume': element['total_volume'],
//         'high_24h': element['high_24h'],
//         'low_24h': element['low_24h'],
//         'price_change_24h': element['price_change_24h'],
//     }));
//     console.log(cryptoArray);
// }



