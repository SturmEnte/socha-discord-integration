const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://contest.software-challenge.de/seasons/2025/contestants/2411/matches";

let alertedMatches = [];

axios
	.get(url)
	.then((response) => {
		const html = response.data;

		const $ = cheerio.load(html);

		let matches = [];

		let i = 0;
		let currentMatch = Array(5).fill(null);

		$("tbody tr td").each((_, elem) => {
			currentMatch[i] = $(elem).text().trim();
			i++;

			if (i == 5) {
				matches.push(currentMatch);
				currentMatch = Array(5).fill(null);
				i = 0;
			}
		});

		// Remove the practice matches and matches without a result
		matches = matches.filter((match) => {
			// Remove the practice matches
			if (match[0].startsWith("P")) {
			}

			// Remove matches that have already been alerted
			if (alertedMatches.includes(match[0])) {
				return false;
			}

			// Remove matches without a result
			if (match[4] == "ausstehend") {
				return false;
			}

			return true;
		});

		// Sort the matches by the match number
		matches = matches.sort((a, b) => {
			if (Number(a[0]) < Number(b[0])) {
				return -1;
			}
			return 1;
		});

	})
	.catch((error) => {
		console.error("Error while loading the website:", error);
	});
