const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'aura.db');
const db = new Database(dbPath);

console.log('🔧 Migrating Aura Database...');

try {
    // Check if payment_preference_id column exists
    const tableInfo = db.prepare("PRAGMA table_info(appointments)").all();
    const hasPaymentField = tableInfo.some(col => col.name === 'payment_preference_id');

    if (!hasPaymentField) {
        console.log('Adding payment_preference_id column...');
        db.exec(`
      ALTER TABLE appointments 
      ADD COLUMN payment_preference_id TEXT;
    `);
        console.log('✔ Column added successfully.');
    } else {
        console.log('✔ payment_preference_id column already exists.');
    }

    console.log('✨ Migration complete!');
} catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
} finally {
    db.close();
}
