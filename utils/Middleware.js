import jwt from "jsonwebtoken";

 const verifyToken = (req) => {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) return { error: "Unauthorized: No token provided" };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
   

    return { user: decoded };  
  } catch (error) {
    console.error("Error fetching user:", error);
        return  { error: "Unauthorized: Invalid token" };
  }
};

export default verifyToken