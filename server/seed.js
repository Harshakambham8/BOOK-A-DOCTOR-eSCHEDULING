import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Doctor from './models/Doctor.js';
import Appointment from './models/Appointment.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book-my-doctor';

const seedData = async () => {
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    // Clear existing collections
    console.log('Clearing database collections...');
    await User.deleteMany();
    await Doctor.deleteMany();
    await Appointment.deleteMany();
    console.log('Database cleared.');

    // Create Admin
    console.log('Creating Admin account...');
    await User.create({
      name: 'System Admin',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
      contactInfo: '999-999-9999'
    });
    console.log('Admin account created successfully.');

    // Create Patients
    console.log('Creating Patient accounts...');
    const patient1 = await User.create({
      name: 'John Patient',
      email: 'patient1@gmail.com',
      password: 'patient123',
      role: 'patient',
      contactInfo: '111-111-1111'
    });

    const patient2 = await User.create({
      name: 'Sarah Patient',
      email: 'patient2@gmail.com',
      password: 'patient123',
      role: 'patient',
      contactInfo: '222-222-2222'
    });
    console.log('Patient accounts created.');

    // Create Doctor 1 (Approved Cardiology Doctor)
    console.log('Creating Doctor 1 (Cardiologist, Approved) account...');
    const docUser1 = await User.create({
      name: 'Dr. Jane Hart',
      email: 'doctor1@gmail.com',
      password: 'doctor123',
      role: 'doctor',
      contactInfo: '333-333-3333'
    });

    await Doctor.create({
      user: docUser1._id,
      specialization: 'Cardiology',
      bio: 'Dr. Jane Hart is an expert cardiologist with over 12 years of experience. She specializes in cardiac diagnostic checks, cardiac surgery consulting, and healthy lifestyle planning.',
      experience: 12,
      fees: 150,
      availability: [
        {
          day: 'Monday',
          slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
        },
        {
          day: 'Wednesday',
          slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
        },
        {
          day: 'Friday',
          slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
        }
      ],
      isApproved: true
    });
    console.log('Doctor 1 created.');

    // Create Doctor 2 (Pending Pediatrics Doctor)
    console.log('Creating Doctor 2 (Pediatrician, Pending) account...');
    const docUser2 = await User.create({
      name: 'Dr. Bruce Child',
      email: 'doctor2@gmail.com',
      password: 'doctor123',
      role: 'doctor',
      contactInfo: '444-444-4444'
    });

    await Doctor.create({
      user: docUser2._id,
      specialization: 'Pediatrics',
      bio: 'Dr. Bruce Child loves caring for children of all ages. He has 5 years of pediatric experience, focusing on developmental health and vaccination programs.',
      experience: 5,
      fees: 90,
      availability: [
        {
          day: 'Tuesday',
          slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
        },
        {
          day: 'Thursday',
          slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
        }
      ],
      isApproved: false
    });
    console.log('Doctor 2 created.');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Database seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
