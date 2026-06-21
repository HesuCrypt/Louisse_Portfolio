export interface GeneralInquiryData {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

export interface ProjectInquiryData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface BuiltEmail {
  subject: string;
  body: string;
}

export function buildGeneralInquiryEmail(data: GeneralInquiryData): BuiltEmail {
  return {
    subject: `New Inquiry: ${data.inquiryType}`,
    body: `Name: ${data.name}
Email: ${data.email}
Inquiry Type: ${data.inquiryType}

Message:
${data.message}`,
  };
}

export function buildProjectInquiryEmail(data: ProjectInquiryData): BuiltEmail {
  return {
    subject: `New Project Inquiry: ${data.projectType}`,
    body: `Name: ${data.name}
Email: ${data.email}
Project Type: ${data.projectType}
Budget: ${data.budget}
Timeline: ${data.timeline}

Project Details:
${data.message}`,
  };
}
