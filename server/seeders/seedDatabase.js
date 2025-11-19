// seeders/seedDatabase.js
const mongoose = require('mongoose');
require('dotenv').config();

const Disease = require('../models/Disease');
const Symptom = require('../models/Symptom');
const HealthFacility = require('../models/HealthFacility');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/health-checker');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Common diseases in Kenya
const diseases = [
  {
    name: 'Malaria',
    category: 'infectious',
    description: 'Parasitic disease transmitted by mosquitoes, very common in Kenya especially in coastal and western regions',
    commonInKenya: true,
    symptoms: ['Fever', 'Chills', 'Headache', 'Sweating', 'Fatigue', 'Nausea', 'Vomiting', 'Body aches'],
    causes: ['Mosquito bites carrying Plasmodium parasites'],
    prevention: [
      'Sleep under treated mosquito nets',
      'Use mosquito repellent',
      'Wear long-sleeved clothing',
      'Clear stagnant water around home'
    ],
    selfCare: [
      'Stay hydrated',
      'Rest adequately',
      'Take prescribed anti-malarial medication',
      'Monitor temperature regularly'
    ],
    whenToSeekHelp: [
      'High fever above 39°C',
      'Severe headache',
      'Confusion or seizures',
      'Difficulty breathing',
      'Symptoms not improving after 2 days of treatment'
    ],
    seriousnessLevel: 'high',
    redFlags: ['Severe headache with confusion', 'Difficulty breathing', 'Yellow eyes or skin', 'Seizures'],
    estimatedCost: {
      consultation: 'KES 500-2000',
      treatment: 'KES 200-1500 (government facilities cheaper)'
    }
  },
  {
    name: 'Typhoid Fever',
    category: 'infectious',
    description: 'Bacterial infection common in areas with poor sanitation',
    commonInKenya: true,
    symptoms: ['Prolonged fever', 'Weakness', 'Stomach pain', 'Headache', 'Loss of appetite', 'Constipation or diarrhea'],
    causes: ['Contaminated food or water', 'Poor hygiene'],
    prevention: [
      'Drink clean, boiled water',
      'Wash hands frequently',
      'Avoid street food from unhygienic places',
      'Get typhoid vaccination'
    ],
    selfCare: [
      'Drink plenty of fluids',
      'Eat easily digestible foods',
      'Complete antibiotic course as prescribed',
      'Rest completely'
    ],
    whenToSeekHelp: [
      'Fever lasting more than 3 days',
      'Severe abdominal pain',
      'Bloody stools',
      'Confusion or extreme weakness'
    ],
    seriousnessLevel: 'high',
    redFlags: ['Blood in stool', 'Severe abdominal pain', 'Confusion', 'High fever not responding to medication'],
    estimatedCost: {
      consultation: 'KES 500-2000',
      treatment: 'KES 500-3000'
    }
  },
  {
    name: 'Common Cold/Flu',
    category: 'respiratory',
    description: 'Viral infection of the upper respiratory tract',
    commonInKenya: true,
    symptoms: ['Runny nose', 'Sore throat', 'Cough', 'Sneezing', 'Mild fever', 'Body aches'],
    causes: ['Viral infection', 'Exposure to cold weather', 'Weakened immune system'],
    prevention: [
      'Wash hands regularly',
      'Avoid close contact with sick people',
      'Cover mouth when coughing',
      'Stay warm and dry'
    ],
    selfCare: [
      'Rest adequately',
      'Drink warm fluids',
      'Use steam inhalation',
      'Take vitamin C',
      'Over-the-counter pain relievers for aches'
    ],
    whenToSeekHelp: [
      'Fever above 39°C for more than 3 days',
      'Difficulty breathing',
      'Chest pain',
      'Symptoms worsening after 7 days'
    ],
    seriousnessLevel: 'low',
    redFlags: ['Difficulty breathing', 'Chest pain', 'Bluish lips', 'High fever with confusion'],
    estimatedCost: {
      consultation: 'KES 300-1500',
      treatment: 'KES 200-1000 (mostly over-the-counter)'
    }
  },
  {
    name: 'Urinary Tract Infection (UTI)',
    category: 'infectious',
    description: 'Bacterial infection of the urinary system, more common in women',
    commonInKenya: true,
    symptoms: ['Burning sensation during urination', 'Frequent urination', 'Cloudy urine', 'Lower abdominal pain', 'Blood in urine'],
    causes: ['Bacterial infection', 'Poor hygiene', 'Dehydration', 'Holding urine for too long'],
    prevention: [
      'Drink plenty of water (2-3 liters daily)',
      'Urinate frequently',
      'Wipe front to back (for women)',
      'Urinate after sexual intercourse',
      'Wear cotton underwear'
    ],
    selfCare: [
      'Drink lots of water',
      'Avoid caffeine and alcohol',
      'Use heating pad for pain',
      'Complete antibiotic course if prescribed'
    ],
    whenToSeekHelp: [
      'Blood in urine',
      'Back or side pain',
      'Fever with UTI symptoms',
      'Symptoms not improving after 2 days'
    ],
    seriousnessLevel: 'medium',
    redFlags: ['Fever with back pain', 'Severe abdominal pain', 'Vomiting', 'Blood in urine with pain'],
    estimatedCost: {
      consultation: 'KES 500-2000',
      treatment: 'KES 300-1500'
    }
  },
  {
    name: 'Diabetes (Type 2)',
    category: 'chronic',
    description: 'Chronic condition affecting how your body processes blood sugar',
    commonInKenya: true,
    symptoms: ['Increased thirst', 'Frequent urination', 'Unexplained weight loss', 'Fatigue', 'Blurred vision', 'Slow healing wounds'],
    causes: ['Lifestyle factors', 'Family history', 'Obesity', 'Lack of exercise', 'Poor diet'],
    prevention: [
      'Maintain healthy weight',
      'Exercise regularly',
      'Eat balanced diet with less sugar',
      'Regular health checkups',
      'Avoid smoking and excessive alcohol'
    ],
    selfCare: [
      'Monitor blood sugar levels',
      'Take medication as prescribed',
      'Eat healthy, balanced meals',
      'Exercise regularly',
      'Foot care'
    ],
    whenToSeekHelp: [
      'Blood sugar consistently high',
      'Wounds not healing',
      'Vision changes',
      'Severe fatigue or confusion'
    ],
    seriousnessLevel: 'high',
    redFlags: ['Extreme thirst with confusion', 'Fruity breath smell', 'Rapid breathing', 'Loss of consciousness'],
    estimatedCost: {
      consultation: 'KES 1000-3000',
      treatment: 'KES 2000-10000/month (ongoing)'
    }
  },
  {
    name: 'Hypertension (High Blood Pressure)',
    category: 'chronic',
    description: 'Condition where blood pressure is consistently too high',
    commonInKenya: true,
    symptoms: ['Often no symptoms', 'Headaches', 'Dizziness', 'Nosebleeds', 'Shortness of breath'],
    causes: ['Poor diet', 'Lack of exercise', 'Stress', 'Family history', 'Obesity', 'Excessive salt intake'],
    prevention: [
      'Reduce salt intake',
      'Exercise regularly',
      'Maintain healthy weight',
      'Limit alcohol',
      'Manage stress',
      'Regular blood pressure checks'
    ],
    selfCare: [
      'Take medication consistently',
      'Monitor blood pressure at home',
      'Low-salt diet',
      'Regular exercise',
      'Stress management'
    ],
    whenToSeekHelp: [
      'Severe headache',
      'Chest pain',
      'Difficulty breathing',
      'Vision problems',
      'Blood pressure above 180/120'
    ],
    seriousnessLevel: 'high',
    redFlags: ['Severe headache with chest pain', 'Severe shortness of breath', 'Confusion', 'Seizures'],
    estimatedCost: {
      consultation: 'KES 1000-3000',
      treatment: 'KES 1000-5000/month (ongoing)'
    }
  },
  {
    name: 'Tuberculosis (TB)',
    category: 'infectious',
    description: 'Bacterial infection primarily affecting the lungs, treatable but requires long-term medication',
    commonInKenya: true,
    symptoms: ['Persistent cough (>2 weeks)', 'Coughing up blood', 'Night sweats', 'Weight loss', 'Fever', 'Chest pain', 'Fatigue'],
    causes: ['Bacterial infection (Mycobacterium tuberculosis)', 'Close contact with TB patients', 'Weakened immune system'],
    prevention: [
      'BCG vaccination',
      'Avoid close contact with TB patients',
      'Good ventilation in living spaces',
      'Cover mouth when coughing',
      'Get tested if exposed'
    ],
    selfCare: [
      'Complete full course of medication (6+ months)',
      'Eat nutritious foods',
      'Rest adequately',
      'Avoid alcohol while on medication',
      'Isolate from others initially'
    ],
    whenToSeekHelp: [
      'Cough lasting more than 2 weeks',
      'Coughing up blood',
      'Unexplained weight loss with night sweats',
      'Anyone with HIV should get tested'
    ],
    seriousnessLevel: 'high',
    redFlags: ['Coughing blood', 'Severe chest pain', 'Difficulty breathing', 'High fever with severe night sweats'],
    estimatedCost: {
      consultation: 'KES 500-2000',
      treatment: 'FREE at government facilities (NTLD program)'
    }
  },
  {
    name: 'Gastritis/Stomach Ulcers',
    category: 'digestive',
    description: 'Inflammation of stomach lining or open sores in stomach',
    commonInKenya: true,
    symptoms: ['Burning stomach pain', 'Nausea', 'Bloating', 'Loss of appetite', 'Vomiting', 'Dark stools'],
    causes: ['H. pylori bacteria', 'Excessive painkiller use', 'Stress', 'Alcohol consumption', 'Spicy foods'],
    prevention: [
      'Avoid excessive painkillers (especially on empty stomach)',
      'Reduce alcohol consumption',
      'Manage stress',
      'Eat regular meals',
      'Avoid very spicy foods if sensitive'
    ],
    selfCare: [
      'Eat smaller, frequent meals',
      'Avoid trigger foods',
      'Reduce stress',
      'Avoid smoking and alcohol',
      'Take prescribed medication regularly'
    ],
    whenToSeekHelp: [
      'Severe abdominal pain',
      'Vomiting blood',
      'Black or bloody stools',
      'Unexplained weight loss',
      'Pain not relieved by medication'
    ],
    seriousnessLevel: 'medium',
    redFlags: ['Vomiting blood', 'Black tarry stools', 'Severe sharp abdominal pain', 'Signs of shock (pale, sweating, rapid heartbeat)'],
    estimatedCost: {
      consultation: 'KES 500-2000',
      treatment: 'KES 500-3000'
    }
  }
];

