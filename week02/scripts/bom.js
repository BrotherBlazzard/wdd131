// Book of Mormon books
const bomBooks = [
    '1 Nephi', '2 Nephi', 'Jacob', 'Enos', 'Jarom', 'Omni',
    'Words of Mormon', 'Mosiah', 'Alma', 'Helaman',
    '3 Nephi', '4 Nephi', 'Mormon', 'Ether', 'Moroni'
];

// elements
const inputElement = document.querySelector('#favchap');
const buttonElement = document.querySelector('button');
const listElement = document.querySelector('#list');
const messageElement = document.querySelector('#message');
const countElement = document.querySelector('#count');

// Update the list count display
function updateCount() {
    countElement.textContent = listElement.children.length;
}

// Validate if input is a valid Book of Mormon reference
function isValidBOMReference(input) {
    const trimmedInput = input.trim();
    const parts = trimmedInput.split(' ');

    if (parts.length < 2) return false;

    // Extract book name and chapter
    const chapterPart = parts[parts.length - 1];
    const bookName = parts.slice(0, -1).join(' ');

    // Check if chapter is a valid number
    if (!/^\d+$/.test(chapterPart)) return false;

    // Check if book exists in BOM
    return bomBooks.some(book => book.toLowerCase() === bookName.toLowerCase());
}

// Format input to proper case
function formatBOMReference(input) {
    const trimmedInput = input.trim();
    const parts = trimmedInput.split(' ');
    const chapterPart = parts[parts.length - 1];
    const bookName = parts.slice(0, -1).join(' ');

    // Find the correct case version of the book
    const correctBook = bomBooks.find(book => book.toLowerCase() === bookName.toLowerCase());
    return `${correctBook} ${chapterPart}`;
}

// Display message to user
function showMessage(text, type = 'error') {
    messageElement.textContent = text;
    messageElement.className = type;
    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.className = '';
    }, 3000);
}

// Check if entry already exists
function entryExists(formattedInput) {
    const items = Array.from(listElement.children);
    return items.some(li => li.textContent.replace('❌', '').trim() === formattedInput);
}

buttonElement.addEventListener('click', function () {
    const input = inputElement.value;

    if (input.trim() === '') {
        showMessage('Please enter a Book of Mormon chapter reference', 'error');
        inputElement.focus();
        return;
    }

    if (!isValidBOMReference(input)) {
        showMessage('Please enter a valid Book of Mormon reference (e.g., Alma 5)', 'error');
        inputElement.focus();
        return;
    }

    if (listElement.children.length >= 10) {
        showMessage('You can only add 10 chapters to your list', 'error');
        inputElement.focus();
        return;
    }

    const formattedInput = formatBOMReference(input);

    if (entryExists(formattedInput)) {
        showMessage('This chapter is already in your list', 'error');
        inputElement.focus();
        return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = formattedInput;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('aria-label', `Delete ${formattedInput}`);
    deleteBtn.addEventListener('click', function () {
        listElement.removeChild(li);
        updateCount();
        showMessage(`${formattedInput} removed from list`, 'success');
        inputElement.focus();
    });

    li.appendChild(deleteBtn);
    listElement.appendChild(li);
    updateCount();

    showMessage(`${formattedInput} added to list`, 'success');
    inputElement.value = '';
    inputElement.focus();
});

// Allow Enter key to add chapter
inputElement.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        buttonElement.click();
    }
});