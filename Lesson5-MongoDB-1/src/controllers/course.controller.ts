import {Request, Response} from 'express';
import Course, {Course as CourseType} from '../models/course.model'

export const createCourse = async (req: Request, res: Response) => {
    try{
        const course: CourseType = new Course(req.body);

        await course.save();
        res.status(201).json({
            message: 'Tạo thành công',
            data: course,
        })
    } catch(error: any){
        res.status(400).json({
            message: error.message
        })
    }
}

export const getCourses = async (req: Request, res: Response) => {
    try{
        const courses = await Course.find();
        res.status(200).json({
            data: courses
        })
    } catch(error: any){
        res.status(500).json({message: error.message})
    }
}