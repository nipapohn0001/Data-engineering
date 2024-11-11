// ดึงการอ้างอิงต่าง ๆ
const addBookButton = document.getElementById('addBookButton');
const popupForm = document.getElementById('popupForm');
const closePopupButton = document.getElementById('closePopup');
const saveBookButton = document.getElementById('saveBook');
const bookCodeInput = document.getElementById('bookCode');
const bookNameInput = document.getElementById('bookName');
const authorInput = document.getElementById('author');
const subjectInput = document.getElementById('subject');
const bookTable = document.getElementById('bookTable').getElementsByTagName('tbody')[0];
let editingIndex = -1; // สำหรับเก็บดัชนีของหนังสือที่ต้องการแก้ไข

// ฟังก์ชันเปิด Pop-up สำหรับการเพิ่มหนังสือ
addBookButton.addEventListener('click', () => {
    popupForm.style.display = 'flex';
    document.getElementById('popupTitle').innerText = 'Add Book';
    editingIndex = -1; // ตั้งค่าให้เป็นการเพิ่มหนังสือใหม่
    resetForm();
});

// ฟังก์ชันปิด Pop-up
closePopupButton.addEventListener('click', () => {
    popupForm.style.display = 'none';
});

// ฟังก์ชันบันทึกข้อมูลหนังสือ
saveBookButton.addEventListener('click', () => {
    const bookCode = bookCodeInput.value;
    const bookName = bookNameInput.value;
    const author = authorInput.value;
    const subject = subjectInput.value;

    // เก็บข้อมูลหนังสือใน localStorage
    const book = {
        bookCode,
        bookName,
        author,
        subject
    };

    let books = JSON.parse(localStorage.getItem('books')) || [];

    if (editingIndex === -1) {
        // ถ้าเป็นการเพิ่มหนังสือใหม่
        books.push(book);
    } else {
        // ถ้าเป็นการแก้ไขหนังสือ
        books[editingIndex] = book;
    }

    localStorage.setItem('books', JSON.stringify(books));  // เก็บข้อมูลใหม่ใน localStorage

    // แสดงข้อมูลในตาราง
    displayBooks();

    // ปิด Pop-up
    popupForm.style.display = 'none';

    // ล้างฟอร์ม
    resetForm();
});

// ฟังก์ชันแสดงหนังสือในตาราง
function displayBooks() {
    let books = JSON.parse(localStorage.getItem('books')) || [];  // ดึงข้อมูลจาก localStorage
    bookTable.innerHTML = '';  // ลบข้อมูลเก่าออก

    books.forEach((book, index) => {
        const row = bookTable.insertRow();
        row.insertCell(0).innerText = book.bookCode;
        row.insertCell(1).innerText = book.bookName;
        row.insertCell(2).innerText = book.author;
        row.insertCell(3).innerText = book.subject;

        // ปุ่ม Edit
        const actionsCell = row.insertCell(4);
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => editBook(index)); // เมื่อคลิกปุ่ม Edit
        actionsCell.appendChild(editButton);
    });
}

// ฟังก์ชันแก้ไขข้อมูลหนังสือ
function editBook(index) {
    let books = JSON.parse(localStorage.getItem('books')) || [];  // ดึงข้อมูลจาก localStorage
    const book = books[index];

    // ตั้งค่าฟอร์มให้มีข้อมูลของหนังสือที่ต้องการแก้ไข
    bookCodeInput.value = book.bookCode;
    bookNameInput.value = book.bookName;
    authorInput.value = book.author;
    subjectInput.value = book.subject;

    // ตั้งค่าการแก้ไข
    editingIndex = index;
    popupForm.style.display = 'flex';
    document.getElementById('popupTitle').innerText = 'Edit Book';
}

// ฟังก์ชันรีเซ็ตฟอร์ม
function resetForm() {
    bookCodeInput.value = '';
    bookNameInput.value = '';
    authorInput.value = '';
    subjectInput.value = '';
}

// แสดงหนังสือเมื่อโหลดหน้า
window.onload = displayBooks;

// // ตัวอย่างข้อมูลหนังสือที่มีในระบบ
// // const books = [
// //     { code: 'B001', name: 'Advanced Python Programming', author: 'John Doe', subject: 'Programming' },
// //     { code: 'B002', name: 'Database Management', author: 'Jane Smith', subject: 'Database' },
// //     { code: 'B003', name: 'Network Security Essentials', author: 'Emily Johnson', subject: 'Security' }
// // ];

// // ฟังก์ชันสำหรับแสดงรายการหนังสือ
// function renderBookList() {
//     const bookTableBody = document.querySelector('#bookTable tbody');
//     bookTableBody.innerHTML = ''; // ล้างข้อมูลเก่าก่อน
//     books.forEach((book, index) => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${book.code}</td>
//             <td>${book.name}</td>
//             <td>${book.author}</td>
//             <td>${book.subject}</td>
//             <td>
//                 <button onclick="editBook(${index})">Edit</button>
//                 <button onclick="deleteBook(${index})">Delete</button>
//             </td>
//         `;
//         bookTableBody.appendChild(row);
//     });
// }

// // // ฟังก์ชันเพิ่มหนังสือ
// // document.getElementById('addBookButton').addEventListener('click', () => {
// //     document.getElementById('popupTitle').textContent = 'Add Book';
// //     document.getElementById('bookCode').value = '';
// //     document.getElementById('bookName').value = '';
// //     document.getElementById('author').value = '';
// //     document.getElementById('subject').value = '';
// //     document.getElementById('popupForm').style.display = 'block';
// // });

// // ฟังก์ชันบันทึกข้อมูลหนังสือ
// document.getElementById('saveBook').addEventListener('click', () => {
//     const bookCode = document.getElementById('bookCode').value;
//     const bookName = document.getElementById('bookName').value;
//     const author = document.getElementById('author').value;
//     const subject = document.getElementById('subject').value;
//     books.push({ code: bookCode, name: bookName, author: author, subject: subject });
//     document.getElementById('popupForm').style.display = 'none';
//     renderBookList(); // รีเฟรชการแสดงรายการ
// });

// // ฟังก์ชันปิด Pop-up
// document.getElementById('closePopup').addEventListener('click', () => {
//     document.getElementById('popupForm').style.display = 'none';
// });

// // // ฟังก์ชันแก้ไขหนังสือ
// // function editBook(index) {
// //     const book = books[index];
// //     document.getElementById('popupTitle').textContent = 'Edit Book';
// //     document.getElementById('bookCode').value = book.code;
// //     document.getElementById('bookName').value = book.name;
// //     document.getElementById('author').value = book.author;
// //     document.getElementById('subject').value = book.subject;
// //     document.getElementById('popupForm').style.display = 'block';
// // }

// // ฟังก์ชันลบหนังสือ
// function deleteBook(index) {
//     const confirmation = confirm('Are you sure you want to delete this book?');
//     if (confirmation) {
//         books.splice(index, 1); // ลบหนังสือที่เลือก
//         renderBookList(); // รีเฟรชการแสดงรายการ
//     }
// }

// // แสดงรายการหนังสือเมื่อโหลดหน้า
// window.onload = renderBookList;
