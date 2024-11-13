// Function to render the list of reserved books
function renderReturnTable() {
    const returnTableBody = document.querySelector('#returnTable tbody');
    returnTableBody.innerHTML = ''; // Clear any existing rows

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    reservations.forEach((reservation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.bookName}</td>
            <td>${reservation.name}</td>
            <td>${reservation.email}</td>
            <td>${reservation.reservationDate}</td>
            <td>${reservation.returnDate}</td>
            <td>${reservation.status}</td>
            <td><button onclick="confirmReturn(${index})">Return</button></td>
        `;
        returnTableBody.appendChild(row);
    });
}

// Function to handle returning a book
function confirmReturn(index) {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const books = JSON.parse(localStorage.getItem('books')) || [];

    const reservation = reservations[index];
    const bookIndex = books.findIndex(book => book.name === reservation.bookName);

    if (bookIndex !== -1) {
        // Update the book to be available
        books[bookIndex].reserved = false;
        delete books[bookIndex].reservedBy;

        // Remove the reservation from the reservations array
        reservations.splice(index, 1);

        // Update localStorage
        localStorage.setItem('books', JSON.stringify(books));
        localStorage.setItem('reservations', JSON.stringify(reservations));

        alert(`The book "${reservation.bookName}" has been successfully returned.`);
        renderReturnTable(); // Refresh the table
    } else {
        alert("Error: Book not found in the inventory.");
    }
}

// Render the table on page load
window.onload = renderReturnTable;
