document.getElementById('addBookForm').addEventListener('submit', function(e) {
    e.preventDefault();  // หยุดการรีเฟรชหน้าเมื่อส่งฟอร์ม

    // รับข้อมูลจากฟอร์ม
    const bookCode = document.getElementById('bookCode').value;
    const bookName = document.getElementById('bookName').value;
    const author = document.getElementById('author').value;
    const subject = document.getElementById('subject').value;

    // สร้างวัตถุหนังสือ
    const newBook = {
        bookCode,
        bookName,
        author,
        subject
    };

    // ดึงข้อมูลหนังสือจาก localStorage
    let books = JSON.parse(localStorage.getItem('books')) || [];

    // เพิ่มหนังสือใหม่ลงในข้อมูลที่มีอยู่
    books.push(newBook);

    // บันทึกข้อมูลใหม่ลงใน localStorage
    localStorage.setItem('books', JSON.stringify(books));

    // รีไดเรกต์ไปที่หน้า book-list.html
    window.location.href = 'book-list.html';
});
