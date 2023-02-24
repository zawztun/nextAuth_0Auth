import { getSession } from "next-auth/react";

const handler = async (req: any, res: any) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(404).json({ error: " unAuthenticated User" });
  } else {
    res.status(200).json({ message: "success", session });
  }
};

export default handler;
