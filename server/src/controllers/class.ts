import {NextFunction, Request, Response} from "express";
import AudentricSocket from "../util/socket";
import Class from "../models/class";
import User from "../models/user";
import {Types} from "mongoose";

export const createClass = async (req: Request, res: Response, next: NextFunction) => {
  Class.create(req.body)
    .then(classObj => {
      return res.json(classObj);
    })
    .catch(e => {
        return res.status(404).send({
          error: e.message,
          message: 'Unable to create class.'
        });
      }
    );
  ;
}

export const getClassById = async (req: Request, res: Response, next: NextFunction) => {
  Class.findById(req.params.classId)
    .then(classObj => {
      return res.json(classObj);
    })
    .catch(e => {
      return res.status(404).send({
        error: e.message,
        message: `Class with ID of ${req.params.classId} does not exist.`
      })
    })
}

export const getClassUsers = async (req: Request, res: Response, next: NextFunction) => {
  const classObj = await Class.findById(req.params.classId);

  if (!classObj) throw Error("Class does not exist.");

  User.find({"_id": {$in: classObj.users}}).sort({updatedAt: -1})
    .then(users => res.json(users))
    .catch(e => {
      return res.status(404).send({
        error: e.message,
        message: 'Unable to join class.'
      });
    });
}

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  const {classId} = req.params;
  const {status} = req.body;

  const classObj = await Class.findByIdAndUpdate(classId, {status}, {new: true});

  AudentricSocket.getInstance().emit("class event", {
    action: "status",
    status
  });

  return res.json(classObj)
};

export const joinClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {classId} = req.params;
    const {userId} = req.body;

    const user = await User.findById(userId);

    if (!user) {
      new Error('User cannot be found.');
    }

    const classObj = await Class.findByIdAndUpdate(classId, {
      $push: {
        "users": Types.ObjectId(user?._id)
      }
    }, {new: true});

    AudentricSocket.getInstance().emit("class event", {
      action: "join",
      user
    });

    return res.json(classObj);
  } catch (e: any) {
    return res.status(404).send({
      error: e.message,
      message: 'Unable to join class.'
    });
  }
}
