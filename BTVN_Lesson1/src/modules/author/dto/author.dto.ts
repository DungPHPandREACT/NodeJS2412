// Dữ liệu Tác Giả (Author)
// ID: (số nguyên) Định danh duy nhất cho tác giả.
// Tên: (chuỗi) Tên của tác giả.
// Quốc gia: (chuỗi) Quốc gia của tác giả.
// Ngày sinh: (ngày) Ngày sinh của tác giả.

export interface Author {
    id?: number | string;
    name: string;
    country: string;
    birthday: string;
}