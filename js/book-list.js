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
            <td>
                <button onclick="editBook(${index})">Edit</button>
                <button onclick="deleteBook(${index})">Delete</button>
            </td>
        `;
        bookTableBody.appendChild(row);
    });
}

// ฟังก์ชันลบหนังสือจาก localStorage
function deleteBook(index) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.splice(index, 1); // ลบหนังสือที่เลือก
    localStorage.setItem('books', JSON.stringify(books)); // บันทึกข้อมูลใหม่
    renderBookList(); // รีเฟรชการแสดงรายการ
}

// ฟังก์ชันแก้ไขหนังสือ
function editBook(index) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books[index];
    document.getElementById('popupTitle').textContent = 'Edit Book';
    document.getElementById('bookCode').value = book.code;
    document.getElementById('bookName').value = book.name;
    document.getElementById('author').value = book.author;
    document.getElementById('subject').value = book.subject;
    document.getElementById('popupForm').style.display = 'block';
}

window.onload = renderBookList; // แสดงรายการหนังสือเมื่อโหลดหน้า
