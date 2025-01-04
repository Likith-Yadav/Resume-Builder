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
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {content.personalInfo.fullName}
                </h1>
                <div className="text-gray-600">
                    <p>{content.personalInfo.email} | {content.personalInfo.phone}</p>
                    <p>{content.personalInfo.location}</p>
                </div>
            </div>

            {/* Summary */}
            {content.summary && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-indigo-600 mb-4">
                        Professional Summary
                    </h2>
                    <p className="text-gray-700">{content.summary}</p>
                </section>
            )}

            {/* Work Experience */}
            {content.experience && content.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-indigo-600 mb-4">
                        Work Experience
                    </h2>
                    {content.experience.map((exp, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {exp.position} | {exp.company}
                                </h3>
                                <p className="text-gray-600">{exp.duration}</p>
                            </div>
                            <ReactMarkdown 
                                components={{
                                    strong: ({node, ...props}) => (
                                        <strong className="font-bold text-gray-900" {...props} />
                                    )
                                }}
                                remarkPlugins={[remarkGfm]}
                                className="text-gray-700 mt-2"
                            >
                                {exp.description}
                            </ReactMarkdown>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {content.education && content.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-indigo-600 mb-4">
                        Education
                    </h2>
                    {content.education.map((edu, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {edu.degree} | {edu.institution}
                                </h3>
                                <p className="text-gray-600">{edu.duration}</p>
                            </div>
                            {edu.description && (
                                <p className="text-gray-700 mt-2">{edu.description}</p>
                            )}
                            {edu.gpa && <p className="text-gray-700">GPA: {edu.gpa}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {content.skills && content.skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-indigo-600 mb-4">
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {content.skills.map((skill, index) => (
                            <span 
                                key={index} 
                                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {content.projects && content.projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-indigo-600 mb-4">
                        Projects
                    </h2>
                    {content.projects.map((project, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {project.name}
                                </h3>
                                {project.technologies && (
                                    <p className="text-gray-600">{project.technologies}</p>
                                )}
                            </div>
                            <ReactMarkdown 
                                components={{
                                    strong: ({node, ...props}) => (
                                        <strong className="font-bold text-gray-900" {...props} />
                                    )
                                }}
                                remarkPlugins={[remarkGfm]}
                                className="text-gray-700 mt-2"
                            >
                                {project.description}
                            </ReactMarkdown>
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications */}
            {content.certifications && content.certifications.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-indigo-600 mb-4">
                        Certifications
                    </h2>
                    {content.certifications.map((cert, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {cert.name}
                                </h3>
                                <p className="text-gray-600">{cert.dateObtained}</p>
                            </div>
                            {cert.issuingOrganization && (
                                <p className="text-gray-700">{cert.issuingOrganization}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Hobbies */}
            {content.hobbies && content.hobbies.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-indigo-600 mb-4">
                        Hobbies
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {content.hobbies.map((hobby, index) => (
                            <span 
                                key={index} 
                                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
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
