const memberService = require('../services/memberService');

exports.createMember = async (req, res, next) => {
  try {
    const member = await memberService.createMemberService(req.body);
    res.status(201).json(member);
  } catch (error) {
    next(error);
  }
};

exports.getAllMembers = async (req, res, next) => {
  try {
    const members = await memberService.getAllMembersService();
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};

exports.getMemberById = async (req, res, next) => {
  try {
    const member = await memberService.getMemberByIdService(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.status(200).json(member);
  } catch (error) {
    next(error);
  }
};

exports.updateMember = async (req, res, next) => {
  try {
    const updatedMember = await memberService.updateMemberService(req.params.id, req.body);
    res.status(200).json(updatedMember);
  } catch (error) {
    next(error);
  }
};

exports.deleteMember = async (req, res, next) => {
  try {
    await memberService.deleteMemberService(req.params.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
