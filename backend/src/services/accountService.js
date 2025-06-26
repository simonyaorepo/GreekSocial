// accountService.js
const { Account } = require('../models');
const { MemberAccount } = require('../models');
const { ChapterAccount } = require('../models');
const { OrganizationAccount } = require('../models');

const createAccount = async (accountData) => {
  return await Account.create(accountData);
};

const getAccountById = async (id) => {
  const account = await Account.findByPk(id);
  if (!account) return null;
  // Optionally, include detail record based on type
  let detail = null;
  if (account.type === 'member') {
    detail = await MemberAccount.findOne({ where: { account_id: id } });
  } else if (account.type === 'chapter') {
    detail = await ChapterAccount.findOne({ where: { account_id: id } });
  } else if (account.type === 'organization') {
    detail = await OrganizationAccount.findOne({ where: { account_id: id } });
  }
  return { ...account.toJSON(), detail };
};

const updateAccount = async (id, accountData) => {
  const account = await Account.findByPk(id);
  if (!account) throw new Error('Account not found');
  await account.update(accountData);
  return account;
};

const deleteAccount = async (id) => {
  const account = await Account.findByPk(id);
  if (!account) throw new Error('Account not found');
  await account.destroy();
};

module.exports = {
  createAccount,
  getAccountById,
  updateAccount,
  deleteAccount,
};
