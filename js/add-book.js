// // ตัวอย่างข้อมูลหนังสือที่มีในระบบ
// const books = [
//     { code: 'B001', name: 'Advanced Python Programming', author: 'John Doe', subject: 'Programming' },
//     { code: 'B002', name: 'Database Management', author: 'Jane Smith', subject: 'Database' },
//     { code: 'B003', name: 'Network Security Essentials', author: 'Emily Johnson', subject: 'Security' }
// ];

// ฟังก์ชันสำหรับแสดงรายการหนังสือ
function renderBookList() {
    const bookTableBody = document.querySelector('#bookTable tbody');
    bookTableBody.innerHTML = ''; // ล้างข้อมูลเก่าก่อน
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

// ฟังก์ชันเพิ่มหนังสือ
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
    books.push({ code: bookCode, name: bookName, author: author, subject: subject });
    document.getElementById('popupForm').style.display = 'none';
    renderBookList(); // รีเฟรชการแสดงรายการ
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
}

// ฟังก์ชันลบหนังสือ
function deleteBook(index) {
    const confirmation = confirm('Are you sure you want to delete this book?');
    if (confirmation) {
        books.splice(index, 1); // ลบหนังสือที่เลือก
        renderBookList(); // รีเฟรชการแสดงรายการ
    }
}

// แสดงรายการหนังสือเมื่อโหลดหน้า
window.onload = renderBookList;



// -----------------------------------------------------------------------------

// ฟังก์ชันเพิ่มหนังสือ
document.getElementById('saveBook').addEventListener('click', () => {
    const bookCode = document.getElementById('bookCode').value;
    const bookName = document.getElementById('bookName').value;
    const author = document.getElementById('author').value;
    const subject = document.getElementById('subject').value;
    
    // ดึงข้อมูลที่มีใน localStorage (ถ้ามี) แล้วเพิ่มข้อมูลใหม่
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.push({ code: bookCode, name: bookName, author: author, subject: subject });
    
    // บันทึกข้อมูลกลับเข้า localStorage
    localStorage.setItem('books', JSON.stringify(books));
    
    // ปิด Pop-up
    document.getElementById('popupForm').style.display = 'none';
    
    // รีเฟรชข้อมูลหน้า Book List
    window.location.href = '/book-list.html'; // รีเฟรชหน้า Book List
});
