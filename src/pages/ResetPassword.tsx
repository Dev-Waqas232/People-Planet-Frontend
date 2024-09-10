import { useLocation } from 'react-router-dom';

export default function ResetPassword() {
  const location = useLocation();
  const email = location.state;

  const getMailProviderUrl = (email: string) => {
    const domain = email.split('@')[1].toLowerCase();
    switch (domain) {
      case 'gmail.com':
        return 'https://mail.google.com';
      case 'yahoo.com':
        return 'https://mail.yahoo.com';
      case 'outlook.com':
      case 'hotmail.com':
        return 'https://outlook.live.com';
      default:
        return `mailto:${email}`;
    }
  };

  return (
    <div className="mt-12 md:px-8 px-2">
      <h2 className="font-primary text-2xl font-semibold">Check Email</h2>
      <p>
        We've sent an email to{' '}
        <a
          href={getMailProviderUrl(email)}
          target="_blank"
          className="text-primary italic"
        >
          {email}
        </a>{' '}
        with instructions to reset your password. Please check your inbox and
        follow the instructions to complete the process. If you don’t receive
        the email within a few minutes, please check your spam or junk folder.
        If you still don't receive it, you can try resubmitting your request or
        contact our support team for further assistance.
      </p>
    </div>
  );
}
