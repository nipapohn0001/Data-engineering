// Function to confirm the return of a book
function confirmReturn(index) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    // Check if the reservation exists and is not already returned
    if (reservations[index] && reservations[index].status !== "Returned") {
        const bookName = reservations[index].bookName;

        // Find the book index in the books array
        const bookIndex = books.findIndex(book => book.name === bookName);

        if (bookIndex !== -1) {
            // Update book to available and remove reservation details
            books[bookIndex].reserved = false;
            delete books[bookIndex].reservedBy;

            // Update reservation status to "Returned"
            reservations[index].status = "Returned";

            // Save updated data to localStorage
            localStorage.setItem('books', JSON.stringify(books));
            localStorage.setItem('reservations', JSON.stringify(reservations));

            // Remove the reservation from the table (UI update)
            renderStatusTable();
            alert(`The book "${bookName}" has been returned and is now available for reservation.`);
        } else {
            console.error("Book not found in books list.");
        }
    } else {
        alert("This book is already returned.");
    }
}

// Function to render the status table
function renderStatusTable() {
    const statusTableBody = document.querySelector('#statusTable tbody');
    statusTableBody.innerHTML = ''; // Clear existing rows

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    // Populate table rows with reservation data
    reservations.forEach((reservation, index) => {
        // Only show reservations that are not yet returned
        if (reservation.status !== "Returned") {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reservation.bookName}</td>
                <td>${reservation.name}</td>
                <td>${reservation.email}</td>
                <td>${reservation.reservationDate}</td>
                <td>${reservation.returnDate}</td>
                <td>${reservation.status}</td>
                <td>
                    <button onclick="confirmReturn(${index})" ${reservation.status === 'Returned' ? 'disabled' : ''}>
                        Return Book
                    </button>
                </td>
            `;
            statusTableBody.appendChild(row);
        }
    });
}

// Call renderStatusTable when page loads
document.addEventListener("DOMContentLoaded", renderStatusTable);
