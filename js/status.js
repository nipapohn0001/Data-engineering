// Function to confirm the return of a book
function confirmReturn(index) {
    // Retrieve the current data from localStorage
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    // Check if reservation exists and is not already returned
    if (reservations[index] && reservations[index].status !== "Returned") {
        const bookName = reservations[index].bookName;

        // Find the book in the books array by name
        const bookIndex = books.findIndex(book => book.name === bookName);

        if (bookIndex !== -1) {
            // Update the book to be available for future reservations
            books[bookIndex].reserved = false;
            delete books[bookIndex].reservedBy;

            // Remove the reservation from the reservations array
            reservations.splice(index, 1);

            // Update localStorage with the modified arrays
            localStorage.setItem('books', JSON.stringify(books));
            localStorage.setItem('reservations', JSON.stringify(reservations));

            // Refresh the status table display to reflect removal
            renderStatusTable();
            alert(`The book "${bookName}" has been returned and is now available for reservation.`);
        } else {
            console.error("Book not found in the books list.");
        }
    } else {
        alert("This book is already returned.");
    }
}

// Function to render the status table
function renderStatusTable() {
    const statusTableBody = document.querySelector('#statusTable tbody');
    statusTableBody.innerHTML = ''; // Clear existing rows

    // Retrieve reservations data from localStorage
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    // Populate table rows with current reservation data
    reservations.forEach((reservation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.bookName}</td>
            <td>${reservation.name}</td>
            <td>${reservation.email}</td>
            <td>${reservation.reservationDate}</td>
            <td>${reservation.returnDate}</td>
            <td>${reservation.status}</td>
            <td>
                <button onclick="confirmReturn(${index})">
                    Return Book
                </button>
            </td>
        `;
        statusTableBody.appendChild(row);
    });
}

// Call renderStatusTable when page loads
document.addEventListener("DOMContentLoaded", renderStatusTable);
