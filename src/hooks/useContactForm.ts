import { useState } from 'react';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface UseContactFormReturn {
  formData: ContactFormData;
  responseMessage: string;
  isSuccess: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}

export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto link with form data
    const subject = encodeURIComponent(
      'Contact Form Submission from 100xSystems',
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company || 'Not provided'}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `---\nSent from 100xSystems Contact Form`,
    );

    const mailtoLink = `mailto:admin@100xSystems.dev?subject=${subject}&body=${body}`;

    // Open user's default email client
    window.location.href = mailtoLink;

    // Show success message
    setResponseMessage('Opening your email client...');
    setIsSuccess(true);

    // Clear message after 3 seconds
    setTimeout(() => {
      setResponseMessage('');
    }, 3000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
    });
    setResponseMessage('');
    setIsSuccess(false);
  };

  return {
    formData,
    responseMessage,
    isSuccess,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
