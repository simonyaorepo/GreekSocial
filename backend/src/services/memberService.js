// services/memberService.js
const {Member} = require('../models');

// Only accept whitelisted fields in service methods
exports.createMember = async (data) => {
    const allowedFields = ['name', 'email', 'chapter_id', 'join_date'];
    const filtered = {};
    allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
    return await Member.create(filtered);
};

exports.getAllMembers = async () => {
    return await Member.findAll();
};

exports.getMemberById = async (id) => {
    return await Member.findByPk(id);
};

exports.updateMember = async (id, data) => {
    const member = await Member.findByPk(id);
    if (member) {
        const allowedFields = ['name', 'email', 'chapter_id', 'join_date'];
        const filtered = {};
        allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
        return await member.update(filtered);
    }
    throw new Error('Member not found');
};

exports.deleteMember = async (id) => {
    const member = await Member.findByPk(id);
    if (member) {
        await member.destroy();
        return true;
    }
    throw new Error('Member not found');
};

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and error handling as needed
// Best practice: Add audit logging for create/update/delete actions
