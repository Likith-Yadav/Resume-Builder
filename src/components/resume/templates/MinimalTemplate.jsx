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
    }
};

export default function MinimalTemplate({ content }) {
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
            {/* Header */}
            <div className="border-b-2 border-gray-200 pb-4 mb-6">
                <h1 className="text-4xl font-light text-gray-900 mb-2">
                    {content.personalInfo.fullName}
                </h1>
                <div className="text-gray-600 flex flex-wrap gap-x-4">
                    <span>{content.personalInfo.email}</span>
                    <span>{content.personalInfo.phone}</span>
                    <span>{content.personalInfo.location}</span>
                    {content.personalInfo.linkedin && <span>{content.personalInfo.linkedin}</span>}
                </div>
            </div>

            {/* Work Experience */}
            {content.workExperience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-light text-gray-900 mb-4">Experience</h2>
                    {content.workExperience.map((exp, index) => (
                        <div key={index} className="mb-6">
                            <div className="flex justify-between mb-2">
                                <div>
                                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                                    <p className="text-gray-600">{exp.company}</p>
                                </div>
                                <span className="text-gray-500">{exp.duration}</span>
                            </div>
                            {exp.description && (
                                <div className="prose prose-sm max-w-none mt-2" style={markdownStyles}>
                                    <ReactMarkdown 
                                        components={{
                                            strong: ({node, ...props}) => (
                                                <strong className="font-bold text-gray-900" {...props} />
                                            )
                                        }}
                                        remarkPlugins={[remarkGfm]}
                                    >
                                        {exp.description.split('\n').map(line => line.trim()).join('\n')}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {content.education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-light text-gray-900 mb-4">Education</h2>
                    {content.education.map((edu, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between mb-1">
                                <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                                <span className="text-gray-500">{edu.duration}</span>
                            </div>
                            <p className="text-gray-700">{edu.degree}</p>
                            {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {content.skills.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-light text-gray-900 mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {content.skills.map((skill, index) => (
                            <span key={index} className="text-gray-700">
                                {skill}
                                {index < content.skills.length - 1 && " •"}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {content.projects.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-light text-gray-900 mb-4">Projects</h2>
                    {content.projects.map((project, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="font-medium text-gray-900">{project.name}</h3>
                            <p className="text-gray-600 text-sm mb-1">{project.technologies}</p>
                            {project.description && (
                                <div className="prose prose-sm max-w-none mt-2" style={markdownStyles}>
                                    <ReactMarkdown 
                                        components={{
                                            strong: ({node, ...props}) => (
                                                <strong className="font-bold text-gray-900" {...props} />
                                            )
                                        }}
                                        remarkPlugins={[remarkGfm]}
                                    >
                                        {project.description.split('\n').map(line => line.trim()).join('\n')}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications */}
            {content.certifications.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-light text-gray-900 mb-4">Certifications</h2>
                    {content.certifications.map((cert, index) => (
                        <div key={index} className="mb-2 flex justify-between">
                            <div>
                                <span className="font-medium text-gray-900">{cert.name}</span>
                                <span className="text-gray-600"> - {cert.issuer}</span>
                            </div>
                            <span className="text-gray-500">{cert.date}</span>
                        </div>
                    ))}
                </section>
            )}

            {/* Hobbies */}
            {content.hobbies.length > 0 && (
                <section>
                    <h2 className="text-2xl font-light text-gray-900 mb-4">Interests</h2>
                    <div className="flex flex-wrap gap-x-2 text-gray-700">
                        {content.hobbies.map((hobby, index) => (
                            <span key={index}>
                                {hobby}
                                {index < content.hobbies.length - 1 && " •"}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
