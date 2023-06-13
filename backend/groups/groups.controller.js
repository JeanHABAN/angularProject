import { ErrorResponse } from "../error.js";
import usersModel from "../users/users.model.js";
import groupsModel from "./groups.model.js";

export const add_group = async (req, res, next) => {
    try {
        const { tokenData } = req.body;
        const new_group = req.body; 
        const results = await groupsModel.create({
            ...new_group,
            members: [{
                user_id: tokenData._id,
                fullname: tokenData.fullname,
                email: tokenData.email,
                pending: false
            }]
        })
        res.json({ success: true, data: results })
    } catch (error) {
        next(error)
    }
}
export const get_groups = async (req, res, next) => {
    try {
        const { tokenData } = req.body;
        const pending = req.query?.pending ? true : false;

        const results = await groupsModel.find({ members: { $elemMatch: { 'user_id': tokenData._id, pending } } }, { transactions: 0 }).lean();
        res.json({ success: true, data: results })

    } catch (error) {
        next(error)
    }
}
export const update_member_pending_status_by_id = async (req, res, next) => {
    try {
        const { group_id, member_id } = req.params;
        const { tokenData } = req.body;
        if (member_id !== tokenData._id) throw new ErrorResponse('User must change the status of their own account', 404);

        const results = await groupsModel.updateOne(
            { _id: group_id, members: { $elemMatch: { 'user_id': member_id, pending: true } } },
            { $set: { 'members.$.pending': false } })
        res.json({ success: true, data: results.modifiedCount ? true : false })
    } catch (error) {
        next(error)
    }
}
export const add_member = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { tokenData } = req.body;
        const member_to_add = await usersModel.findOne({ 'email': req.body.email }).lean();
        if (!member_to_add) throw new ErrorResponse('User not found', 404);

        const results = await groupsModel.updateOne(
            { _id: group_id, members: { $elemMatch: { 'user_id': tokenData._id, pending: false } } },
            {
                $addToSet: {
                    members: {
                        user_id: member_to_add._id,
                        fullname: member_to_add.fullname,
                        email: member_to_add.email,
                        pending: true
                    }
                }
            })
        res.json({ success: true, data: results.modifiedCount ? true : false })
    } catch (error) {
        next(error)
    }
}

export const add_transaction = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { tokenData } = req.body;
        res.json({ success: true, data: true })
    } catch (error) {
        next(error)
    }
}
export const get_transactions = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { tokenData } = req.body;
        res.json({ success: true, data: true })
    } catch (error) {
        next(error)
    }
}
export const get_transaction_by_id = async (req, res, next) => {
    try {
        const { group_id, transaction_id } = req.params;
        const { tokenData } = req.body;
        res.json({ success: true, data: true })
    } catch (error) {
        next(error)
    }
}

export const get_receipt = async (req, res, next) => {
    try {
        const { group_id, transaction_id } = req.params;
        const { tokenData } = req.body;
        res.json({ success: true, data: true })
    } catch (error) {
        next(error)
    }
}
