// // สมมติว่าคุณมีข้อมูลหนังสือในรูปแบบของ Array (หรือดึงข้อมูลจาก API)
// const books = [
//     { code: 'B001', name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', subject: 'Fiction' },
//     { code: 'B002', name: '1984', author: 'George Orwell', subject: 'Dystopian' },
//     { code: 'B003', name: 'Moby Dick', author: 'Herman Melville', subject: 'Adventure' },
// ];

// // ฟังก์ชันในการอัปเดตตาราง
// function updateBookTable() {
//     const tableBody = document.getElementById('bookTable').getElementsByTagName('tbody')[0];
//     tableBody.innerHTML = ''; // ล้างข้อมูลเก่าออก

//     // เพิ่มข้อมูลใหม่จาก Array
//     books.forEach(book => {
//         const row = tableBody.insertRow();
//         row.innerHTML = `
//             <td>${book.code}</td>
//             <td>${book.name}</td>
//             <td>${book.author}</td>
//             <td>${book.subject}</td>
//         `;
//     });
// }

// // เรียกใช้ฟังก์ชันเพื่ออัปเดตข้อมูลทันทีเมื่อโหลดหน้า
// document.addEventListener('DOMContentLoaded', updateBookTable);


// การอ้างอิง DOM
const addBookButton = document.getElementById('addBookButton');
const popupForm = document.getElementById('popupForm');
const closePopupButton = document.getElementById('closePopup');
const saveBookButton = document.getElementById('saveBook');
const bookTableBody = document.querySelector('#bookTable tbody');

// ข้อมูลตัวอย่างหนังสือ
let books = [];

// ฟังก์ชันเปิดป็อปอัพ
addBookButton.addEventListener('click', () => {
    popupForm.style.display = 'block'; // เปิดป็อปอัพ
});

// ฟังก์ชันปิดป็อปอัพ
closePopupButton.addEventListener('click', () => {
    popupForm.style.display = 'none'; // ปิดป็อปอัพ
});

// ฟังก์ชันเพิ่มหนังสือใหม่
saveBookButton.addEventListener('click', () => {
    const bookCode = document.getElementById('bookCode').value;
    const bookName = document.getElementById('bookName').value;
    const author = document.getElementById('author').value;
    const subject = document.getElementById('subject').value;

    // เพิ่มหนังสือใหม่ใน Array
    const newBook = { code: bookCode, name: bookName, author: author, subject: subject };
    books.push(newBook);

    // อัปเดตตาราง
    updateBookTable();

    // ปิดป็อปอัพ
    popupForm.style.display = 'none';

    // ล้างฟอร์ม
    document.getElementById('bookCode').value = '';
    document.getElementById('bookName').value = '';
    document.getElementById('author').value = '';
    document.getElementById('subject').value = '';
});

// ฟังก์ชันอัปเดตตารางหนังสือ
function updateBookTable() {
    bookTableBody.innerHTML = ''; // ลบข้อมูลเดิมในตาราง

    // เพิ่มแถวใหม่ในตารางจากข้อมูลใน Array
    books.forEach((book) => {
        const row = bookTableBody.insertRow();
        row.innerHTML = `
            <td>${book.code}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.subject}</td>
            <td>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </td>
        `;

        // ฟังก์ชันลบหนังสือ
        row.querySelector('.deleteBtn').addEventListener('click', () => {
            books = books.filter(b => b.code !== book.code); // ลบข้อมูลจาก Array
            updateBookTable(); // อัปเดตตาราง
        });

        // ฟังก์ชันแก้ไขหนังสือ
        row.querySelector('.editBtn').addEventListener('click', () => {
            document.getElementById('bookCode').value = book.code;
            document.getElementById('bookName').value = book.name;
            document.getElementById('author').value = book.author;
            document.getElementById('subject').value = book.subject;
            popupForm.style.display = 'block'; // เปิดป็อปอัพให้แก้ไข
        });
    });
}

// เรียกใช้ฟังก์ชันเพื่ออัปเดตตารางเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', updateBookTable);
