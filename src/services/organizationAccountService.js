const { OrganizationAccount } = require('../models');

exports.createOrganizationAccountService = async (data) => OrganizationAccount.create(data);
exports.getAllOrganizationAccountsService = async () => OrganizationAccount.findAll();
exports.getOrganizationAccountByIdService = async (id) => OrganizationAccount.findByPk(id);
exports.updateOrganizationAccountService = async (id, data) => {
  await OrganizationAccount.update(data, { where: { id } });
  return OrganizationAccount.findByPk(id);
};
exports.deleteOrganizationAccountService = async (id) => OrganizationAccount.destroy({ where: { id } });