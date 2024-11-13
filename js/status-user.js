// Function to confirm the return of a book
function confirmReturn(index) {
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

// Function to handle payment for overdue books
function handlePayment(index) {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    // Check if the reservation exists
    if (reservations[index]) {
        // Update the payment status
        reservations[index].paymentStatus = 'Paid';

        // Update localStorage with the modified reservations
        localStorage.setItem('reservations', JSON.stringify(reservations));

        // Refresh the status table display
        renderStatusTable();
        alert("Payment has been made. You can now return the book.");
    }
}

function renderStatusTable() {
    const statusTableBody = document.querySelector('#statusTable tbody');
    statusTableBody.innerHTML = ''; // Clear existing rows

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    console.log(reservations);  // ตรวจสอบข้อมูลใน console

    const today = new Date().toISOString().split('T')[0];

    if (reservations.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" style="text-align:center;">No reservations found</td>`;
        statusTableBody.appendChild(row);
        return;
    }

    // Loop through the reservations and display them in the table
    reservations.forEach((reservation) => {
        const row = document.createElement('tr');
        const isOverdue = reservation.returnDate < today && reservation.paymentStatus !== 'Paid';

        row.innerHTML = `
            <td>${reservation.bookName}</td>
            <td>${reservation.name}</td>
            <td>${reservation.email}</td>
            <td>${reservation.reservationDate}</td>
            <td>${reservation.returnDate}</td>
            <td>${reservation.status}</td>
        `;
        statusTableBody.appendChild(row);
    });
}


document.addEventListener("DOMContentLoaded", renderStatusTable);

