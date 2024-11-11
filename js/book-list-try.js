// ดึงข้อมูลหนังสือจาก localStorage
function displayBooks() {
    let books = JSON.parse(localStorage.getItem('books')) || [];

    // เข้าถึง tbody ของตาราง
    const bookTableBody = document.getElementById('bookTable').getElementsByTagName('tbody')[0];

    // ลบข้อมูลเก่าในตาราง
    bookTableBody.innerHTML = '';

    // เพิ่มแถวใหม่ในตารางสำหรับแต่ละหนังสือ
    books.forEach(book => {
        const row = bookTableBody.insertRow();

        row.insertCell(0).innerText = book.bookCode;
        row.insertCell(1).innerText = book.bookName;
        row.insertCell(2).innerText = book.author;
        row.insertCell(3).innerText = book.subject;
    });
}

// เรียกฟังก์ชันเมื่อโหลดหน้า
window.onload = displayBooks;
