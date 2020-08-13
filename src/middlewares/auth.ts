import jwt from "jsonwebtoken";
import { Request, Response, NextFunction} from 'express';

interface TokenInterface {
    userId: string;
}

export default (req: Request,res: Response,next: NextFunction) => {
      const authHeader = req.headers.authorization;

      if(!authHeader){
          return res.status(401).json({message: "Access denied missing token"});
      }

      const parts = authHeader.split(' ');

      if(!(parts.length === 2)){
          return res.status(400).json({message: "Error Token Sintax"});
      }

      const [scheme,token] = parts;

      if(!/^Bearer$/i.test(scheme)){
        return res.status(401).json({message: "error token malformatted"});
    }
       //console.log(process.env.APP_SECRET);

      jwt.verify(token,process.env.APP_SECRET as string,(error,decoded) => {
          if(error) {
              console.log(error);
            return res.status(401).json({message: "failure to authenticate"});
          }

          req.userId = (decoded as TokenInterface).userId;
      })

      return next();
}