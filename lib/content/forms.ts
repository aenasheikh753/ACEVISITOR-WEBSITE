import type { ContactContent, DemoContent, LoginContent, NotFoundContent } from "@/lib/types";

export const contactContent: ContactContent = {
  hero: {
    eyebrow: "Contact",
    title: "Talk to the AceVisitor team",
    description:
      "Whether you're evaluating a visitor program, reviewing security requirements or already running AceVisitor, we'll point you to the right person.",
    metaTitle: "Contact",
    metaDescription: "Contact AceVisitor for enterprise sales, customer support and general enquiries.",
  },
  channels: [
    { icon: "buildings", title: "Enterprise sales", description: "Evaluations, multi-site rollouts and procurement questions." },
    { icon: "chat", title: "Customer support", description: "Help for organizations already using AceVisitor at their sites." },
    { icon: "invite", title: "General enquiries", description: "Partnerships, media and anything else." },
  ],
  demoPrompt: "Looking for a product walkthrough?",
  demoLink: { label: "Request a demo.", href: "/request-demo" },
  formTitle: "Send us a message",
  form: {
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", half: true },
      { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization", half: true },
      {
        name: "topic",
        label: "Topic",
        type: "select",
        required: true,
        placeholder: "Select",
        options: ["Enterprise sales", "Security review", "Customer support", "Partnerships", "Other"],
      },
      { name: "message", label: "Message", type: "textarea", required: true },
    ],
    honeypotLabel: "Website",
    submitLabel: "Send message",
    sendingLabel: "Sending…",
    requiredError: "Please fill in this field.",
    emailError: "Please enter a valid work email.",
    successTitle: "Message received",
    successMessage: "Thanks for getting in touch. The right person on our team will reply shortly.",
    resetLabel: "Send another message",
    note: "We use your details to respond to your enquiry.",
    noteLink: { label: "Privacy Policy", href: "/privacy" },
  },
};

export const demoContent: DemoContent = {
  hero: {
    eyebrow: "Request a demo",
    title: "See AceVisitor against your own entrance requirements",
    description:
      "Tell us about your sites and visitor types, and we'll arrange a guided walkthrough with an enterprise specialist.",
    metaTitle: "Request a Demo",
    metaDescription: "Arrange a guided AceVisitor walkthrough with an enterprise specialist.",
  },
  highlights: [
    "Live walkthrough of the console, kiosk and host approval",
    "Badge printing and check-out demonstrated end to end",
    "Multi-site configuration mapped to your organization",
    "Security and audit questions answered directly",
  ],
  formTitle: "Tell us about your sites",
  form: {
    fields: [
      { name: "firstName", label: "First name", type: "text", required: true, autoComplete: "given-name", half: true },
      { name: "lastName", label: "Last name", type: "text", required: true, autoComplete: "family-name", half: true },
      { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", half: true },
      { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization", half: true },
      { name: "jobTitle", label: "Job title", type: "text", autoComplete: "organization-title", half: true },
      { name: "country", label: "Country", type: "text", autoComplete: "country-name", half: true },
      { name: "sites", label: "Number of sites", type: "select", required: true, placeholder: "Select", options: ["1 - 5", "6 - 25", "26 - 100", "100+"], half: true },
      { name: "visitors", label: "Monthly visitors", type: "select", placeholder: "Select", options: ["Under 500", "500 - 2,000", "2,000 - 10,000", "10,000+"], half: true },
      { name: "goal", label: "What are you trying to solve?", type: "textarea" },
    ],
    honeypotLabel: "Website",
    submitLabel: "Request a demo",
    sendingLabel: "Sending…",
    requiredError: "Please fill in this field.",
    emailError: "Please enter a valid work email.",
    successTitle: "Request received",
    successMessage: "Thank you. An enterprise specialist will contact you to arrange your walkthrough.",
    resetLabel: "Submit another request",
    note: "We use your details only to respond to this request.",
  },
};

export const loginContent: LoginContent = {
  eyebrow: "Welcome back",
  title: "Log in to AceVisitor",
  description: "Access your organization’s visitor operations workspace.",
  metaTitle: "Login",
  artLabel: "Kiko, the AceVisitor kiosk robot, waving next to an open office door",
  forgot: { label: "Forgot your password?", href: "/contact" },
  form: {
    fields: [
      { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", placeholder: "you@company.com" },
      { name: "password", label: "Password", type: "password", required: true, autoComplete: "current-password", placeholder: "Enter your password" },
    ],
    honeypotLabel: "Website",
    submitLabel: "Continue",
    sendingLabel: "Checking…",
    requiredError: "Please fill in this field.",
    emailError: "Please enter a valid work email.",
    successTitle: "Almost there",
    successMessage: "Authentication will be connected here in a future release.",
    resetLabel: "Back to login",
    note: "Authentication will be connected here in a future release.",
  },
};

export const notFoundContent: NotFoundContent = {
  title: "Page not found",
  description: "The page you’re looking for may have moved or is no longer available.",
  action: { label: "Back to home", href: "/" },
};
