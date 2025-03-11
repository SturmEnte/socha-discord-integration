const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://contest.software-challenge.de/seasons/2025/contestants/2411/matches";

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

	})
	.catch((error) => {
		console.error("Error while loading the website:", error);
	});
