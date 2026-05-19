require('dotenv').config();
const mongoose = require('mongoose');

// Import Models
const Worker = require('./models/Worker');
const Livestock = require('./models/Livestock');
const Task = require('./models/Task');
const Field = require('./models/Field');
const Transaction = require('./models/Transaction');
const InventoryItem = require('./models/InventoryItem');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/farm_management';

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    console.log('Clearing existing data...');
    await Worker.deleteMany({});
    await Livestock.deleteMany({});
    await Task.deleteMany({});
    await Field.deleteMany({});
    await Transaction.deleteMany({});
    await InventoryItem.deleteMany({});

    console.log('Inserting mock data...');

    // 1. Workers
    const pastDate = new Date(Date.now() - 31556952000).toISOString().split('T')[0];
    const pastDateRecent = new Date(Date.now() - 5000000000).toISOString().split('T')[0];
    await Worker.insertMany([
      { name: 'John Doe', role: 'Tractor Operator', phone: '(555) 123-4567', email: 'john.d@farm.local', status: 'Active', joinDate: pastDate, tasksAssigned: 3 },
      { name: 'Alice Smith', role: 'Manager', phone: '(555) 987-6543', email: 'alice.m@farm.local', status: 'Active', joinDate: pastDate, tasksAssigned: 12 },
      { name: 'Bob Johnson', role: 'Field Hand', phone: '(555) 456-7890', email: 'bob.j@farm.local', status: 'On Leave', joinDate: pastDateRecent, tasksAssigned: 0 },
      { name: 'Maria Garcia', role: 'Veterinarian', phone: '(555) 222-3333', email: 'maria.g@farm.local', status: 'Active', joinDate: pastDate, tasksAssigned: 5 },
      { name: 'James Wilson', role: 'Agronomist', phone: '(555) 444-5555', email: 'james.w@farm.local', status: 'Sick', joinDate: pastDateRecent, tasksAssigned: 1 }
    ]);

    // 2. Livestock
    const todayStr = new Date().toISOString().split('T')[0];
    const pastVax = new Date(Date.now() - 10000000000).toISOString().split('T')[0];
    await Livestock.insertMany([
      { tagId: 'BOV-089', species: 'Cattle', breed: 'Angus', ageMonths: 24, weightKg: 650, healthStatus: 'Healthy', lastVaccination: pastVax },
      { tagId: 'BOV-112', species: 'Cattle', breed: 'Hereford', ageMonths: 36, weightKg: 710, healthStatus: 'Pregnant', lastVaccination: pastVax },
      { tagId: 'PIG-045', species: 'Pigs', breed: 'Yorkshire', ageMonths: 18, weightKg: 220, healthStatus: 'Healthy', lastVaccination: todayStr },
      { tagId: 'PIG-046', species: 'Pigs', breed: 'Berkshire', ageMonths: 12, weightKg: 190, healthStatus: 'Sick', lastVaccination: pastVax },
      { tagId: 'POU-881', species: 'Poultry', breed: 'Leghorn', ageMonths: 8, weightKg: 3, healthStatus: 'Healthy', lastVaccination: todayStr },
      { tagId: 'SHP-902', species: 'Sheep', breed: 'Merino', ageMonths: 42, weightKg: 75, healthStatus: 'Under Observation', lastVaccination: pastVax }
    ]);

    // 3. Tasks
    const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    await Task.insertMany([
      { title: 'Repair Main Tractor Engine', description: 'Engine is misfiring on cold starts. Needs full inspection.', assignee: 'Bob Johnson', priority: 'High', status: 'To Do', dueDate: todayStr },
      { title: 'Fertilize North Field', description: 'Apply nitrogen mix before the rains start this weekend.', assignee: 'John Doe', priority: 'High', status: 'In Progress', dueDate: todayStr },
      { title: 'Inventory Seed Stock', description: 'Count remaining corn and soybean bags for Q2 planting.', assignee: 'Alice Smith', priority: 'Low', status: 'To Do', dueDate: tomorrowStr },
      { title: 'Vaccinate Poultry Flock', description: 'Annual avian flu vaccines for the main laying house.', assignee: 'Maria Garcia', priority: 'Medium', status: 'Completed', dueDate: todayStr },
      { title: 'Clean Irrigation Filters', description: 'Routine maintenance for sector 4 irrigation lines.', assignee: 'Unassigned', priority: 'Medium', status: 'To Do', dueDate: tomorrowStr }
    ]);

    // 4. Fields
    await Field.insertMany([
      { name: 'North Wheat Field', cropType: 'Wheat', sizeAcres: 120, status: 'Healthy', soilMoisture: 45, expectedYield: 240 },
      { name: 'East Corn Block', cropType: 'Corn', sizeAcres: 85, status: 'Needs Water', soilMoisture: 18, expectedYield: 300 },
      { name: 'South Soybeans', cropType: 'Soybeans', sizeAcres: 60, status: 'Harvesting', soilMoisture: 35, expectedYield: 150 },
      { name: 'West Fallow', cropType: 'None', sizeAcres: 40, status: 'Planning', soilMoisture: 22, expectedYield: 0 }
    ]);

    // 5. Transactions
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    await Transaction.insertMany([
      { date: todayStr, description: 'Sold 100 bushels of corn', category: 'Sales', type: 'Income', amount: 2500 },
      { date: todayStr, description: 'Tractor Repair', category: 'Maintenance', type: 'Expense', amount: 550 },
      { date: yesterdayStr, description: 'Worker Wages', category: 'Payroll', type: 'Expense', amount: 1200 },
      { date: yesterdayStr, description: 'Fertilizer Purchase', category: 'Supplies', type: 'Expense', amount: 800 },
      { date: yesterdayStr, description: 'Livestock Sale', category: 'Sales', type: 'Income', amount: 4200 }
    ]);

    // 6. Inventory
    await InventoryItem.insertMany([
      { name: 'Nitrogen Fertilizer', category: 'Chemicals', quantity: 450, unit: 'Liters', threshold: 100 },
      { name: 'Premium Corn Seed', category: 'Seeds', quantity: 15, unit: 'Bags', threshold: 20 },
      { name: 'Tractor Engine Oil', category: 'Maintenance', quantity: 0, unit: 'Gallons', threshold: 5 },
      { name: 'Organic Soybeans', category: 'Seeds', quantity: 120, unit: 'Bags', threshold: 50 },
      { name: 'Chicken Feed Blend', category: 'Feed', quantity: 8, unit: 'Tons', threshold: 10 },
      { name: 'Diesel Fuel', category: 'Fuel', quantity: 850, unit: 'Liters', threshold: 300 }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);

  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
