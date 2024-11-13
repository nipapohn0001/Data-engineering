// Function to render reservation history from localStorage
function renderHistory() {
    const historyTableBody = document.querySelector('#historyTable tbody');
    historyTableBody.innerHTML = ''; // Clear previous records

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    reservations.forEach(reservation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.bookName}</td>
            <td>${reservation.name}</td>
            <td>${reservation.reservationDate}</td>
            <td>${reservation.returnDate}</td>
            <td>${reservation.status}</td>
        `;
        historyTableBody.appendChild(row);
    });
}

// Render the history when the page loads
window.onload = renderHistory;
