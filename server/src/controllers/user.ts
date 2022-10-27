import User from '../models/user';
import {NextFunction, Request, Response} from "express";
import AudentricSocket from "../util/socket";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  return User.find().sort({createdAt: -1})
    .then(users => {
      return res.status(200).json(users);
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
      // ends message to all connected users
      AudentricSocket.getInstance().emit("user event", {
        action: "add",
        user
      });

      return res.json(user)
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
  User.findByIdAndRemove(req.params.userId)
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

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  const {userId} = req.params;
  const {status} = req.body
  User.findByIdAndUpdate(userId, {status, updatedAt: new Date(new Date().toISOString())}, {new: true})
    .then(user => {
      AudentricSocket.getInstance().emit("user event", {
        action: "updateStatus",
        status,
        userId
      });

      return res.json(user)
    })
    .catch(e => {
      return res.status(404).send({
        error: e.message,
        message: "Unable to update user's status."
      });
    })
}

export const updateIssues = async (req: Request, res: Response, next: NextFunction) => {
  const {userId} = req.params;
  const {issue} = req.body;

  User.findByIdAndUpdate(userId, {
    $push: {
      "issues": issue
    },
    updatedAt: new Date(new Date().toISOString())
  }, {new: true})
    .then(user => {
      AudentricSocket.getInstance().emit("user event", {
        action: "updateIssues",
        issue,
        user
      });

      return res.json(user);
    })
    .catch(e => {
      return res.status(404).send({
        error: e.message,
        message: "Unable to update user's issues."
      });
    })
}
