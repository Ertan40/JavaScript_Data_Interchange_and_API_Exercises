import fetch from 'node-fetch';      // Import fetch
import * as cheerio from 'cheerio';  // For parsing HTML

// Function to fetch the quote
async function fetchQuote() {
    let url = 'https://www.quoteoftheday.nu/';
    try {
        // Fetch the HTML content from the URL
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the HTML with Cheerio
        const html = await response.text();
        const $ = cheerio.load(html);

        const quote = $('.carousel-item.active').text().trim();

        // Check if the quote is empty or not found
        if (!quote) {
            throw new Error("Quote not found on the page!");
        }

        return quote;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Main function to execute fetchQuote
async function main() {
    const quote = await fetchQuote();
    if (quote) {
        console.log("Quote of the day:", quote);
    } else {
        console.log("Failed to fetch quote!");
    }
}

main();

// output: Quote of the day: Life can only be understood backwards; but it must be lived forwards.            Soren Kierkegaard

