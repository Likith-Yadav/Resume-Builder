import { useState, useEffect } from 'react';
import { generateContent } from '../../services/gemini';
import { FaSpinner } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const sections = [
    'personalInfo',
    'workExperience',
    'education',
    'skills',
    'projects',
    'certifications',
    'hobbies'
];

const initialFormData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: ''
    },
    workExperience: [{
        company: '',
        position: '',
        duration: '',
        description: ''
    }],
    education: [{
        institution: '',
        degree: '',
        duration: '',
        gpa: ''
    }],
    skills: [''],
    projects: [{
        name: '',
        description: '',
        technologies: ''
    }],
    certifications: [{
        name: '',
        issuer: '',
        date: ''
    }],
    hobbies: ['']
};

const markdownStyles = {
    '& ul': {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    '& ul li': {
        position: 'relative',
        paddingLeft: '1.5em',
        marginBottom: '0.5em',
        lineHeight: '1.5',
    },
    '& ul li::before': {
        content: '"•"',
        position: 'absolute',
        left: '0.5em',
        color: '#4B5563', // text-gray-600
    },
    '& p': {
        margin: 0,
    }
};

export default function ResumeForm({ resumeContent, setResumeContent }) {
    const [formData, setFormData] = useState(resumeContent || initialFormData);
    const [activeSection, setActiveSection] = useState('personalInfo');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (resumeContent) {
            setFormData(resumeContent);
        }
    }, [resumeContent]);

    const handleInputChange = (section, index, field, value) => {
        const newFormData = { ...formData };
        if (Array.isArray(formData[section])) {
            if (field === null) {
                newFormData[section][index] = value;
            } else {
                newFormData[section][index] = {
                    ...newFormData[section][index],
                    [field]: value
                };
            }
        } else if (typeof formData[section] === 'object') {
            newFormData[section] = {
                ...newFormData[section],
                [field]: value
            };
        }
        setFormData(newFormData);
        setResumeContent(newFormData);
    };

    const addItem = (section) => {
        const newFormData = { ...formData };
        const newItem = section === 'skills' || section === 'hobbies' 
            ? '' 
            : section === 'workExperience'
            ? { company: '', position: '', duration: '', description: '' }
            : section === 'education'
            ? { institution: '', degree: '', duration: '', gpa: '' }
            : section === 'projects'
            ? { name: '', description: '', technologies: '' }
            : section === 'certifications'
            ? { name: '', issuer: '', date: '' }
            : {};

        newFormData[section] = [...(newFormData[section] || []), newItem];
        setFormData(newFormData);
        setResumeContent(newFormData);
    };

    const removeItem = (section, index) => {
        const newFormData = { ...formData };
        newFormData[section] = newFormData[section].filter((_, i) => i !== index);
        setFormData(newFormData);
        setResumeContent(newFormData);
    };

    const generateAIContent = async (section) => {
        setIsGenerating(true);
        try {
            const prompt = `Generate a professional ${section} section for a resume with 5+ years of full-stack experience`;
            const generatedContent = await generateContent(prompt);
            
            // Depending on the section, parse and set the content
            if (section === 'summary') {
                handleInputChange('summary', null, null, generatedContent);
            } else if (section === 'workExperience') {
                const experiences = generatedContent.split('\n\n').map(exp => {
                    const [companyPosition, ...descriptionLines] = exp.split('\n');
                    const [company, position] = companyPosition.split(' - ');
                    return {
                        company: company.trim(),
                        position: position.trim(),
                        duration: '',
                        description: descriptionLines.join('\n').trim()
                    };
                });
                
                const newFormData = { 
                    ...formData, 
                    workExperience: experiences 
                };
                setFormData(newFormData);
                setResumeContent(newFormData);
            }
        } catch (error) {
            console.error('AI Content Generation Error:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    // Render sections dynamically
    const renderSection = () => {
        switch(activeSection) {
            case 'personalInfo':
                return (
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={formData.personalInfo.fullName}
                            onChange={(e) => handleInputChange('personalInfo', null, 'fullName', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={formData.personalInfo.email}
                            onChange={(e) => handleInputChange('personalInfo', null, 'email', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <input 
                            type="tel" 
                            placeholder="Phone" 
                            value={formData.personalInfo.phone}
                            onChange={(e) => handleInputChange('personalInfo', null, 'phone', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <input 
                            type="text" 
                            placeholder="Location" 
                            value={formData.personalInfo.location}
                            onChange={(e) => handleInputChange('personalInfo', null, 'location', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                );
            case 'workExperience':
                return (
                    <div>
                        {formData.workExperience.map((exp, index) => (
                            <div key={index} className="space-y-2 mb-4 p-4 border rounded">
                                <input 
                                    type="text" 
                                    placeholder="Company" 
                                    value={exp.company}
                                    onChange={(e) => handleInputChange('workExperience', index, 'company', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Position" 
                                    value={exp.position}
                                    onChange={(e) => handleInputChange('workExperience', index, 'position', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Duration" 
                                    value={exp.duration}
                                    onChange={(e) => handleInputChange('workExperience', index, 'duration', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <textarea 
                                    placeholder="Description" 
                                    value={exp.description}
                                    onChange={(e) => handleInputChange('workExperience', index, 'description', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <button 
                                    onClick={() => removeItem('workExperience', index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove Experience
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={() => addItem('workExperience')}
                            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Work Experience
                        </button>
                        {isGenerating ? (
                            <div className="flex items-center justify-center mt-4">
                                <FaSpinner className="animate-spin mr-2" />
                                Generating AI Content...
                            </div>
                        ) : (
                            <button 
                                onClick={() => generateAIContent('workExperience')}
                                className="w-full p-2 mt-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Generate AI Work Experience
                            </button>
                        )}
                    </div>
                );
            case 'education':
                return (
                    <div>
                        {formData.education.map((edu, index) => (
                            <div key={index} className="space-y-2 mb-4 p-4 border rounded">
                                <input 
                                    type="text" 
                                    placeholder="Institution" 
                                    value={edu.institution}
                                    onChange={(e) => handleInputChange('education', index, 'institution', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Degree" 
                                    value={edu.degree}
                                    onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Duration" 
                                    value={edu.duration}
                                    onChange={(e) => handleInputChange('education', index, 'duration', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <input 
                                    type="text" 
                                    placeholder="GPA" 
                                    value={edu.gpa}
                                    onChange={(e) => handleInputChange('education', index, 'gpa', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <button 
                                    onClick={() => removeItem('education', index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove Education
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={() => addItem('education')}
                            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Education
                        </button>
                    </div>
                );
            case 'skills':
                return (
                    <div>
                        {formData.skills.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Skill" 
                                    value={skill}
                                    onChange={(e) => handleInputChange('skills', index, null, e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <button 
                                    onClick={() => removeItem('skills', index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove Skill
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={() => addItem('skills')}
                            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Skill
                        </button>
                    </div>
                );
            case 'projects':
                return (
                    <div>
                        {formData.projects.map((proj, index) => (
                            <div key={index} className="space-y-2 mb-4 p-4 border rounded">
                                <input 
                                    type="text" 
                                    placeholder="Name" 
                                    value={proj.name}
                                    onChange={(e) => handleInputChange('projects', index, 'name', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <textarea 
                                    placeholder="Description" 
                                    value={proj.description}
                                    onChange={(e) => handleInputChange('projects', index, 'description', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Technologies" 
                                    value={proj.technologies}
                                    onChange={(e) => handleInputChange('projects', index, 'technologies', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <button 
                                    onClick={() => removeItem('projects', index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove Project
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={() => addItem('projects')}
                            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Project
                        </button>
                    </div>
                );
            case 'certifications':
                return (
                    <div>
                        {formData.certifications.map((cert, index) => (
                            <div key={index} className="space-y-2 mb-4 p-4 border rounded">
                                <input 
                                    type="text" 
                                    placeholder="Name" 
                                    value={cert.name}
                                    onChange={(e) => handleInputChange('certifications', index, 'name', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Issuer" 
                                    value={cert.issuer}
                                    onChange={(e) => handleInputChange('certifications', index, 'issuer', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <input 
                                    type="date" 
                                    placeholder="Date" 
                                    value={cert.date}
                                    onChange={(e) => handleInputChange('certifications', index, 'date', e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <button 
                                    onClick={() => removeItem('certifications', index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove Certification
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={() => addItem('certifications')}
                            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Certification
                        </button>
                    </div>
                );
            case 'hobbies':
                return (
                    <div>
                        {formData.hobbies.map((hobby, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Hobby" 
                                    value={hobby}
                                    onChange={(e) => handleInputChange('hobbies', index, null, e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <button 
                                    onClick={() => removeItem('hobbies', index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove Hobby
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={() => addItem('hobbies')}
                            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Hobby
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            {/* Section Navigation */}
            <div className="flex space-x-2 mb-4 overflow-x-auto">
                {sections.map((section) => (
                    <button
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className={`px-4 py-2 rounded ${
                            activeSection === section 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        {section.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}
                    </button>
                ))}
            </div>

            {/* Dynamic Section Rendering */}
            {renderSection()}
        </div>
    );
}
