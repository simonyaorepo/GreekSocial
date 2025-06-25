const { MemberAccount } = require('../models');

exports.createMemberAccountService = async (data) => MemberAccount.create(data);
exports.getAllMemberAccountsService = async () => MemberAccount.findAll();
exports.getMemberAccountByIdService = async (id) => MemberAccount.findByPk(id);
exports.updateMemberAccountService = async (id, data) => {
  await MemberAccount.update(data, { where: { id } });
  return MemberAccount.findByPk(id);
};
exports.deleteMemberAccountService = async (id) => MemberAccount.destroy({ where: { id } });



