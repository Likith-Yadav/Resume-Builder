import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyA64oeHB8seUOrPuEuAdRlu_lstWVpam1U");

const formatBulletPoints = (text) => {
    // Split into lines and process each line
    const lines = text.split('\n').map(line => {
        line = line.trim();
        // Skip empty lines
        if (!line) return '';
        
        // If line starts with a bullet point, format it
        if (line.startsWith('•') || line.startsWith('-')) {
            line = line.replace(/^[•-]\s*/, ''); // Remove existing bullet
            const actionVerbPattern = /^([A-Z][a-zA-Z]+)/;
            line = line.replace(actionVerbPattern, '**$1**');
        }

        // Bold numbers, percentages, and metrics
        line = line.replace(/(\d+%|\d+\s*(K|M|B|k|m|b)|\$\d+|[-+]?\d+(\.\d+)?%?)/g, '**$1**');
        
        // Bold technical skills, tools, and design-related terms
        const technicalTerms = [
            // Design Tools
            'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Photoshop', 'Illustrator',
            'Adobe Creative Suite', 'Zeplin', 'Principle', 'ProtoPie', 'Webflow',
            // Technical Skills
            'React', 'JavaScript', 'Python', 'AWS', 'Docker', 'Kubernetes', 
            'SQL', 'Node\\.js', 'TypeScript', 'Git', 'REST', 'API', 'APIs',
            // Design Terms
            'UI', 'UX', 'UI/UX', 'Design System', 'Wireframes', 'Prototypes',
            'User Research', 'Usability Testing', 'A/B Testing', 'User Flows',
            'Information Architecture', 'Responsive Design', 'Mobile-First',
            // Methodologies
            'Agile', 'Scrum', 'Design Thinking', 'Lean UX', 'Sprint'
        ];
        
        const technicalPattern = new RegExp(`\\b(${technicalTerms.join('|')})\\b`, 'gi');
        line = line.replace(technicalPattern, '**$1**');
        
        // Bold important business terms
        const businessTerms = [
            'ROI', 'KPI', 'Conversion Rate', 'User Engagement', 'User Experience',
            'Customer Satisfaction', 'Revenue', 'Growth', 'Optimization',
            'Performance', 'Efficiency', 'Productivity', 'Innovation'
        ];
        
        const businessPattern = new RegExp(`\\b(${businessTerms.join('|')})\\b`, 'gi');
        line = line.replace(businessPattern, '**$1**');

        // Add bullet point at the start
        return `* ${line}`;
    });

    // Join lines and return
    return lines.filter(line => line).join('\n');
};

export const generateContent = async (prompt, type = 'resume') => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        let systemPrompt = '';
        if (type === 'resume') {
            systemPrompt = `As an expert resume writer, create professional bullet points for the following section.
            Requirements:
            - Start each bullet point with a strong action verb in present tense
            - Include specific metrics and achievements where possible (%, $, numbers)
            - Highlight technical skills, tools, and methodologies used
            - Keep each bullet point concise (1-2 lines)
            - Format: Use "•" for bullet points
            - Focus on impact and results
            - Use industry-specific keywords and metrics
            - For design roles: emphasize UI/UX tools, design processes, and business impact
            
            Here's the context: ${prompt}`;
        } else if (type === 'project') {
            systemPrompt = `Create a compelling project description with the following requirements:
            - Start with a strong overview sentence
            - Highlight the main technologies and tools used
            - Include specific technical challenges overcome
            - Mention the impact or results achieved (metrics if possible)
            - Keep it concise but detailed (3-4 sentences)
            - Use technical terms accurately
            - For design projects: emphasize design process, tools, and user impact
            
            Here's the context: ${prompt}`;
        } else if (type === 'coverletter') {
            systemPrompt = `Generate a formal business cover letter. DO NOT use any bullet points, asterisks, or markdown formatting.

            Example format:
            [Current Date]
            
            [Company Name]
            [Company Address]
            
            Dear [Hiring Manager Name],
            
            First paragraph: State the position you're applying for and how you learned about it. Briefly mention why you're interested in the role and the company.
            
            Second paragraph: Describe your relevant experience and skills that make you a strong candidate. Focus on specific achievements and how they relate to the position requirements.
            
            Final paragraph: Express enthusiasm for the opportunity to interview and discuss your qualifications further. Thank them for their time and consideration.
            
            Sincerely,
            [Name]

            IMPORTANT: Format as a standard business letter with regular paragraphs. Do not use any special characters, bullets, or lists.

            Here's the context: ${prompt}`;

            // Process the generated content to ensure no bullets
            const processResponse = async (response) => {
                const content = await response.text();
                // Remove any remaining bullets or markdown
                return content.replace(/^[*\-•]\s*/gm, '').replace(/\*\*/g, '');
            };

            const result = await model.generateContent(systemPrompt);
            const response = await result.response;
            const formattedText = await processResponse(response);
            return formattedText;
        }

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const formattedText = formatBulletPoints(response.text());
        return formattedText;
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
};
