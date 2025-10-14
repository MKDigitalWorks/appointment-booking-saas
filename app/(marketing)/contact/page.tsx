import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Field } from '@/components/forms/Field';

export default function ContactPage() {
  const t = useTranslations('marketing');

  return (
    <div className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Contact Us
        </h1>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Get in touch with our team. We'd love to hear from you.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <form className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="First Name"
              placeholder="Enter your first name"
              required
            />
            <Field
              label="Last Name"
              placeholder="Enter your last name"
              required
            />
          </div>
          <Field
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Field
            label="Subject"
            placeholder="What's this about?"
            required
          />
          <Field
            label="Message"
            placeholder="Tell us more about your inquiry"
            required
          />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
