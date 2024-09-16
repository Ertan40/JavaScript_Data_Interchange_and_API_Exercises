async function main() {
    try {
        const url = 'https://v2.jokeapi.dev/joke/Any';

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        processFetchedData(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

function processFetchedData(currData) {
    if (currData['type'] === 'single') {
        console.log(`Joke: ${currData['joke']}`);
    } else if (currData['type'] === 'twopart') {
        console.log(`Question: ${currData['setup']}`);
        console.log(`Answer: ${currData['delivery']}`);
    } else {
        console.error("Unknown joke type");
    }
}

// Run the main function
main();



// {
//     error: false,
//     category: 'Dark',
//     type: 'single',
//     joke: `I hate double standards. Burn a body at a crematorium, you're "being a respectful friend." Do it at home and you're "destroying evidence."`,
//     flags: {
//       nsfw: false,
//       religious: false,
//       political: false,
//       racist: false,
//       sexist: false,
//       explicit: true
//     },
//     safe: false,
//     id: 274,
//     lang: 'en'
//   }