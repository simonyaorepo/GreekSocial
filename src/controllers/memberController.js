const memberService = require('../services/memberService');
const memberAccountService = require('../services/memberAccountService');

exports.createMember = async (req, res) => {
  try {
    // Create member first
    const member = await memberService.createMemberService(req.body);

    // Automatically create associated MemberAccount with member_id
    const accountData = { member_id: member.id, ...req.body.account };
    await memberAccountService.createMemberAccountService(accountData);

    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await memberService.getAllMembersService();
    res.status(200).json(members);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const member = await memberService.getMemberByIdService(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    // Update member data
    const updatedMember = await memberService.updateMemberService(req.params.id, req.body);

    // Update associated MemberAccount if account data provided
    if (req.body.account) {
      await memberAccountService.updateMemberAccountServiceByMemberId(req.params.id, req.body.account);
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    // Delete member account first
    await memberAccountService.deleteMemberAccountServiceByMemberId(req.params.id);

    // Delete member
    await memberService.deleteMemberService(req.params.id);

    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
