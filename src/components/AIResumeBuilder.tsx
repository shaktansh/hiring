import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import { Loader2, Sparkles } from 'lucide-react';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
}

interface AIResumeBuilderProps {
  onSave: (resumeData: ResumeData) => void;
  onBack: () => void;
}

const AIResumeBuilder: React.FC<AIResumeBuilderProps> = ({ onSave, onBack }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    targetRole: '',
    experience: '',
    education: '',
    skills: '',
    achievements: ''
  });
  const [generatedResume, setGeneratedResume] = useState<ResumeData | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateResume = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:5000/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to generate resume');
      const resumeData = await response.json();
      setGeneratedResume(resumeData);
      setCurrentStep(3);
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Failed to generate resume. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = () => {
    if (!generatedResume) return;
    const element = document.querySelector('.resume-content');
    if (!element) {
      console.error('Resume content element not found');
      alert('Unable to generate PDF. Please try again.');
      return;
    }
    const fileName = `${generatedResume.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
    html2pdf().from(element).set({ filename: fileName }).save();
  };

  const isStep1Valid = formData.name && formData.email && formData.phone && formData.location && formData.targetRole;
  const isStep2Valid = formData.experience && formData.education && formData.skills;

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4 gap-2 sm:gap-0">
          <span className="text-xs sm:text-sm font-medium text-gray-600">Step {currentStep} of 3</span>
          <span className="text-xs sm:text-sm font-medium text-gray-600">{Math.round((currentStep / 3) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-8">
        {currentStep === 1 || currentStep === 2 ? (
          <ResumeForm
            formData={formData}
            onInputChange={handleInputChange}
            onNext={() => setCurrentStep(2)}
            isStep1Valid={!!isStep1Valid}
            isStep2Valid={!!isStep2Valid}
            isGenerating={isGenerating}
            currentStep={currentStep}
            generateResume={generateResume}
          />
        ) : null}
        {currentStep === 3 && generatedResume && (
          <ResumePreview
            generatedResume={generatedResume}
            onSave={() => onSave(generatedResume)}
            onDownloadPDF={downloadPDF}
          />
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 gap-2 sm:gap-0">
          <button
            onClick={currentStep === 1 ? onBack : () => setCurrentStep(currentStep - 1)}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base sm:text-base"
          >
            {currentStep === 1 ? 'Back to Resume' : 'Previous'}
          </button>
          {/* Progress/Generate indicator for step 2 */}
          {currentStep === 2 && isGenerating && (
            <div className="flex items-center space-x-2 text-blue-600 font-semibold justify-center sm:justify-end w-full sm:w-auto mt-2 sm:mt-0">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIResumeBuilder;