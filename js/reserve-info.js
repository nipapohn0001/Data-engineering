// Function to display reservation details from localStorage
function renderReservationInfo() {
    const reservationDetails = document.querySelector('#reservationTable tbody');
    reservationDetails.innerHTML = ''; // Clear existing details

    // Get reservation details from localStorage
    const reservation = JSON.parse(localStorage.getItem('currentReservation'));

    if (reservation) {
        // If a reservation exists, display the details
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.bookName}</td>
            <td>${reservation.name}</td>
            <td>${reservation.reservationDate}</td>
            <td>${reservation.returnDate}</td>
            <td>${reservation.status}</td>
        `;
        reservationDetails.appendChild(row);
    } else {
        // If no reservation, display a message
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="5" style="text-align: center;">No reservation found.</td>
        `;
        reservationDetails.appendChild(row);
    }
}

// Display reservation info when the page loads
window.onload = renderReservationInfo;