// Common symptoms
const symptoms = [
  { name: 'Fever', description: 'Elevated body temperature above 37.5°C', bodyPart: 'general', severity: 'moderate', isEmergency: false },
  { name: 'Headache', description: 'Pain in the head or upper neck', bodyPart: 'head', severity: 'mild', isEmergency: false },
  { name: 'Cough', description: 'Sudden expulsion of air from lungs', bodyPart: 'chest', severity: 'mild', isEmergency: false },
  { name: 'Sore Throat', description: 'Pain or irritation in throat', bodyPart: 'throat', severity: 'mild', isEmergency: false },
  { name: 'Abdominal Pain', description: 'Pain in stomach area', bodyPart: 'abdomen', severity: 'moderate', isEmergency: false },
  { name: 'Diarrhea', description: 'Loose or watery stools', bodyPart: 'abdomen', severity: 'moderate', isEmergency: false },
  { name: 'Vomiting', description: 'Forceful expulsion of stomach contents', bodyPart: 'abdomen', severity: 'moderate', isEmergency: false },
  { name: 'Fatigue', description: 'Extreme tiredness or lack of energy', bodyPart: 'general', severity: 'mild', isEmergency: false },
  { name: 'Difficulty Breathing', description: 'Trouble taking breaths or shortness of breath', bodyPart: 'chest', severity: 'severe', isEmergency: true },
  { name: 'Chest Pain', description: 'Pain or discomfort in chest area', bodyPart: 'chest', severity: 'severe', isEmergency: true },
  { name: 'Chills', description: 'Feeling of coldness with shivering', bodyPart: 'general', severity: 'moderate', isEmergency: false },
  { name: 'Body Aches', description: 'General muscle or joint pain', bodyPart: 'limbs', severity: 'mild', isEmergency: false },
  { name: 'Nausea', description: 'Feeling of wanting to vomit', bodyPart: 'abdomen', severity: 'mild', isEmergency: false },
  { name: 'Dizziness', description: 'Feeling lightheaded or unsteady', bodyPart: 'head', severity: 'moderate', isEmergency: false },
  { name: 'Loss of Appetite', description: 'Reduced desire to eat', bodyPart: 'general', severity: 'mild', isEmergency: false },
  { name: 'Weight Loss', description: 'Unintentional reduction in body weight', bodyPart: 'general', severity: 'moderate', isEmergency: false },
  { name: 'Night Sweats', description: 'Excessive sweating during sleep', bodyPart: 'general', severity: 'moderate', isEmergency: false },
  { name: 'Runny Nose', description: 'Discharge from nose', bodyPart: 'head', severity: 'mild', isEmergency: false },
  { name: 'Confusion', description: 'Inability to think clearly', bodyPart: 'head', severity: 'severe', isEmergency: true },
  { name: 'Seizures', description: 'Sudden uncontrolled electrical disturbance in brain', bodyPart: 'head', severity: 'severe', isEmergency: true }
];

