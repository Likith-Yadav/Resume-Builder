import React, { useState } from 'react';
import { 
    FaUser, 
    FaBriefcase, 
    FaGraduationCap, 
    FaCode, 
    FaCertificate, 
    FaHeart, 
    FaFileDownload,
    FaPalette,
    FaCheckCircle,
    FaMagic
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import html2pdf from 'html2pdf.js';
import { generateContent } from '../services/gemini';
import ModernTemplate from '../components/resume/templates/ModernTemplate';
import MinimalTemplate from '../components/resume/templates/MinimalTemplate';

const TEMPLATES = [
    {
        key: 'modern',
        name: 'Modern Professional',
        description: 'Clean, contemporary design with bold typography',
        color: 'bg-gradient-to-r from-indigo-500 to-purple-600'
    },
    {
        key: 'minimal',
        name: 'Minimal Elegant',
        description: 'Simple, sophisticated layout with ample white space',
        color: 'bg-gradient-to-r from-gray-500 to-gray-700'
    }
];

const SECTIONS = [
    { icon: FaUser, name: 'Personal Info', key: 'personalInfo' },
    { icon: FaBriefcase, name: 'Work Experience', key: 'workExperience' },
    { icon: FaGraduationCap, name: 'Education', key: 'education' },
    { icon: FaCode, name: 'Skills', key: 'skills' },
    { icon: FaCode, name: 'Projects', key: 'projects' },
    { icon: FaCertificate, name: 'Certifications', key: 'certifications' },
    { icon: FaHeart, name: 'Hobbies', key: 'hobbies' }
];

export default function CreateResume() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [resumeContent, setResumeContent] = useState({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: ''
        },
        workExperience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        hobbies: [],
        summary: ''
    });

    const [selectedTemplate, setSelectedTemplate] = useState('modern');
    const [activeSection, setActiveSection] = useState('personalInfo');
    const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false);
    const [isResumeComplete, setIsResumeComplete] = useState(false);

    const exportToPDF = () => {
        const element = document.getElementById('resume-preview');
        const opt = {
            margin: 0.5,
            filename: `${resumeContent.personalInfo.fullName || 'Resume'}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const generateWorkDescription = async (index) => {
        const experience = resumeContent.workExperience[index];
        
        if (!experience.company || !experience.position) {
            alert('Please fill in the company and position before generating description');
            return;
        }

        try {
            const prompt = `Generate a professional work experience description for a ${experience.position} role at ${experience.company}. 
            Focus on key achievements, responsibilities, and skills demonstrated. 
            Highlight specific contributions and quantifiable results.`;

            const generatedDescription = await generateContent(prompt, 'resume');
            
            const newWorkExperience = [...resumeContent.workExperience];
            newWorkExperience[index] = {
                ...newWorkExperience[index],
                description: generatedDescription
            };

            setResumeContent(prev => ({
                ...prev,
                workExperience: newWorkExperience
            }));
        } catch (error) {
            console.error('Error generating work description:', error);
        }
    };

    const handleCreateResume = () => {
        const { personalInfo, workExperience, education, skills, projects, summary } = resumeContent;

        // Validate key sections
        if (!personalInfo.fullName || !personalInfo.email) {
            alert('Please complete Personal Information before creating the resume.');
            return;
        }

        // Ensure at least one substantive section is filled
        const hasWorkExperience = workExperience.length > 0 && 
            workExperience.some(exp => exp.company && exp.position);
        
        const hasEducation = education.length > 0 && 
            education.some(edu => edu.institution && edu.degree);
        
        const hasSkills = skills.length > 0;
        
        const hasProjects = projects.length > 0 && 
            projects.some(proj => proj.name && proj.description);

        if (!hasWorkExperience && !hasEducation && !hasSkills && !hasProjects) {
            alert('Please add at least one substantive section (Work Experience, Education, Skills, or Projects).');
            return;
        }

        // Log the content for debugging
        console.log('Resume Content:', resumeContent);

        // Set the resume as complete and ready to display
        setIsResumeComplete(true);
    };

    const renderSectionForm = () => {
        switch(activeSection) {
            case 'personalInfo':
                return (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                            <FaUser className="mr-3 text-indigo-500" /> Personal Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                value={resumeContent.personalInfo.fullName}
                                onChange={(e) => setResumeContent(prev => ({
                                    ...prev,
                                    personalInfo: {
                                        ...prev.personalInfo,
                                        fullName: e.target.value
                                    }
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            />
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={resumeContent.personalInfo.email}
                                onChange={(e) => setResumeContent(prev => ({
                                    ...prev,
                                    personalInfo: {
                                        ...prev.personalInfo,
                                        email: e.target.value
                                    }
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            />
                            <input 
                                type="tel" 
                                placeholder="Phone" 
                                value={resumeContent.personalInfo.phone}
                                onChange={(e) => setResumeContent(prev => ({
                                    ...prev,
                                    personalInfo: {
                                        ...prev.personalInfo,
                                        phone: e.target.value
                                    }
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            />
                            <input 
                                type="text" 
                                placeholder="Location" 
                                value={resumeContent.personalInfo.location}
                                onChange={(e) => setResumeContent(prev => ({
                                    ...prev,
                                    personalInfo: {
                                        ...prev.personalInfo,
                                        location: e.target.value
                                    }
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            />
                        </div>
                    </div>
                );
            case 'workExperience':
                return (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                            <FaBriefcase className="mr-3 text-indigo-500" /> Work Experience
                        </h2>
                        {resumeContent.workExperience.map((exp, index) => (
                            <div key={index} className="space-y-3 mb-4 p-4 border border-gray-200 rounded-lg">
                                <input 
                                    type="text" 
                                    placeholder="Company" 
                                    value={exp.company}
                                    onChange={(e) => {
                                        const newExperience = [...resumeContent.workExperience];
                                        newExperience[index] = {
                                            ...newExperience[index],
                                            company: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            workExperience: newExperience
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Position" 
                                    value={exp.position}
                                    onChange={(e) => {
                                        const newExperience = [...resumeContent.workExperience];
                                        newExperience[index] = {
                                            ...newExperience[index],
                                            position: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            workExperience: newExperience
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Duration" 
                                    value={exp.duration}
                                    onChange={(e) => {
                                        const newExperience = [...resumeContent.workExperience];
                                        newExperience[index] = {
                                            ...newExperience[index],
                                            duration: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            workExperience: newExperience
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                                <textarea 
                                    placeholder="Description" 
                                    value={exp.description}
                                    onChange={(e) => {
                                        const newExperience = [...resumeContent.workExperience];
                                        newExperience[index] = {
                                            ...newExperience[index],
                                            description: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            workExperience: newExperience
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 h-24"
                                />
                                <button 
                                    onClick={() => generateWorkDescription(index)}
                                    className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
                                >
                                    <FaMagic className="mr-2" /> Generate Description
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={() => setResumeContent(prev => ({
                                ...prev,
                                workExperience: [...prev.workExperience, {
                                    company: '',
                                    position: '',
                                    duration: '',
                                    description: ''
                                }]
                            }))}
                            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
                        >
                            <FaBriefcase className="mr-2" /> Add Work Experience
                        </button>
                    </div>
                );
            case 'education':
                return (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                            <FaGraduationCap className="mr-3 text-indigo-500" /> Education
                        </h2>
                        {resumeContent.education.map((edu, index) => (
                            <div key={index} className="space-y-3 mb-4 p-4 border border-gray-200 rounded-lg">
                                <input 
                                    type="text" 
                                    placeholder="Institution" 
                                    value={edu.institution}
                                    onChange={(e) => {
                                        const newEducation = [...resumeContent.education];
                                        newEducation[index] = {
                                            ...newEducation[index],
                                            institution: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            education: newEducation
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Degree" 
                                    value={edu.degree}
                                    onChange={(e) => {
                                        const newEducation = [...resumeContent.education];
                                        newEducation[index] = {
                                            ...newEducation[index],
                                            degree: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            education: newEducation
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Duration" 
                                    value={edu.duration}
                                    onChange={(e) => {
                                        const newEducation = [...resumeContent.education];
                                        newEducation[index] = {
                                            ...newEducation[index],
                                            duration: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            education: newEducation
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                                <input 
                                    type="text" 
                                    placeholder="GPA" 
                                    value={edu.gpa}
                                    onChange={(e) => {
                                        const newEducation = [...resumeContent.education];
                                        newEducation[index] = {
                                            ...newEducation[index],
                                            gpa: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            education: newEducation
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                            </div>
                        ))}
                        <button 
                            onClick={() => setResumeContent(prev => ({
                                ...prev,
                                education: [...prev.education, {
                                    institution: '',
                                    degree: '',
                                    duration: '',
                                    gpa: ''
                                }]
                            }))}
                            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
                        >
                            <FaGraduationCap className="mr-2" /> Add Education
                        </button>
                    </div>
                );
            case 'skills':
                return (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                            <FaCode className="mr-3 text-indigo-500" /> Skills
                        </h2>
                        {resumeContent.skills.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Skill" 
                                    value={skill}
                                    onChange={(e) => {
                                        const newSkills = [...resumeContent.skills];
                                        newSkills[index] = e.target.value;
                                        setResumeContent(prev => ({
                                            ...prev,
                                            skills: newSkills
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                                <button 
                                    onClick={() => {
                                        const newSkills = resumeContent.skills.filter((_, i) => i !== index);
                                        setResumeContent(prev => ({
                                            ...prev,
                                            skills: newSkills
                                        }));
                                    }}
                                    className="text-red-500 hover:text-red-700 bg-red-50 p-3 rounded-lg transition-all duration-300"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={() => setResumeContent(prev => ({
                                ...prev,
                                skills: [...prev.skills, '']
                            }))}
                            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
                        >
                            <FaCode className="mr-2" /> Add Skill
                        </button>
                    </div>
                );
            case 'projects':
                return (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                            <FaCode className="mr-3 text-indigo-500" /> Projects
                        </h2>
                        {resumeContent.projects.map((project, index) => (
                            <div key={index} className="space-y-3 mb-4 p-4 border border-gray-200 rounded-lg">
                                <input 
                                    type="text" 
                                    placeholder="Project Name" 
                                    value={project.name}
                                    onChange={(e) => {
                                        const newProjects = [...resumeContent.projects];
                                        newProjects[index] = {
                                            ...newProjects[index],
                                            name: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            projects: newProjects
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Technologies" 
                                    value={project.technologies}
                                    onChange={(e) => {
                                        const newProjects = [...resumeContent.projects];
                                        newProjects[index] = {
                                            ...newProjects[index],
                                            technologies: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            projects: newProjects
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                                <textarea 
                                    placeholder="Project Description" 
                                    value={project.description}
                                    onChange={(e) => {
                                        const newProjects = [...resumeContent.projects];
                                        newProjects[index] = {
                                            ...newProjects[index],
                                            description: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            projects: newProjects
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 h-24"
                                />
                            </div>
                        ))}
                        <button 
                            onClick={() => setResumeContent(prev => ({
                                ...prev,
                                projects: [...prev.projects, {
                                    name: '',
                                    technologies: '',
                                    description: ''
                                }]
                            }))}
                            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
                        >
                            <FaCode className="mr-2" /> Add Project
                        </button>
                    </div>
                );
            case 'certifications':
                return (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                            <FaCertificate className="mr-3 text-indigo-500" /> Certifications
                        </h2>
                        {resumeContent.certifications.map((certification, index) => (
                            <div key={index} className="space-y-3 mb-4 p-4 border border-gray-200 rounded-lg">
                                <input 
                                    type="text" 
                                    placeholder="Certification Name" 
                                    value={certification.name}
                                    onChange={(e) => {
                                        const newCertifications = [...resumeContent.certifications];
                                        newCertifications[index] = {
                                            ...newCertifications[index],
                                            name: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            certifications: newCertifications
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Issuing Organization" 
                                    value={certification.issuingOrganization}
                                    onChange={(e) => {
                                        const newCertifications = [...resumeContent.certifications];
                                        newCertifications[index] = {
                                            ...newCertifications[index],
                                            issuingOrganization: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            certifications: newCertifications
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Date Obtained" 
                                    value={certification.dateObtained}
                                    onChange={(e) => {
                                        const newCertifications = [...resumeContent.certifications];
                                        newCertifications[index] = {
                                            ...newCertifications[index],
                                            dateObtained: e.target.value
                                        };
                                        setResumeContent(prev => ({
                                            ...prev,
                                            certifications: newCertifications
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                            </div>
                        ))}
                        <button 
                            onClick={() => setResumeContent(prev => ({
                                ...prev,
                                certifications: [...prev.certifications, {
                                    name: '',
                                    issuingOrganization: '',
                                    dateObtained: ''
                                }]
                            }))}
                            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
                        >
                            <FaCertificate className="mr-2" /> Add Certification
                        </button>
                    </div>
                );
            case 'hobbies':
                return (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                            <FaHeart className="mr-3 text-indigo-500" /> Hobbies
                        </h2>
                        {resumeContent.hobbies.map((hobby, index) => (
                            <div key={index} className="space-y-3 mb-4 p-4 border border-gray-200 rounded-lg">
                                <input 
                                    type="text" 
                                    placeholder="Hobby" 
                                    value={hobby}
                                    onChange={(e) => {
                                        const newHobbies = [...resumeContent.hobbies];
                                        newHobbies[index] = e.target.value;
                                        setResumeContent(prev => ({
                                            ...prev,
                                            hobbies: newHobbies
                                        }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                            </div>
                        ))}
                        <button 
                            onClick={() => setResumeContent(prev => ({
                                ...prev,
                                hobbies: [...prev.hobbies, '']
                            }))}
                            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
                        >
                            <FaHeart className="mr-2" /> Add Hobby
                        </button>
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
                                    Create Your Professional Resume
                                </h1>
                            </div>
                            <button 
                                onClick={exportToPDF}
                                className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-semibold flex items-center transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                <FaFileDownload className="mr-2" /> Export PDF
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
                            <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
                                {SECTIONS.map((section, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveSection(section.key)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-in-out flex items-center ${
                                            activeSection === section.key 
                                                ? 'bg-indigo-100 text-indigo-700' 
                                                : 'text-gray-700 hover:bg-indigo-100'
                                        }`}
                                    >
                                        {section.icon}
                                        {section.name}
                                    </button>
                                ))}
                            </div>
                            
                            {/* Dynamic Form */}
                            <div>
                                {renderSectionForm()}
                            </div>
                        </div>

                        {/* Resume Preview */}
                        <div className="mt-6" id="resume-preview">
                            {isResumeComplete ? (
                                selectedTemplate === 'modern' ? (
                                    <ModernTemplate 
                                        content={{
                                            personalInfo: resumeContent.personalInfo,
                                            summary: resumeContent.summary,
                                            experience: resumeContent.workExperience,
                                            education: resumeContent.education,
                                            skills: resumeContent.skills,
                                            projects: resumeContent.projects
                                        }} 
                                    />
                                ) : (
                                    <MinimalTemplate 
                                        content={{
                                            personalInfo: resumeContent.personalInfo,
                                            summary: resumeContent.summary,
                                            experience: resumeContent.workExperience,
                                            education: resumeContent.education,
                                            skills: resumeContent.skills,
                                            projects: resumeContent.projects
                                        }} 
                                    />
                                )
                            ) : (
                                <div className="text-center text-gray-500 p-6">
                                    <h2 className="text-2xl font-bold">Resume Preview</h2>
                                    <p className="text-lg">Please complete your resume sections and click "Create Resume" to view your resume.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
