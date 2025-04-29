// General syntax for the Fetch API:
fetch(url, {
  method: "GET", // or POST, PUT, DELETE, etc.
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data), // for POST/PUT requests
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Above is just as a reminder. So you have to delete above in order to run the below code:

async function main() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const payload = { title: "learnJS", body: "test", userId: 1 };

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set headers for JSON data
      },
      body: JSON.stringify(payload), // Convert data to JSON string
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(`Error sending data: ${error}`);
  }
}

main();
// Output: { title: 'learnJS', body: 'test', userId: 1, id: 101 }
