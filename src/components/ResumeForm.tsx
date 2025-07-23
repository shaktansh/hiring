import React from 'react';

interface ResumeFormProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
  isStep1Valid: boolean;
  isStep2Valid: boolean;
  isGenerating: boolean;
  currentStep: number;
  generateResume: () => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  formData,
  onInputChange,
  onNext,
  isStep1Valid,
  isStep2Valid,
  isGenerating,
  currentStep,
  generateResume
}) => {
  return (
    <>
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {/* Icon here if needed */}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
            <p className="text-gray-600">Let's start with your basic details</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => onInputChange('phone', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => onInputChange('location', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="San Francisco, CA"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Role *</label>
            <input
              type="text"
              value={formData.targetRole}
              onChange={(e) => onInputChange('targetRole', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Senior Frontend Developer"
            />
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {/* Icon here if needed */}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Professional Details</h2>
            <p className="text-gray-600">Tell us about your experience and skills</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience *</label>
            <textarea
              rows={4}
              value={formData.experience}
              onChange={(e) => onInputChange('experience', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Describe your work experience, including job titles, companies, dates, and key responsibilities..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Education *</label>
            <textarea
              rows={3}
              value={formData.education}
              onChange={(e) => onInputChange('education', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="List your educational background, degrees, institutions, and graduation years..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills *</label>
            <textarea
              rows={3}
              value={formData.skills}
              onChange={(e) => onInputChange('skills', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="List your technical and soft skills, programming languages, tools, etc..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Achievements (Optional)</label>
            <textarea
              rows={3}
              value={formData.achievements}
              onChange={(e) => onInputChange('achievements', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Notable achievements, awards, certifications, projects..."
            />
          </div>
        </div>
      )}
      {/* Navigation Buttons */}
      <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
        {currentStep === 1 && (
          <button
            onClick={onNext}
            disabled={!isStep1Valid}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Next Step
          </button>
        )}
        {currentStep === 2 && (
          <button
            onClick={generateResume}
            disabled={!isStep2Valid || isGenerating}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-2"
          >
            {isGenerating ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Generating...</span>
              </>
            ) : (
              <span>Generate Resume</span>
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default ResumeForm; 