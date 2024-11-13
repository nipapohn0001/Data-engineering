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

function renderStatusTable() {
    const statusTableBody = document.querySelector('#statusTable tbody');
    statusTableBody.innerHTML = ''; // ล้างข้อมูลเก่าก่อน

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const currentDate = new Date().toISOString().split('T')[0]; // วันที่ปัจจุบันในรูปแบบ YYYY-MM-DD

    reservations.forEach((reservation, index) => {
        let status = reservation.status;

        // ตรวจสอบว่าเกินกำหนดคืนแล้วหรือยัง
        if (reservation.returnDate < currentDate && status !== 'Returned') {
            status = 'Overdue'; // หากเกินกำหนดจะเป็น "Overdue"
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.bookName}</td>
            <td>${reservation.name}</td>
            <td>${reservation.email}</td>
            <td>${reservation.reservationDate}</td>
            <td>${reservation.returnDate}</td>
            <td>${status}</td>
            <td>
                <button onclick="confirmReturn(${index})" ${status === 'Overdue' ? 'disabled' : ''}>
                    Return Book
                </button>
            </td>
        `;
        statusTableBody.appendChild(row);
    });
}

function confirmReturn(index) {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const books = JSON.parse(localStorage.getItem('books')) || [];

    const reservation = reservations[index];
    const bookName = reservation.bookName;

    if (reservation.status === "Overdue") {
        // ตรวจสอบว่าผู้ใช้ได้ชำระเงินหรือยัง
        if (reservation.paymentStatus !== "Paid") {
            alert("You need to confirm payment before returning the book.");
            return;
        }
    }

    // ค้นหาหนังสือในรายการ
    const bookIndex = books.findIndex(book => book.name === bookName);

    if (bookIndex !== -1) {
        // ปรับสถานะหนังสือให้สามารถยืมใหม่ได้
        books[bookIndex].reserved = false;
        delete books[bookIndex].reservedBy;

        // ลบการจองออกจากรายการ
        reservations.splice(index, 1);

        // อัปเดตข้อมูลใน localStorage
        localStorage.setItem('books', JSON.stringify(books));
        localStorage.setItem('reservations', JSON.stringify(reservations));

        // รีเฟรชสถานะการจอง
        renderStatusTable();
        alert(`The book "${bookName}" has been returned and is now available for reservation.`);
    } else {
        console.error("Book not found.");
    }
}
