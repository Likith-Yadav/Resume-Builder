import { useState } from 'react';
import { generateContent } from '../../services/gemini';
import { FaSpinner } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const initialFormData = {
    jobTitle: '',
    company: '',
    hiringManager: '',
    experience: '',
    skills: '',
    content: ''
};

const markdownStyles = {
    '& p': {
        marginBottom: '1.5em',
        lineHeight: '1.8',
        whiteSpace: 'pre-line'
    },
    '& p:first-of-type': {
        marginTop: '2em'
    }
};

export default function CoverLetterForm({ onUpdateContent }) {
    const [formData, setFormData] = useState(initialFormData);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleInputChange = (field, value) => {
        const newFormData = { ...formData };
        newFormData[field] = value;
        setFormData(newFormData);
        onUpdateContent(newFormData);
    };

    const generateCoverLetter = async () => {
        setIsGenerating(true);
        try {
            const prompt = `Generate a professional cover letter with the following details:
                Job Title: ${formData.jobTitle}
                Company: ${formData.company}
                Hiring Manager: ${formData.hiringManager}
                Relevant Experience: ${formData.experience}
                Key Skills: ${formData.skills}
                
                Please write a formal cover letter that:
                1. Has a professional greeting
                2. Introduces the candidate and states the position they're applying for
                3. Highlights their relevant experience and skills
                4. Shows enthusiasm for the role and company
                5. Concludes with a call to action
                6. Uses a professional closing
                
                Format it as a proper letter, not with bullet points.`;

            const generatedContent = await generateContent(prompt, 'coverletter');
            handleInputChange('content', generatedContent);
        } catch (error) {
            console.error('Error generating cover letter:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const formatContent = (content) => {
        if (!content) return '';
        // Remove asterisks/bullets from the beginning of lines
        return content.replace(/^\s*[\*\-]\s*/gm, '');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Hiring Manager (optional)</label>
                    <input
                        type="text"
                        value={formData.hiringManager}
                        onChange={(e) => handleInputChange('hiringManager', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="e.g., Mr. John Smith"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Relevant Experience</label>
                    <textarea
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Describe your relevant experience for this role"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Key Skills</label>
                    <textarea
                        value={formData.skills}
                        onChange={(e) => handleInputChange('skills', e.target.value)}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="List your key skills relevant to this position"
                    />
                </div>

                <div>
                    <button
                        onClick={generateCoverLetter}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <>
                                <FaSpinner className="animate-spin mr-2" />
                                Generating...
                            </>
                        ) : (
                            'Generate Cover Letter'
                        )}
                    </button>
                </div>

                {formData.content && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Generated Cover Letter
                        </label>
                        <div className="mt-1 space-y-2">
                            <textarea
                                value={formData.content}
                                onChange={(e) => handleInputChange('content', e.target.value)}
                                rows={12}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-sans"
                            />
                            <div className="mt-4 p-8 bg-gray-50 rounded-md">
                                <div className="prose max-w-none leading-relaxed" style={markdownStyles}>
                                    {formData.content}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
