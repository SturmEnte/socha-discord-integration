const axios = require("axios");
const cheerio = require("cheerio");

const config = require("../config.json");

let alertedMatches = [];

axios
	.get(config.matchOverviewUrl)
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

		matches = matches.filter((match) => {
			// Remove the practice matches
			if (match[0].startsWith("P")) {
				return true;
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

		console.log(matches);

		matches.forEach((match) => {
			alertedMatches.push(match[0]);
			console.log("Alerting for match", match[0]);

			let score1 = match[4].split(":")[0].trim();
			let score2 = match[4].split(":")[1].trim();

			axios
				.post(config.webhookUrl, {
					content: `**Spieltag ${match[0]} | ${match[1]}**\n*${match[2]}* **${score1}** **:** **${score2}** *${match[3]}*`,
				})
				.then(() => {
					console.log("Alerted for match", match[0]);
				})
				.catch((err) => {
					console.error("Error while alerting for match", match[0], err);
				});
		});
	})
	.catch((error) => {
		console.error("Error while loading the website:", error);
	});
