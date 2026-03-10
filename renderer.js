const textArea = document.getElementById("text-area");
const fileNameSpan = document.getElementById("file-name");
const charCountSpan = document.getElementById("char-count");
const wordCountSpan = document.getElementById("word-count");

// Function to update status bar
const updateStatus = () => {
	const text = textArea.value;
	const charCount = text.length;
	const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

	charCountSpan.textContent = `${charCount} characters`;
	wordCountSpan.textContent = `${wordCount} words`;
};

// Handle file opened event
window.electronAPI.fileOpened((event, data) => {
	textArea.value = data;
	updateStatus();
	// You might want to update the filename here if the API provides it
});

// Update status on every input
textArea.addEventListener("input", updateStatus);

// Initial update
updateStatus();

// listen for ctrl+s or cmd+s and save the file
document.addEventListener("keydown", async (event) => {
	if ((event.ctrlKey || event.metaKey) && event.key === "s") {
		event.preventDefault();
		const filePath = await window.electronAPI.saveFile(textArea.value);
		if (filePath) {
			const fileName = filePath.split(/[/\\]/).pop();
			fileNameSpan.textContent = fileName;
			// alert(`File saved at ${filePath}`);
		}
	}
});
