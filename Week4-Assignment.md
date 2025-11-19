# Youth Health Checker API - SDG 3 🏥

A backend API designed to help Kenyan youth assess their health symptoms, learn about common diseases, and make informed decisions about when to seek medical care - all while saving on unnecessary consultation fees.

## 🎯 Purpose

This platform addresses Kenya's healthcare challenges by:
- Providing free symptom assessment for youth who can't afford consultations
- Spreading awareness about common diseases in Kenya
- Helping users identify when professional medical care is needed
- Recommending affordable healthcare facilities
- Detecting warning signs of serious conditions like diabetes, hypertension, and cancer

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone or create the project structure:**
```bash
mkdir youth-health-checker
cd youth-health-checker
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create a `.env` file:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/health-checker
JWT_SECRET=your-super-secret-jwt-key-change-this
```

For MongoDB Atlas (cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/health-checker?retryWrites=true&w=majority
```

4. **Seed the database with Kenyan health data:**
```bash
npm run seed
```

5. **Start the server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The API will be running at `http://localhost:5000`

## 📁 Project Structure

```
youth-health-checker/
├── models/
│   ├── User.js
│   ├── Disease.js
│   ├── Symptom.js
│   ├── HealthFacility.js
│   └── Assessment.js
├── routes/
│   ├── auth.js
│   ├── symptoms.js
│   ├── diseases.js
│   ├── facilities.js
│   └── assessments.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validator.js
├── seeders/
│   └── seedDatabase.js
├── server.js
├── package.json
└── .env
```

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```
Returns API status and timestamp.

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 22,
  "gender": "male",
  "county": "Nairobi"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Symptoms

#### Get All Symptoms
```
GET /api/symptoms
GET /api/symptoms?bodyPart=chest
GET /api/symptoms?search=fever
```

#### Get Symptom by ID
```
GET /api/symptoms/:id
```

### Diseases

#### Get All Diseases
```
GET /api/diseases
GET /api/diseases?commonInKenya=true
GET /api/diseases?category=infectious
GET /api/diseases?search=malaria
```

#### Get Disease by ID
```
GET /api/diseases/:id
```

### Health Facilities

#### Get All Facilities
```
GET /api/facilities
GET /api/facilities?county=Nairobi
GET /api/facilities?type=hospital
GET /api/facilities?isGovernment=true
GET /api/facilities?emergencyServices=true
```

#### Get Facility by ID
```
GET /api/facilities/:id
```

### Symptom Assessment (Main Feature)

#### Create Assessment
```
POST /api/assessments
Content-Type: application/json

{
  "symptoms": [
    {
      "symptom": "symptom_id_here",
      "severity": "moderate"
    },
    {
      "symptom": "another_symptom_id",
      "severity": "mild"
    }
  ],
  "additionalInfo": {
    "duration": "3 days",
    "age": 22,
    "gender": "male",
    "county": "Nairobi"
  },
  "userId": "user_id_or_null_for_anonymous"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "riskLevel": "medium",
    "possibleConditions": [
      {
        "disease": {
          "name": "Common Cold/Flu",
          "description": "...",
          "selfCare": ["Rest adequately", "Drink warm fluids"],
          "whenToSeekHelp": ["..."]
        },
        "confidence": 70
      }
    ],
    "recommendations": [
      "Consider visiting a clinic if symptoms persist for more than 2-3 days",
      "Rest and stay hydrated",
      "Try home remedies and self-care"
    ],
    "needsProfessionalCare": false
  }
}
```

#### Get User's Assessment History
```
GET /api/assessments/history/:userId
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🏥 Pre-loaded Kenyan Health Data

The database comes pre-seeded with:

### Common Diseases in Kenya:
- **Infectious:** Malaria, Typhoid Fever, Tuberculosis (TB), UTI
- **Chronic:** Diabetes (Type 2), Hypertension
- **Respiratory:** Common Cold/Flu
- **Digestive:** Gastritis/Stomach Ulcers

### 20+ Common Symptoms:
- Fever, Headache, Cough, Sore Throat
- Abdominal Pain, Diarrhea, Vomiting
- Difficulty Breathing (emergency)
- Chest Pain (emergency)
- And more...

### Health Facilities:
- Kenyatta National Hospital (Nairobi)
- Mbagathi Hospital (Nairobi)
- Mama Lucy Kibaki Hospital (Nairobi)
- Moi Teaching and Referral Hospital (Eldoret)
- Coast General Hospital (Mombasa)

## 🎓 Key Features

### 1. **Risk Assessment System**
- **Low:** Self-care recommended
- **Medium:** Monitor and consider clinic visit if persists
- **High:** Visit healthcare facility within 24 hours
- **Emergency:** Seek immediate medical attention

### 2. **Anonymous Usage**
Users can assess symptoms without registering, ensuring privacy and accessibility.

### 3. **Red Flag Detection**
System identifies emergency symptoms like:
- Difficulty breathing
- Chest pain
- Severe bleeding
- Confusion/seizures
- And more...

### 4. **Affordable Healthcare Focus**
Highlights government facilities and provides cost estimates for consultations and treatments.

### 5. **Youth-Friendly Information**
Clear, simple language explaining:
- What the disease is
- How to prevent it
- Self-care tips
- When to seek professional help

## 🧪 Testing the API

### Using cURL:

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Get All Diseases:**
```bash
curl http://localhost:5000/api/diseases?commonInKenya=true
```

**Create Assessment:**
```bash
curl -X POST http://localhost:5000/api/assessments \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": [
      {"symptom": "SYMPTOM_ID", "severity": "moderate"}
    ],
    "additionalInfo": {
      "duration": "2 days",
      "age": 20,
      "county": "Nairobi"
    }
  }'
```

### Using Postman:
1. Import the API endpoints
2. Test each route
3. Create collections for easy testing

## 🔐 Security Features

- Password hashing with bcrypt
- JWT authentication
- Input validation
- Error handling middleware
- CORS enabled for frontend integration

## 🌍 Contributing to SDG 3

This project contributes to **UN Sustainable Development Goal 3: Good Health and Well-being** by:

1. **Increasing Health Awareness:** Educating youth about common diseases
2. **Improving Access:** Helping identify affordable healthcare facilities
3. **Early Detection:** Flagging serious symptoms that need immediate attention
4. **Cost Savings:** Reducing unnecessary consultations for minor issues
5. **Preventive Care:** Providing prevention tips and self-care guidance

## 📈 Future Enhancements

- [ ] SMS integration for symptom alerts
- [ ] Integration with M-Pesa for facility payments
- [ ] Multilingual support (Swahili, local languages)
- [ ] Telemedicine integration
- [ ] Health insurance information
- [ ] Vaccination tracking
- [ ] Mental health resources
- [ ] Nutrition and fitness tracking

## 📝 License

MIT License - Feel free to use this for social good!

## 🤝 Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Built with ❤️ for Kenyan Youth - Promoting Health Awareness and Accessibility** 🇰🇪