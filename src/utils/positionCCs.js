import fs from "fs";

const positionCCs = (id) => {
	const testFile = fs.readFileSync(
		`../../static/assets/video/${id}/${id}.vtt`,
		"utf-8"
	);
	const lines = testFile.split("\n");

	const linesModified = lines.map((line) => {
		if (line.startsWith("00:"))
			return `${line.replace("line:-3", "").replace("\r", "")} line:-3`;
		else return line;
	});
	const newContents = linesModified.join("\n");

	fs.writeFileSync(
		`../../static/assets/video/${id}/${id}-shifted.vtt`,
		newContents,
		"utf8"
	);
	console.log(`${id} - done`);
};

const ids = fs
	.readdirSync("../../static/assets/video")
	.filter((d) => d !== ".DS_Store");

ids.forEach((id) => {
	positionCCs(id);
});
