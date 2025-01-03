// Dữ liệu Sách (Book)
// ID: (số nguyên) Định danh duy nhất cho sách.
// Tiêu đề: (chuỗi) Tiêu đề của sách.
// Tác giả: (số nguyên) ID của tác giả (liên kết đến bảng tác giả).
// Thể loại: (chuỗi) Thể loại của sách (Tiểu thuyết, Khoa học, Giáo dục).
// Năm xuất bản: (số nguyên) Năm xuất bản của sách.
// Số trang: (số nguyên) Số trang của sách.

enum CATEGORY {
    NOVEL = 'NOVEL',
    SCIENCE = 'SCIENCE',
    EDUCATION = 'EDUCATION',
}

export interface Book {
    id ?: number | string;
    title: string;
    author: number | string;
    category: CATEGORY;
    publishedYear: number;
    numberOfPages: number;
}