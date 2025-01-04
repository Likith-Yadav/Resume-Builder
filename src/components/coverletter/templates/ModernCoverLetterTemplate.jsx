import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownStyles = {
    '& p': {
        marginBottom: '1em',
        lineHeight: '1.6',
    },
    '& strong': {
        color: '#374151', // text-gray-700
    }
};

export default function ModernCoverLetterTemplate({ content }) {
    const { jobDetails, companyInfo, letterContent } = content;

    const fullLetterContent = `
## ${jobDetails.jobTitle} Application - ${companyInfo.companyName}

### Introduction
${letterContent.introductoryParagraph}

### Main Body
${letterContent.mainBody}

### Closing
${letterContent.closingParagraph}
    `;

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
            <div className="prose max-w-none" style={markdownStyles}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {fullLetterContent}
                </ReactMarkdown>
            </div>
        </div>
    );
}
