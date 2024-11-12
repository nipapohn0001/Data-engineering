// Fetch and display reservation history from localStorage
function renderHistory() {
    const historyTableBody = document.querySelector('#historyTable tbody');
    historyTableBody.innerHTML = ''; // Clear previous data

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    reservations.forEach(reservation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.bookName}</td>
            <td>${reservation.name}</td>
            <td>${reservation.email}</td>
            <td>${reservation.reservationDate}</td>
            <td>${reservation.status}</td>
        `;
        historyTableBody.appendChild(row);
    });
}

// Load history on page load
window.onload = renderHistory;
