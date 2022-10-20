import User from '../models/user';
import {NextFunction, Request, Response} from "express";
import AudentricSocket from "../util/socket";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .then(users => {
      return res.status(200).json({
        message: 'Successfully fetched users',
        users
      });
    })
    .catch(e => {
        return res.status(404).send({
          error: e.message,
          message: "Unable to get users."
        });
      }
    );
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  User.create(req.body)
    .then(user => {
      // Sends message to all connected users
      AudentricSocket.getInstance().emit("user event", {
        action: "add",
        user
      });

      return res.json({
        message: "Successfully created user.",
        user
      })
    })
    .catch(e => {
        return res.status(404).send({
          error: e.message,
          message: 'Unable to create user.'
        });
      }
    );
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      return res.json({
        message: 'Successfully deleted user.'
      })
    })
    .catch(e => {
        return res.status(404).send({
          error: e.message,
          message: 'Unable to delete user.'
        });
      }
    );
}

