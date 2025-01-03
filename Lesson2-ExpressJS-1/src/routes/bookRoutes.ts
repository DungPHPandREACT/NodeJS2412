import express, {Request, Response} from 'express';

const bookRouter = express.Router();
bookRouter.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Lấy danh sách sách'
    })
})
bookRouter.post('/', (req: Request, res: Response) => {
    res.json({
        message: 'Thêm mới sách thành công'
    })
})
bookRouter.put('/:id', (req: Request, res: Response) => {
    res.json({
        message: 'Cập nhật sách thành công'
    })
})
bookRouter.delete('/:id', (req: Request, res: Response) => {
    res.json({
        message: 'Xóa sách thành công'
    })
})

export default bookRouter