import { NextFunction } from "express"

export const authorizeRoles = (...roles: string[]): any => {
    return (req: any, res: any, next: NextFunction) => {
        console.log('user: ', req?.user);
        console.log('roles: ', roles)
        if(!roles.includes(req?.user?.role)){
            res.status(403).json({
                message: 'Bạn không có quyền truy cập'
            });
            return;
        }
        next();
    }
}

export const authorizeAttribute = (req: any, res: any, next: NextFunction) => {
    if(req.user.age < 18){
        res.status(403).json({
            message: 'Bạn chưa đủ tuổi để truy cập nội dung này'
        });
        return;
    }

    next();
}