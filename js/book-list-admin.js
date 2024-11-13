// ฟังก์ชันแสดงหนังสือจาก localStorage
function renderBookList() {
    const bookTableBody = document.querySelector('#bookTable tbody');
    bookTableBody.innerHTML = ''; // ล้างข้อมูลเก่าก่อน
    const books = JSON.parse(localStorage.getItem('books')) || [];

    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.code}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.subject}</td>
            <td>${book.reserved ? 'Reserved' : 'Available'}</td> <!-- แสดงสถานะการจอง -->
            <td>
                <button onclick="openReservationForm(${index})" ${book.reserved ? 'disabled' : ''}>
                    ${book.reserved ? 'Reserved' : 'Reserve'}
                </button>
            </td>
        `;
        bookTableBody.appendChild(row);
    });
}

// ฟังก์ชันเปิดฟอร์มจอง
function openReservationForm(index) {
    const book = JSON.parse(localStorage.getItem('books'))[index];

    // แสดงป๊อปอัพ
    document.getElementById('reservePopup').style.display = 'flex';

    // ตั้งค่าเวลาปัจจุบันในฟอร์ม
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // เดือนเริ่มต้นที่ 0
    const year = today.getFullYear();
    const currentDate = `${year}-${month}-${day}`; // รูปแบบ yyyy-mm-dd

    document.getElementById('reservationDate').value = currentDate;

    // เก็บหมายเลขหนังสือที่จะทำการจอง
    document.getElementById('reserveForm').onsubmit = function (event) {
        event.preventDefault();

        // รับข้อมูลผู้จองจากฟอร์ม
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const reservationDate = document.getElementById('reservationDate').value;

        // อัพเดตข้อมูลการจอง
        book.reserved = true;
        book.reservedBy = {
            name,
            email,
            reservationDate
        };

        // บันทึกข้อมูลกลับไปที่ localStorage
        const books = JSON.parse(localStorage.getItem('books')) || [];
        books[index] = book;
        localStorage.setItem('books', JSON.stringify(books));

        alert(`You have reserved the book: ${book.name} by ${book.author}`);
        closePopup(); // ปิดฟอร์ม
        renderBookList(); // รีเฟรชการแสดงผล
    };
}

// ฟังก์ชันปิดป๊อปอัพ
function closePopup() {
    document.getElementById('reservePopup').style.display = 'none';
}

// ฟังก์ชันค้นหาหนังสือ
function searchBooks() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    const rows = document.querySelectorAll('#bookTable tbody tr');

    rows.forEach(row => {
        const bookText = row.innerText.toLowerCase();
        if (bookText.includes(searchValue)) {
            row.style.display = ''; // แสดงแถวที่ตรงกับคำค้นหา
        } else {
            row.style.display = 'none'; // ซ่อนแถวที่ไม่ตรงกับคำค้นหา
        }
    });
}

// เพิ่ม event listener ให้ช่องค้นหา
document.getElementById('searchBar').addEventListener('input', searchBooks);

// เพิ่มข้อมูลตัวอย่างหนังสือ (หาก localStorage ว่าง)
if (!localStorage.getItem('books')) {
    const sampleBooks = [
        { code: 'B001', name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', subject: 'Novel', reserved: false },
        { code: 'B002', name: '1984', author: 'George Orwell', subject: 'Dystopian', reserved: false },
        { code: 'B003', name: 'To Kill a Mockingbird', author: 'Harper Lee', subject: 'Classic', reserved: false }
    ];
    localStorage.setItem('books', JSON.stringify(sampleBooks));
}

// แสดงรายการหนังสือเมื่อโหลดหน้า
window.onload = renderBookList;

// ฟังก์ชันเปิดฟอร์มจอง
function openReservationForm(index) {
    const book = JSON.parse(localStorage.getItem('books'))[index];

    // แสดงป๊อปอัพ
    document.getElementById('reservePopup').style.display = 'flex';

    // ตั้งค่าเวลาปัจจุบันในฟอร์ม
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const currentDate = `${year}-${month}-${day}`; // รูปแบบ yyyy-mm-dd

    document.getElementById('reservationDate').value = currentDate;

    // เก็บหมายเลขหนังสือที่จะทำการจอง
    document.getElementById('reserveForm').onsubmit = function (event) {
        event.preventDefault();

        // รับข้อมูลผู้จองจากฟอร์ม
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const reservationDate = document.getElementById('reservationDate').value;

        // อัพเดตข้อมูลการจอง
        book.reserved = true;
        book.reservedBy = {
            name,
            email,
            reservationDate
        };

        // บันทึกข้อมูลการจอง
        const reservation = {
            bookName: book.name,
            name: name,
            email: email,
            reservationDate: reservationDate,
            status: "Reserved"
        };

        // บันทึกข้อมูลการจองใน localStorage
        localStorage.setItem('currentReservation', JSON.stringify(reservation));

        // บันทึกข้อมูลหนังสือที่จองแล้วกลับไปที่ localStorage
        const books = JSON.parse(localStorage.getItem('books')) || [];
        books[index] = book;
        localStorage.setItem('books', JSON.stringify(books));

        alert(`You have reserved the book: ${book.name} by ${book.author}`);

        // ปิดป๊อปอัพและไปที่หน้าแสดงข้อมูลการจอง
        closePopup();
        window.location.href = '/Admin/status-admin.html';
    };
}

// ฟังก์ชันปิดป๊อปอัพ
function closePopup() {
    document.getElementById('reservePopup').style.display = 'none';
}

// Updated reservation function to store all reservations
function openReservationForm(index) {
    const book = JSON.parse(localStorage.getItem('books'))[index];

    // Show the popup form
    document.getElementById('reservePopup').style.display = 'flex';

    // Set the current date in the form
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const currentDate = `${year}-${month}-${day}`;
    document.getElementById('reservationDate').value = currentDate;

    // Handle the form submission
    document.getElementById('reserveForm').onsubmit = function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const reservationDate = document.getElementById('reservationDate').value;

        // Update the book reservation status
        book.reserved = true;
        book.reservedBy = { name, email, reservationDate };

        // Save the updated book list in localStorage
        const books = JSON.parse(localStorage.getItem('books')) || [];
        books[index] = book;
        localStorage.setItem('books', JSON.stringify(books));

        // Store the reservation in localStorage
        const reservation = {
            bookName: book.name,
            name: name,
            email: email,
            reservationDate: reservationDate,
            status: 'Reserved'
        };

        // Retrieve existing reservations and append the new one
        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        // Notify the user and close the popup
        alert(`You have reserved the book: ${book.name} by ${book.author}`);
        closePopup();
        window.location.href = '/Admin/status-admin.html'; // Redirect to reservation info page
    };
}

// Function to open the reservation form
function openReservationForm(index) {
    const book = JSON.parse(localStorage.getItem('books'))[index];

    // Show the popup form
    document.getElementById('reservePopup').style.display = 'flex';

    // Set the current date in the form
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const currentDate = `${year}-${month}-${day}`;
    document.getElementById('reservationDate').value = currentDate;

    // Handle the form submission
    document.getElementById('reserveForm').onsubmit = function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const reservationDate = document.getElementById('reservationDate').value;

        // Calculate return date (2 days after reservation date)
        const reservationDateObj = new Date(reservationDate);
        const returnDateObj = new Date(reservationDateObj);
        returnDateObj.setDate(reservationDateObj.getDate() + 2);
        const returnDate = returnDateObj.toISOString().split('T')[0]; // Format as yyyy-mm-dd

        // Update the book reservation status
        book.reserved = true;
        book.reservedBy = { name, email, reservationDate, returnDate };

        // Save the updated book list in localStorage
        const books = JSON.parse(localStorage.getItem('books')) || [];
        books[index] = book;
        localStorage.setItem('books', JSON.stringify(books));

        // Store the reservation in localStorage
        const reservation = {
            bookName: book.name,
            name: name,
            email: email,
            reservationDate: reservationDate,
            returnDate: returnDate,
            status: 'Reserved'
        };

        // Retrieve existing reservations and append the new one
        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        // Notify the user and close the popup
        alert(`You have reserved the book: ${book.name} by ${book.author}. It is due on ${returnDate}.`);
        closePopup();
        window.location.href = '/Admin/status-admin.html'; // Redirect to reservation info page
    };
}

function renderBookList() {
    const bookTableBody = document.querySelector('#bookTable tbody');
    bookTableBody.innerHTML = ''; // ล้างข้อมูลเก่าก่อน
    const books = JSON.parse(localStorage.getItem('books')) || [];

    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.code}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.subject}</td>
            <td>${book.reserved ? 'Reserved' : 'Available'}</td>
            <td>
                <button onclick="openReservationForm(${index})" ${book.reserved ? 'disabled' : ''}>
                    ${book.reserved ? 'Reserved' : 'Reserve'}
                </button>
            </td>
        `;
        bookTableBody.appendChild(row);
    });
}

// แสดงรายการหนังสือเมื่อโหลดหน้า
window.onload = renderBookList;

