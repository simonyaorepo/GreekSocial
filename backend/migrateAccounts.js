// migrateAccounts.js
// This script migrates data from Member, Chapter, and Organization tables to the new unified Account structure.
// Run with: node migrateAccounts.js (after backing up your DB!)

const { sequelize } = require('./src/config/db');
const Account = require('./src/models/accountModel');
const Member = require('./src/models/memberModel');
const Chapter = require('./src/models/chapterModel');
const Organization = require('./src/models/organizationModel');
const MemberDetails = require('./src/models/memberDetailsModel');
const ChapterDetails = require('./src/models/chapterDetailsModel');
const OrganizationDetails = require('./src/models/organizationDetailsModel');

async function migrate() {
  await sequelize.authenticate();
  const t = await sequelize.transaction();
  try {
    // Migrate Organizations
    const orgs = await Organization.findAll({ raw: true });
    for (const org of orgs) {
      const account = await Account.create({
        type: 'organization',
        email: org.email || `${org.name.replace(/\s+/g, '').toLowerCase()}@org.local`,
      }, { transaction: t });
      await OrganizationDetails.create({
        account_id: account.id,
        name: org.name,
        founded_date: org.founded_date,
        website: org.website,
        // ...add other org fields as needed
      }, { transaction: t });
      // Optionally: update foreign keys in other tables to use account_id
    }

    // Migrate Chapters
    const chapters = await Chapter.findAll({ raw: true });
    for (const chapter of chapters) {
      const account = await Account.create({
        type: 'chapter',
        email: chapter.email || `chapter${chapter.id}@chapter.local`,
      }, { transaction: t });
      await ChapterDetails.create({
        account_id: account.id,
        organization_account_id: null, // Set this if you migrate org relations
        location: chapter.location,
        founded_date: chapter.founded_date,
        // ...add other chapter fields as needed
      }, { transaction: t });
    }

    // Migrate Members
    const members = await Member.findAll({ raw: true });
    for (const member of members) {
      const account = await Account.create({
        type: 'member',
        email: member.email,
      }, { transaction: t });
      await MemberDetails.create({
        account_id: account.id,
        chapter_account_id: null, // Set this if you migrate chapter relations
        name: member.name,
        join_date: member.join_date,
        // ...add other member fields as needed
      }, { transaction: t });
    }

    await t.commit();
    console.log('Migration complete!');
  } catch (err) {
    await t.rollback();
    console.error('Migration failed:', err);
  } finally {
    await sequelize.close();
  }
}

migrate();
