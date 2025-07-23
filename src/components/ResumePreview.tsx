import React from 'react';
import { User, Briefcase, GraduationCap, Award, Save, Download } from 'lucide-react';

interface ResumePreviewProps {
  generatedResume: any;
  onSave: () => void;
  onDownloadPDF: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ generatedResume, onSave, onDownloadPDF }) => {
  if (!generatedResume) return null;
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your AI-Generated Resume</h2>
        <p className="text-gray-600">Review and customize your professional resume</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm resume-content">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{generatedResume.personalInfo.name}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            <span>{generatedResume.personalInfo.email}</span>
            <span>•</span>
            <span>{generatedResume.personalInfo.phone}</span>
            <span>•</span>
            <span>{generatedResume.personalInfo.location}</span>
          </div>
        </div>
        {/* Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{generatedResume.personalInfo.summary}</p>
        </div>
        {/* Experience */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
            Experience
          </h2>
          <div className="space-y-6">
            {generatedResume.experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                <p className="text-blue-600 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Education */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
            Education
          </h2>
          <div className="space-y-4">
            {generatedResume.education.map((edu: any, index: number) => (
              <div key={index} className="border-l-4 border-green-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-green-600 font-medium">{edu.school}</p>
                <p className="text-sm text-gray-500">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Skills */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-blue-600" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {generatedResume.skills.map((skill: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-4 justify-end mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onSave}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Save Resume</span>
        </button>
        <button
          onClick={onDownloadPDF}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
};

export default ResumePreview; 