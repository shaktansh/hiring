import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let jobs = [];

app.post('/jobs', (req, res) => {
  const { title, company, location, description, requirements, salary } = req.body;
  if (!title || !company || !location || !description) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  const job = {
    id: Date.now().toString(),
    title,
    company,
    location,
    description,
    requirements,
    salary,
    postedAt: new Date().toISOString()
  };
  jobs.push(job);
  res.status(201).json(job);
});

app.get('/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/generate-resume', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not set in environment variables.' });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const formData = req.body;

  const prompt = `
    Create a professional resume based on the following information. Return the response in JSON format with the exact structure shown below:
    Personal Information:
    - Name: ${formData.name}
    - Email: ${formData.email}
    - Phone: ${formData.phone}
    - Location: ${formData.location}
    - Target Role: ${formData.targetRole}
    Experience: ${formData.experience}
    Education: ${formData.education}
    Skills: ${formData.skills}
    Achievements: ${formData.achievements}
    Please generate a professional resume with:
    1. A compelling professional summary (2-3 sentences)
    2. Well-formatted work experience with bullet points
    3. Education details
    4. Skills organized by category
    Return ONLY valid JSON in this exact format:
    {
      "personalInfo": {
        "name": "string",
        "email": "string",
        "phone": "string",
        "location": "string",
        "summary": "string"
      },
      "experience": [
        {
          "title": "string",
          "company": "string",
          "duration": "string",
          "description": "string"
        }
      ],
      "education": [
        {
          "degree": "string",
          "school": "string",
          "year": "string"
        }
      ],
      "skills": ["string"]
    }
  `;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const resumeData = JSON.parse(jsonMatch[0]);
      res.json(resumeData);
    } else {
      res.status(500).json({ error: 'Invalid response format from Gemini API.' });
    }
  } catch (error) {
    console.error('Error generating resume:', error);
    res.status(500).json({ error: 'Failed to generate resume.' });
  }
});

app.post('/generate-job-description', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not set in environment variables.' });
  }
  const { title, company, requirements } = req.body;
  if (!title || !company) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const prompt = `Write a compelling job description for the following position. Include responsibilities, ideal candidate profile, and company culture.\n\nJob Title: ${title}\nCompany: ${company}\nRequirements: ${requirements || ''}`;
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ description: text });
  } catch (error) {
    console.error('Error generating job description:', error);
    res.status(500).json({ error: 'Failed to generate job description.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 