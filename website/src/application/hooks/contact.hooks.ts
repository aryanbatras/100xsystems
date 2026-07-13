/**
 * ## Contact Domain: React Hooks
 *
 * Contact form state management — handles form data, validation,
 * and mailto-based submission.
 *
 * @packageDocumentation
 */
import { useState } from 'react';

/**
 * Form data for the contact page.
 *
 * @public
 */
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

/**
 * Return type of the useContactForm hook.
 *
 * @public
 */
export interface UseContactFormReturn {
  formData: ContactFormData;
  responseMessage: string;
  isSuccess: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}

/**
 * Hook for managing contact form state and submission.
 *
 * @remarks
 * Manages form field state, provides change handlers, and handles
 * form submission via mailto: link generation. Does not require
 * any backend service — uses the user's default email client.
 *
 * @returns Form state, handlers, and submission status
 *
 * @public
 */
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
    window.location.href = mailtoLink;

    setResponseMessage('Opening your email client...');
    setIsSuccess(true);

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
