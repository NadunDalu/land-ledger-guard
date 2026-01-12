const db = require('./config/db');

async function updateAuditTable() {
  console.log('Updating Audit Table...');
  try {
    // Drop the constraint to allow flexible actions
    await db.query(`ALTER TABLE audit_logs DROP CONSTRAINT IF EXISTS audit_logs_action_check`);
    console.log('Constraint dropped successfully!');
  } catch (err) {
    if (err.code === '42704') { // undefined_object
        console.log('Constraint did not exist.');
    } else {
        console.error('Update failed:', err);
    }
  } finally {
    process.exit();
  }
}

updateAuditTable();