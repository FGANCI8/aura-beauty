const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'aura.db');
const db = new Database(dbPath);

console.log('🌸 Initializing Aura Beauty Database...');

// Create Tables
const schema = `
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    category TEXT,
    is_active BOOLEAN DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT,
    price REAL,
    stock INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    email TEXT,
    service_id INTEGER,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'novo', -- novo, confirmado, concluido, cancelado
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id)
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name TEXT NOT NULL,
    text TEXT NOT NULL,
    rating INTEGER DEFAULT 5
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    details TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

db.exec(schema);
console.log('✔ Tables created.');

// Seed Services
const services = [
    { name: 'Corte Arquitetado', price: 180, duration: 60, category: 'Cabelo' },
    { name: 'Balayage Premium', price: 580, duration: 180, category: 'Coloração' },
    { name: 'Hidratação Glow', price: 220, duration: 45, category: 'Tratamento' },
    { name: 'Botox Capilar', price: 350, duration: 90, category: 'Tratamento' },
    { name: 'Escova de Luz', price: 240, duration: 60, category: 'Styling' },
    { name: 'Tratamento Shine', price: 289, duration: 60, category: 'Tratamento' },
    { name: 'Reconstrução Molecular', price: 320, duration: 90, category: 'Tratamento' },
    { name: 'Alinhamento Absoluto', price: 399, duration: 120, category: 'Tratamento' }
];

const insertService = db.prepare('INSERT INTO services (name, price, duration, category) VALUES (?, ?, ?, ?)');
const checkServices = db.prepare('SELECT count(*) as count FROM services').get();

if (checkServices.count === 0) {
    services.forEach(s => insertService.run(s.name, s.price, s.duration, s.category));
    console.log('✔ Services seeded.');
} else {
    console.log('ℹ Services already exist.');
}

// Seed Products
const products = [
    'Kérastase Discipline',
    'Wella Fusion',
    "L'Oréal Lumino Contrast",
    'Redken Acidic Bonding',
    'Schwarzkopf Repair',
    'Lola Dream Cream'
];

const insertProduct = db.prepare('INSERT INTO products (name, brand) VALUES (?, ?)');
const checkProducts = db.prepare('SELECT count(*) as count FROM products').get();

if (checkProducts.count === 0) {
    products.forEach(p => insertProduct.run(p, 'Premium Brand'));
    console.log('✔ Products seeded.');
}

// Seed Testimonials
const testimonials = [
    { name: 'Ana Souza', text: 'Simplesmente a melhor experiência da minha vida. O ambiente é surreal.', rating: 5 },
    { name: 'Mariana Lima', text: 'A Aura é incrível, o atendimento automatizado facilitou tudo.', rating: 5 },
    { name: 'Carla Dias', text: 'Meu cabelo nunca esteve tão saudável. Recomendo de olhos fechados.', rating: 5 },
    { name: 'Patrícia Gomes', text: 'Luxo puro. Desde o cheiro do salão até o cafézinho.', rating: 5 },
    { name: 'Fernanda Alves', text: 'Profissionais de altíssimo nível. O corte arquitetado mudou meu rosto.', rating: 5 },
    { name: 'Beatriz Silva', text: 'Amei a facilidade de agendar pelo app. Muito chique!', rating: 5 }
];

const insertTestimonial = db.prepare('INSERT INTO testimonials (client_name, text, rating) VALUES (?, ?, ?)');
const checkTestimonials = db.prepare('SELECT count(*) as count FROM testimonials').get();

if (checkTestimonials.count === 0) {
    testimonials.forEach(t => insertTestimonial.run(t.name, t.text, t.rating));
    console.log('✔ Testimonials seeded.');
}

// Seed Settings
const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
insertSetting.run('whatsapp_oficial', '5516993706612');
insertSetting.run('admin_password', 'admin123'); // In a real app, hash this!
insertSetting.run('salon_name', 'Aura Beauty');

console.log('✨ Database setup complete!');
