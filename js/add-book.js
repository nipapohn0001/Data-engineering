let books = JSON.parse(localStorage.getItem('books')) || [];

// ฟังก์ชันสำหรับแสดงรายการหนังสือ
function renderBookList() {
    const bookTableBody = document.querySelector('#bookTable tbody');
    bookTableBody.innerHTML = ''; // ล้างข้อมูลเก่าก่อน
    books = JSON.parse(localStorage.getItem('books')) || [];
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

// ฟังก์ชันเปิด Pop-up สำหรับเพิ่มหนังสือใหม่
document.getElementById('addBookButton').addEventListener('click', () => {
    document.getElementById('popupTitle').textContent = 'Add Book';
    document.getElementById('bookCode').value = '';
    document.getElementById('bookName').value = '';
    document.getElementById('author').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('popupForm').style.display = 'block';
});

// ฟังก์ชันบันทึกข้อมูลหนังสือ
document.getElementById('saveBook').addEventListener('click', () => {
    const bookCode = document.getElementById('bookCode').value;
    const bookName = document.getElementById('bookName').value;
    const author = document.getElementById('author').value;
    const subject = document.getElementById('subject').value;

    books.push({ code: bookCode, name: bookName, author, subject });
    localStorage.setItem('books', JSON.stringify(books));
    document.getElementById('popupForm').style.display = 'none';
    renderBookList();
});

// ฟังก์ชันปิด Pop-up
document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('popupForm').style.display = 'none';
});

// ฟังก์ชันแก้ไขหนังสือ
function editBook(index) {
    const book = books[index];
    document.getElementById('popupTitle').textContent = 'Edit Book';
    document.getElementById('bookCode').value = book.code;
    document.getElementById('bookName').value = book.name;
    document.getElementById('author').value = book.author;
    document.getElementById('subject').value = book.subject;
    document.getElementById('popupForm').style.display = 'block';

    document.getElementById('saveBook').onclick = () => {
        books[index] = {
            code: document.getElementById('bookCode').value,
            name: document.getElementById('bookName').value,
            author: document.getElementById('author').value,
            subject: document.getElementById('subject').value
        };
        localStorage.setItem('books', JSON.stringify(books));
        document.getElementById('popupForm').style.display = 'none';
        renderBookList();
    };
}

// ฟังก์ชันลบหนังสือ
function deleteBook(index) {
    const confirmation = confirm('Are you sure you want to delete this book?');
    if (confirmation) {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        renderBookList();
    }
}

// แสดงรายการหนังสือเมื่อโหลดหน้า
window.onload = renderBookList;

// แสดง Pop-up เมื่อกดปุ่มเพิ่มหนังสือ
document.getElementById('addBookButton').addEventListener('click', () => {
    document.getElementById('popupForm').style.display = 'flex';
});

// ปิด Pop-up เมื่อกดปุ่มปิด
document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('popupForm').style.display = 'none';
});
