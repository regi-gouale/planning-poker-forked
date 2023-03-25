import { NextApiRequest, NextApiResponse } from "next";
import { isUser } from "../../../models/User";
import { joinRoom } from "../../../services/firebase/room-services";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		return res.status(405).end();
	}

	const { user } = req.body;
	const { roomId } = req.query;

	if (!isUser(user)) {
		return res.status(400).send("Missing user");
	}

	if (!roomId) {
		return res.status(400).send("Missing roomId or memberName");
	}

	try {
		await joinRoom(Array.isArray(roomId) ? roomId[0] : roomId, user);

		return res.status(200).send("Joined room");
	} catch (e) {
		return res.status(500).send(e.message);
	}

}