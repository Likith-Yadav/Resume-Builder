import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
    },
    '& strong': {
        fontWeight: 'bold',
        color: '#1F2937', // text-gray-900
    }
};

export default function ModernTemplate({ content }) {
    return (
        <div className="max-w-4xl mx-auto bg-white p-4 shadow-lg break-inside-avoid-page">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {content.personalInfo.fullName}
                </h1>
                <div className="text-gray-600 text-sm">
                    <p>{content.personalInfo.email} | {content.personalInfo.phone} | {content.personalInfo.location}</p>
                </div>
            </div>

            {/* Summary */}
            {content.summary && (
                <section className="mb-3">
                    <h2 className="text-lg font-bold text-gray-900 border-b-2 border-indigo-600 mb-2">
                        Professional Summary
                    </h2>
                    <p className="text-gray-700 text-sm">{content.summary}</p>
                </section>
            )}

            {/* Work Experience */}
            {content.experience && content.experience.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-lg font-bold text-gray-900 border-b-2 border-indigo-600 mb-2">
                        Work Experience
                    </h2>
                    {content.experience.map((exp, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-md font-semibold text-gray-800">
                                    {exp.position} | {exp.company}
                                </h3>
                                <p className="text-gray-600 text-sm">{exp.duration}</p>
                            </div>
                            <ReactMarkdown 
                                components={{
                                    strong: ({node, ...props}) => (
                                        <strong className="font-bold text-gray-900" {...props} />
                                    )
                                }}
                                remarkPlugins={[remarkGfm]}
                                className="text-gray-700 text-sm mt-1"
                            >
                                {exp.description}
                            </ReactMarkdown>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {content.education && content.education.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-lg font-bold text-gray-900 border-b-2 border-indigo-600 mb-2">
                        Education
                    </h2>
                    {content.education.map((edu, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-md font-semibold text-gray-800">
                                    {edu.degree} | {edu.institution}
                                </h3>
                                <p className="text-gray-600 text-sm">{edu.duration}</p>
                            </div>
                            {edu.description && (
                                <p className="text-gray-700 text-sm mt-1">{edu.description}</p>
                            )}
                            {edu.gpa && <p className="text-gray-700 text-sm">GPA: {edu.gpa}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {content.skills && content.skills.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-lg font-bold text-gray-900 border-b-2 border-indigo-600 mb-2">
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-1">
                        {content.skills.map((skill, index) => (
                            <span 
                                key={index} 
                                className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {content.projects && content.projects.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-lg font-bold text-gray-900 border-b-2 border-indigo-600 mb-2">
                        Projects
                    </h2>
                    {content.projects.map((project, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-md font-semibold text-gray-800">
                                    {project.name}
                                </h3>
                                {project.technologies && (
                                    <p className="text-gray-600 text-sm">{project.technologies}</p>
                                )}
                            </div>
                            <ReactMarkdown 
                                components={{
                                    strong: ({node, ...props}) => (
                                        <strong className="font-bold text-gray-900" {...props} />
                                    )
                                }}
                                remarkPlugins={[remarkGfm]}
                                className="text-gray-700 text-sm mt-1"
                            >
                                {project.description}
                            </ReactMarkdown>
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications */}
            {content.certifications && content.certifications.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-lg font-bold text-gray-900 border-b-2 border-indigo-600 mb-2">
                        Certifications
                    </h2>
                    {content.certifications.map((cert, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-md font-semibold text-gray-800">
                                    {cert.name}
                                </h3>
                                <p className="text-gray-600 text-sm">{cert.dateObtained}</p>
                            </div>
                            {cert.issuingOrganization && (
                                <p className="text-gray-700 text-sm">{cert.issuingOrganization}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Hobbies */}
            {content.hobbies && content.hobbies.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-lg font-bold text-gray-900 border-b-2 border-indigo-600 mb-2">
                        Hobbies
                    </h2>
                    <div className="flex flex-wrap gap-1">
                        {content.hobbies.map((hobby, index) => (
                            <span 
                                key={index} 
                                className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs"
                            >
                                {hobby}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
