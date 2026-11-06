import type { SiteContent } from "@/lib/types";

export const siteContent: SiteContent = {
  metadataTitle: "AceVisitor | Enterprise Visitor Management Platform",
  metadataTemplate: "%s | AceVisitor",
  metadataDescription:
    "AceVisitor replaces paper logbooks and disconnected sign-in apps with one governed platform for pre-registration, verified check-in, host approval, badge printing and audit-ready visitor records.",
  nav: {
    brand: "AceVisitor",
    homeLabel: "AceVisitor home",
    links: [
      { label: "Home", href: "/" },
      { label: "Platform", href: "/platform" },
      { label: "Gallery", href: "/gallery" },
      { label: "Solutions", href: "/solutions" },
      { label: "Industries", href: "/industries" },
      { label: "Security", href: "/security" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    login: { label: "Login", href: "/login" },
    demo: { label: "Request a Demo", href: "/request-demo" },
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    navigationLabel: "Main navigation",
    skipLink: "Skip to content",
  },
  footer: {
    summary:
      "Enterprise visitor management for organizations that run controlled entrances across many buildings, sites and regions.",
    cta: { label: "Request a demo", href: "/request-demo" },
    groups: [
      {
        title: "Platform",
        links: [
          { label: "Platform overview", href: "/platform" },
          { label: "Screenshot gallery", href: "/gallery" },
          { label: "Security architecture", href: "/security" },
          { label: "Request a demo", href: "/request-demo" },
        ],
      },
      {
        title: "Use cases",
        links: [
          { label: "Solutions", href: "/solutions" },
          { label: "Industries", href: "/industries" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    copyright: "© 2026 Datacompute Consulting LLC. All rights reserved.",
    legalNote: "AceVisitor is a product of Datacompute Consulting LLC. Learn more at",
    legalLink: { label: "datacompute.net", href: "https://datacompute.net" },
    bottomLinks: [
      { label: "FAQs", href: "/faq" },
      { label: "Site Index", href: "/sitemap" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  chat: {
    title: "Ace · AceVisitor Assistant",
    subtitle: "Product questions & demo booking",
    openLabel: "Open chat",
    closeLabel: "Close chat",
    inputLabel: "Ask about AceVisitor",
    inputPlaceholder: "Ask about AceVisitor...",
    sendLabel: "Send message",
    greeting:
      "Hi, I'm Ace. Ask me anything about AceVisitor — check-in, badging, multi-site control or security. I can also help you book a demo.",
    placeholderReply:
      "Thanks for your message. Our team will get back to you shortly. You can also request a demo from the Contact page.",
    typingLabel: "Ace is typing",
    suggestions: ["Book a demo", "How does kiosk check-in work?", "Multi-site control"],
  },
};
