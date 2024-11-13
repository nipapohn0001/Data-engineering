// Function to render reservation history
function renderHistory() {
    const historyTableBody = document.querySelector('#historyTable tbody');
    historyTableBody.innerHTML = ''; // Clear existing content
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    reservations.forEach(reservation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.bookName}</td>
            <td>${reservation.name}</td>
            <td>${reservation.email}</td>
            <td>${reservation.reservationDate}</td>
        `;
        historyTableBody.appendChild(row);
    });
}

// Call renderHistory when the page loads
window.onload = renderHistory;

