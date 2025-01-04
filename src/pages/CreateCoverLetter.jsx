import React, { useState } from 'react';
import { 
    FaUser, 
    FaBriefcase, 
    FaEnvelope, 
    FaFileDownload,
    FaPalette,
    FaCheckCircle,
    FaMagic
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import html2pdf from 'html2pdf.js';
import { generateContent } from '../services/gemini';
import ModernCoverLetterTemplate from '../components/coverletter/templates/ModernCoverLetterTemplate';
import MinimalCoverLetterTemplate from '../components/coverletter/templates/MinimalCoverLetterTemplate';

const TEMPLATES = [
    {
        key: 'modern',
        name: 'Modern Professional',
        description: 'Contemporary design with bold typography',
        color: 'bg-gradient-to-r from-indigo-500 to-purple-600'
    },
    {
        key: 'minimal',
        name: 'Minimal Elegant',
        description: 'Simple, sophisticated layout with clean lines',
        color: 'bg-gradient-to-r from-gray-500 to-gray-700'
    }
];

const SECTIONS = [
    { icon: FaUser, name: 'Job Details', key: 'jobDetails' },
    { icon: FaBriefcase, name: 'Company Info', key: 'companyInfo' },
    { icon: FaEnvelope, name: 'Letter Content', key: 'letterContent' }
];

export default function CreateCoverLetter() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [coverLetterContent, setCoverLetterContent] = useState({
        jobDetails: {
            jobTitle: '',
            industry: '',
            keyResponsibilities: ''
        },
        companyInfo: {
            companyName: '',
            companyDescription: '',
            hiringManager: ''
        },
        letterContent: {
            introductoryParagraph: '',
            mainBody: '',
            closingParagraph: ''
        }
    });

    const [selectedTemplate, setSelectedTemplate] = useState('modern');
    const [activeSection, setActiveSection] = useState('jobDetails');
    const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isLetterComplete, setIsLetterComplete] = useState(false);

    const exportToPDF = () => {
        setIsExporting(true);
        const element = document.getElementById('cover-letter-preview');
        const opt = {
            margin: 0.5,
            filename: `${coverLetterContent.jobDetails.jobTitle || 'Cover'}_Letter.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
        setTimeout(() => setIsExporting(false), 2000);
    };

    const generateLetterContent = async () => {
        const { jobTitle, industry, keyResponsibilities } = coverLetterContent.jobDetails;
        const { companyName, companyDescription } = coverLetterContent.companyInfo;

        if (!jobTitle || !companyName) {
            alert('Please fill in the job title and company name before generating the cover letter');
            return;
        }

        try {
            const prompt = `Write a professional cover letter for a ${jobTitle} position at ${companyName}. 
            Industry: ${industry || 'Not specified'}
            Key Job Responsibilities: ${keyResponsibilities || 'Not specified'}
            Company Description: ${companyDescription || 'Not specified'}

            Craft a compelling narrative that:
            1. Demonstrates understanding of the role and company
            2. Highlights relevant skills and experiences
            3. Shows enthusiasm and fit for the position`;

            const generatedContent = await generateContent(prompt, 'coverletter');
            
            // Split the generated content into paragraphs
            const paragraphs = generatedContent.split('\n').filter(p => p.trim() !== '');
            
            setCoverLetterContent(prev => ({
                ...prev,
                letterContent: {
                    introductoryParagraph: paragraphs[0] || '',
                    mainBody: paragraphs.slice(1, -1).join('\n') || '',
                    closingParagraph: paragraphs[paragraphs.length - 1] || ''
                }
            }));
        } catch (error) {
            console.error('Error generating cover letter:', error);
        }
    };

    const handleCreateCoverLetter = () => {
        const { jobDetails, companyInfo, letterContent } = coverLetterContent;
        const { introductoryParagraph, mainBody, closingParagraph } = letterContent;
        
        // Comprehensive validation
        if (!jobDetails.jobTitle || !companyInfo.companyName) {
            alert('Please complete Job Details and Company Information before creating the cover letter.');
            return;
        }

        if (!introductoryParagraph || !mainBody || !closingParagraph) {
            alert('Please complete all sections of the Letter Content before creating.');
            return;
        }

        // Log the content for debugging
        console.log('Cover Letter Content:', {
            jobDetails,
            companyInfo,
            letterContent
        });

        // Set the letter as complete and ready to display
        setIsLetterComplete(true);
    };

    const renderSectionForm = () => {
        switch(activeSection) {
            case 'jobDetails':
                return (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                            <FaUser className="mr-3 text-indigo-500" /> Job Details
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                placeholder="Job Title" 
                                value={coverLetterContent.jobDetails.jobTitle}
                                onChange={(e) => setCoverLetterContent(prev => ({
                                    ...prev,
                                    jobDetails: {
                                        ...prev.jobDetails,
                                        jobTitle: e.target.value
                                    }
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            />
                            <input 
                                type="text" 
                                placeholder="Industry" 
                                value={coverLetterContent.jobDetails.industry}
                                onChange={(e) => setCoverLetterContent(prev => ({
                                    ...prev,
                                    jobDetails: {
                                        ...prev.jobDetails,
                                        industry: e.target.value
                                    }
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            />
                            <textarea 
                                placeholder="Key Responsibilities" 
                                value={coverLetterContent.jobDetails.keyResponsibilities}
                                onChange={(e) => setCoverLetterContent(prev => ({
                                    ...prev,
                                    jobDetails: {
                                        ...prev.jobDetails,
                                        keyResponsibilities: e.target.value
                                    }
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 h-24 col-span-2"
                            />
                        </div>
                    </div>
                );
            case 'companyInfo':
                return (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                            <FaBriefcase className="mr-3 text-indigo-500" /> Company Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                placeholder="Company Name" 
                                value={coverLetterContent.companyInfo.companyName}
                                onChange={(e) => setCoverLetterContent(prev => ({
                                    ...prev,
                                    companyInfo: {
                                        ...prev.companyInfo,
                                        companyName: e.target.value
                                    }
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            />
                            <input 
                                type="text" 
                                placeholder="Hiring Manager" 
                                value={coverLetterContent.companyInfo.hiringManager}
                                onChange={(e) => setCoverLetterContent(prev => ({
                                    ...prev,
                                    companyInfo: {
                                        ...prev.companyInfo,
                                        hiringManager: e.target.value
                                    }
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            />
                            <textarea 
                                placeholder="Company Description" 
                                value={coverLetterContent.companyInfo.companyDescription}
                                onChange={(e) => setCoverLetterContent(prev => ({
                                    ...prev,
                                    companyInfo: {
                                        ...prev.companyInfo,
                                        companyDescription: e.target.value
                                    }
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 h-24 col-span-2"
                            />
                        </div>
                    </div>
                );
            case 'letterContent':
                return (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                            <FaEnvelope className="mr-3 text-indigo-500" /> Letter Content
                        </h2>
                        <div className="space-y-4">
                            <textarea 
                                placeholder="Introductory Paragraph" 
                                value={coverLetterContent.letterContent.introductoryParagraph}
                                onChange={(e) => {
                                    setIsLetterComplete(false);
                                    setCoverLetterContent(prev => ({
                                        ...prev,
                                        letterContent: {
                                            ...prev.letterContent,
                                            introductoryParagraph: e.target.value
                                        }
                                    }));
                                }}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 h-24"
                            />
                            <textarea 
                                placeholder="Main Body" 
                                value={coverLetterContent.letterContent.mainBody}
                                onChange={(e) => {
                                    setIsLetterComplete(false);
                                    setCoverLetterContent(prev => ({
                                        ...prev,
                                        letterContent: {
                                            ...prev.letterContent,
                                            mainBody: e.target.value
                                        }
                                    }));
                                }}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 h-36"
                            />
                            <textarea 
                                placeholder="Closing Paragraph" 
                                value={coverLetterContent.letterContent.closingParagraph}
                                onChange={(e) => {
                                    setIsLetterComplete(false);
                                    setCoverLetterContent(prev => ({
                                        ...prev,
                                        letterContent: {
                                            ...prev.letterContent,
                                            closingParagraph: e.target.value
                                        }
                                    }));
                                }}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 h-24"
                            />
                            <div className="flex justify-between">
                                <button 
                                    onClick={generateLetterContent}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-green-700 hover:to-emerald-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                                >
                                    <FaMagic className="mr-2" /> Generate Content
                                </button>
                                <button 
                                    onClick={handleCreateCoverLetter}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Create Cover Letter
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-8">
            <div className="container mx-auto max-w-6xl">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold flex items-center">
                                    <FaPalette className="mr-4" />
                                    Create Your Professional Cover Letter
                                </h1>
                            </div>
                            <button 
                                onClick={exportToPDF}
                                disabled={isExporting}
                                className={`bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-semibold flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 ${
                                    isExporting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                <FaFileDownload className="mr-2" /> 
                                {isExporting ? 'Exporting...' : 'Export PDF'}
                            </button>
                        </div>
                    </div>

                    {/* Template Selection */}
                    <div className="p-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Template
                            </label>
                            <div className="relative">
                                <div 
                                    onClick={() => setIsTemplateDropdownOpen(!isTemplateDropdownOpen)}
                                    className="cursor-pointer flex items-center justify-between w-full p-4 border border-gray-300 rounded-lg shadow-sm hover:border-indigo-500 transition-all duration-300"
                                >
                                    <div className="flex items-center">
                                        <div className={`w-12 h-12 mr-4 rounded-full ${TEMPLATES.find(t => t.key === selectedTemplate).color}`}></div>
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {TEMPLATES.find(t => t.key === selectedTemplate).name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {TEMPLATES.find(t => t.key === selectedTemplate).description}
                                            </p>
                                        </div>
                                    </div>
                                    <svg 
                                        className={`w-6 h-6 transform transition-transform duration-300 ${isTemplateDropdownOpen ? 'rotate-180' : ''}`} 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path 
                                            fillRule="evenodd" 
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                                            clipRule="evenodd" 
                                        />
                                    </svg>
                                </div>

                                {isTemplateDropdownOpen && (
                                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                                        {TEMPLATES.map((template) => (
                                            <div 
                                                key={template.key}
                                                onClick={() => {
                                                    setSelectedTemplate(template.key);
                                                    setIsTemplateDropdownOpen(false);
                                                }}
                                                className={`p-4 flex items-center cursor-pointer hover:bg-gray-100 transition-colors duration-300 ${
                                                    selectedTemplate === template.key ? 'bg-indigo-50' : ''
                                                }`}
                                            >
                                                <div className={`w-12 h-12 mr-4 rounded-full ${template.color}`}></div>
                                                <div className="flex-grow">
                                                    <h3 className="text-lg font-semibold">{template.name}</h3>
                                                    <p className="text-sm text-gray-500">{template.description}</p>
                                                </div>
                                                {selectedTemplate === template.key && (
                                                    <FaCheckCircle className="text-indigo-600 text-2xl" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Sections Navigation */}
                            <div className="space-y-2">
                                {SECTIONS.map((section) => (
                                    <button
                                        key={section.key}
                                        onClick={() => setActiveSection(section.key)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-in-out flex items-center ${
                                            activeSection === section.key 
                                                ? 'bg-indigo-600 text-white' 
                                                : 'text-gray-700 hover:bg-indigo-100'
                                        }`}
                                    >
                                        <section.icon className="mr-3" />
                                        {section.name}
                                    </button>
                                ))}
                                <button
                                    onClick={handleCreateCoverLetter}
                                    className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-in-out flex items-center text-gray-700 hover:bg-indigo-100"
                                >
                                    <FaMagic className="mr-3" />
                                    Create Cover Letter
                                </button>
                            </div>
                            
                            {/* Dynamic Form */}
                            <div>
                                {renderSectionForm()}
                            </div>
                        </div>

                        {/* Cover Letter Preview */}
                        <div className="mt-6" id="cover-letter-preview">
                            {isLetterComplete ? (
                                selectedTemplate === 'modern' ? (
                                    <ModernCoverLetterTemplate 
                                        content={{
                                            jobDetails: coverLetterContent.jobDetails,
                                            companyInfo: coverLetterContent.companyInfo,
                                            letterContent: coverLetterContent.letterContent
                                        }} 
                                    />
                                ) : (
                                    <MinimalCoverLetterTemplate 
                                        content={{
                                            jobDetails: coverLetterContent.jobDetails,
                                            companyInfo: coverLetterContent.companyInfo,
                                            letterContent: coverLetterContent.letterContent
                                        }} 
                                    />
                                )
                            ) : (
                                <div className="text-center text-gray-500 p-6">
                                    <h2 className="text-2xl font-bold">Cover Letter Preview</h2>
                                    <p className="text-lg">Please complete all sections and click "Create Cover Letter" to view your cover letter.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
