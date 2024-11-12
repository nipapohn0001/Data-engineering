// Function to display reservation data from localStorage
function renderReservationList() {
    const reservationTableBody = document.querySelector('#reservationTable tbody');
    reservationTableBody.innerHTML = ''; // Clear previous data

    // Retrieve reservation data from localStorage
    const reservationData = JSON.parse(localStorage.getItem('reservations')) || [];

    reservationData.forEach((reservation) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.bookName}</td>
            <td>${reservation.name}</td>
            <td>${reservation.email}</td>
            <td>${reservation.reservationDate}</td>
            <td>${reservation.status}</td>
        `;
        reservationTableBody.appendChild(row);
    });
}

// Call the function to render the reservations when the page loads
window.onload = renderReservationList;
