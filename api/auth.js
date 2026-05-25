import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function handler(req, res){

    try{

        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        const user = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture
        };

        res.status(200).json({
            success: true,
            user
        });

    }

    catch(error){

        res.status(401).json({
            success: false,
            message: "Invalid token"
        });

    }

}