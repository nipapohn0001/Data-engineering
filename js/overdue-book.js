// ฟังก์ชันตรวจสอบหนังสือเกินกำหนด
function displayOverdueBooks() {
    const overdueTableBody = document.querySelector('#overdueTable tbody');
    overdueTableBody.innerHTML = ''; // ล้างข้อมูลเก่าก่อน

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const today = new Date().toISOString().split('T')[0]; // วันที่วันนี้ในรูปแบบ yyyy-mm-dd

    reservations.forEach((reservation, index) => {
        if (reservation.status === 'Reserved' && reservation.returnDate < today) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reservation.bookName}</td>
                <td>${reservation.name}</td>
                <td>${reservation.email}</td>
                <td>${reservation.reservationDate}</td>
                <td>${reservation.returnDate}</td>
                <td>Overdue</td>
                <td><button onclick="handlePayment(${index})">ชำระเงิน</button></td>
            `;
            overdueTableBody.appendChild(row);
        }
    });
}

// ฟังก์ชันจัดการการชำระเงิน
function handlePayment(index) {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    if (reservations[index]) {
        // อัปเดตสถานะเป็น 'Available' เพื่อให้หนังสือสามารถยืมได้ใหม่
        reservations[index].status = 'Available';
        
        // บันทึกข้อมูลกลับไปที่ localStorage
        localStorage.setItem('reservations', JSON.stringify(reservations));
        
        // รีเฟรชหน้าเพื่ออัปเดตรายการเกินกำหนด
        displayOverdueBooks();
    }
}

// แสดงรายการหนังสือเกินกำหนดเมื่อโหลดหน้า
window.onload = displayOverdueBooks;