// Health facilities in Kenya (sample)
const facilities = [
  {
    name: 'Kenyatta National Hospital',
    type: 'hospital',
    county: 'Nairobi',
    location: 'Upper Hill, Nairobi',
    services: ['Emergency', 'Surgery', 'Maternity', 'ICU', 'Laboratory', 'Radiology'],
    contactNumber: '+254-20-2726300',
    isGovernment: true,
    isAffordable: true,
    emergencyServices: true,
    operatingHours: { weekdays: '24/7', weekends: '24/7' },
    averageCost: { consultation: 'KES 50-500', emergency: 'KES 500-2000' }
  },
  {
    name: 'Mbagathi Hospital',
    type: 'hospital',
    county: 'Nairobi',
    location: 'Mbagathi Way, Nairobi',
    services: ['Emergency', 'Maternity', 'Outpatient', 'Laboratory'],
    contactNumber: '+254-20-6003000',
    isGovernment: true,
    isAffordable: true,
    emergencyServices: true,
    operatingHours: { weekdays: '24/7', weekends: '24/7' },
    averageCost: { consultation: 'KES 50-300', emergency: 'KES 500-1500' }
  },
  {
    name: 'Mama Lucy Kibaki Hospital',
    type: 'hospital',
    county: 'Nairobi',
    location: 'Embakasi, Nairobi',
    services: ['Emergency', 'Maternity', 'Pediatrics', 'Surgery', 'Laboratory'],
    contactNumber: '+254-20-2343322',
    isGovernment: true,
    isAffordable: true,
    emergencyServices: true,
    operatingHours: { weekdays: '24/7', weekends: '24/7' },
    averageCost: { consultation: 'KES 50-500', emergency: 'KES 500-2000' }
  },
  {
    name: 'Moi Teaching and Referral Hospital',
    type: 'hospital',
    county: 'Uasin Gishu',
    location: 'Eldoret',
    services: ['Emergency', 'Surgery', 'Maternity', 'ICU', 'Cancer Treatment', 'Laboratory'],
    contactNumber: '+254-53-203000',
    isGovernment: true,
    isAffordable: true,
    emergencyServices: true,
    operatingHours: { weekdays: '24/7', weekends: '24/7' },
    averageCost: { consultation: 'KES 100-500', emergency: 'KES 500-2000' }
  },
  {
    name: 'Coast General Teaching and Referral Hospital',
    type: 'hospital',
    county: 'Mombasa',
    location: 'Mombasa',
    services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics', 'Laboratory'],
    contactNumber: '+254-41-231204',
    isGovernment: true,
    isAffordable: true,
    emergencyServices: true,
    operatingHours: { weekdays: '24/7', weekends: '24/7' },
    averageCost: { consultation: 'KES 50-500', emergency: 'KES 500-2000' }
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Disease.deleteMany();
    await Symptom.deleteMany();
    await HealthFacility.deleteMany();

    // Insert diseases
    console.log('📝 Inserting diseases...');
    const createdDiseases = await Disease.insertMany(diseases);
    console.log(`✅ ${createdDiseases.length} diseases added`);

    // Insert symptoms
    console.log('📝 Inserting symptoms...');
    const createdSymptoms = await Symptom.insertMany(symptoms);
    console.log(`✅ ${createdSymptoms.length} symptoms added`);

    // Link symptoms to diseases
    console.log('🔗 Linking symptoms to diseases...');
    for (const disease of createdDiseases) {
      const relatedSymptoms = createdSymptoms.filter(symptom => 
        disease.symptoms.some(ds => ds.toLowerCase().includes(symptom.name.toLowerCase()))
      );
      
      for (const symptom of relatedSymptoms) {
        symptom.relatedDiseases.push(disease._id);
        await symptom.save();
      }
    }
    console.log('✅ Symptoms linked to diseases');

    // Insert facilities
    console.log('📝 Inserting health facilities...');
    const createdFacilities = await HealthFacility.insertMany(facilities);
    console.log(`✅ ${createdFacilities.length} health facilities added`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Diseases: ${createdDiseases.length}`);
    console.log(`   - Symptoms: ${createdSymptoms.length}`);
    console.log(`   - Health Facilities: ${createdFacilities.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();