import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { googleConfig } from "../configs/googleConfig";
import User from "../models/user.model";
import { hashPassword } from "../utils/hashPassword";

passport.use(
	new GoogleStrategy(
		{
			clientID: googleConfig.clientId,
			clientSecret: googleConfig.clientSecret,
			callbackURL: googleConfig.callbackURL,
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: any,
			done: Function
		) => {
			try {
				const { id, emails, name } = profile;
				const existingUser = await User.findOne({ googleId: id });

				if (existingUser) {
					return done(null, existingUser);
				}

				const password = 'randomPassword123';
				const hashedPassword = await hashPassword(password);

				const newUser = new User({
					googleId: id,
					email: emails[0].value,
					firstName: name.givenName,
					lastName: name.familyName,
					password: hashedPassword,
				});

				await newUser.save();
				return done(null, newUser);
			} catch (error) {
				return done(error, null);
			}
		}
	)
);
