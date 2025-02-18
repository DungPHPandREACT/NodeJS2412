import { NextFunction, Request, Response } from "express";

export const normalizeUsername = (req: Request, res: Response, next: NextFunction) => {
	const username = req.body.username;
	if(username){
		req.body.username = username.trim().toLowerCase()
	}

	next();
}