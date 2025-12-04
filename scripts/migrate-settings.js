const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'aura.db');
const db = new Database(dbPath);

console.log('🔧 Migrating Settings...');

try {
    // Check if we need to add new settings fields
    const existingSettings = db.prepare("SELECT key FROM settings").all();
    const settingKeys = existingSettings.map(s => s.key);

    const defaultSettings = [
        { key: 'salon_name', value: 'Aura Beauty' },
        { key: 'whatsapp_oficial', value: '5516993706612' },
        { key: 'admin_password', value: 'admin123' },
        { key: 'operating_hours_start', value: '09:00' },
        { key: 'operating_hours_end', value: '19:00' },
        { key: 'cancellation_min_hours', value: '2' },
        { key: 'mercado_pago_public_key', value: '' },
        { key: 'mercado_pago_access_token', value: '' }
    ];

    const insertOrUpdate = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');

    defaultSettings.forEach(setting => {
        if (!settingKeys.includes(setting.key)) {
            insertOrUpdate.run(setting.key, setting.value);
            console.log(`✔ Added setting: ${setting.key}`);
        }
    });

    console.log('✨ Settings migration complete!');
} catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
} finally {
    db.close();
}
