// services/memberService.js
const Member = require('../models/Member');

exports.createMember = async (data) => {
    return await Member.create(data);
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
        return await member.update(data);
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
