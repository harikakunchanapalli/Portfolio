document.addEventListener('DOMContentLoaded', function() {
    const entryInput = document.getElementById('entryInput');
    const saveButton = document.getElementById('saveButton');
    const entriesContainer = document.getElementById('entries');

    // Load existing entries from local storage
    let entries = JSON.parse(localStorage.getItem('entries')) || [];

    // Display existing entries
    entries.forEach(entry => displayEntry(entry));

    // Event listener for saving an entry
    saveButton.addEventListener('click', function() {
        const entryText = entryInput.value.trim();
        if (entryText !== '') {
            const entry = {
                text: entryText,
                timestamp: new Date().toLocaleString()
            };
            entries.push(entry);
            localStorage.setItem('entries', JSON.stringify(entries));
            displayEntry(entry);
            entryInput.value = '';
        }
    });

    // Function to display a diary entry
    function displayEntry(entry) {
        const entryElement = document.createElement('div');
        entryElement.classList.add('entry');
        entryElement.innerHTML = `
            <p>${entry.text}</p>
            <small>${entry.timestamp}</small>
        `;
        entriesContainer.prepend(entryElement);
    }
});
