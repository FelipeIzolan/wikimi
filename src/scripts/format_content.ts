type contentFragment = {
	title: string,
	text: string
}

function extractText(content: string[], index: number): string {
	let text = "";
	let i = index + 1;

	while (!content[i].startsWith("=")) {
		if (content[i] !== "") {
			text += content[i] + "\n";
		}

		i++;
	}

	return text;
}

function formatContent(content: string): Array<contentFragment> {
	const contentSplited = content.split("\n");
	const contentFormated: Array<contentFragment> = []; 
	const topicsBlackList = ["References", "External links", "Bibliography", "Further reading", "Notes", "See also"]

	for (let i = 0; i < contentSplited.length; i++) {
		var fragment: contentFragment;
		let currentText = contentSplited[i];
		let possibleTopic = currentText.replaceAll("=", "").trim();

		if (!topicsBlackList.includes(possibleTopic)) {
			currentText.startsWith("=") ?
			fragment = { title: currentText, text: extractText(contentSplited, i) } :
			fragment = { title: "", text: currentText }

			if (fragment.text !== "") {
				contentFormated.push(fragment);
			}

		}
	}

	return contentFormated;
}

export default formatContent
export type { contentFragment }
