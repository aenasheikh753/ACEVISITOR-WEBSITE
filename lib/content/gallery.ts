import type { GalleryContent } from "@/lib/types";

export const galleryContent: GalleryContent = {
  hero: {
    eyebrow: "Inside AceVisitor",
    title: "AceVisitor in focus",
    description: "From the first arrival to a complete view of every site.",
    metaTitle: "Screenshot Gallery",
    metaDescription:
      "Illustrative views of AceVisitor: front desk check-in, visitor badges, host approvals, multi-site operations and the management console.",
    action: { label: "Request a demo", href: "/request-demo" },
  },
  listLabel: "Gallery views",
  items: [
    {
      id: "front-desk",
      art: "lobby",
      title: "Front desk & check-in",
      description: "A connected arrival experience, from the reception desk to the host’s phone.",
      alt: "AceVisitor kiosk, reception console and mobile host approval in a lobby",
    },
    {
      id: "badges",
      art: "badges",
      title: "Visitor badges",
      description: "Clear visitor identification at every entrance.",
      alt: "Receptionist handing a visitor a printed AceVisitor badge",
    },
    {
      id: "approvals",
      art: "approvals",
      title: "Host approvals",
      description: "Hosts stay connected to arrivals wherever they work.",
      alt: "Host approving a visitor on a phone alongside the reception console",
    },
    {
      id: "multi-site",
      art: "sites",
      title: "Multi-site operations",
      description: "One visitor program across different sites and industries.",
      alt: "AceVisitor overview across offices, healthcare, schools and secure sites",
    },
    {
      id: "console",
      art: "console",
      title: "Management console",
      description: "An overview of visitors and entrance activity for your team.",
      alt: "AceVisitor management console on a laptop with authentication on a phone",
    },
  ],
  enlargeLabel: "Enlarge",
  previousLabel: "Previous image",
  nextLabel: "Next image",
  closeLabel: "Close enlarged image",
  viewLabel: "View",
  counterSeparator: "/",
  footnote: "Illustrative product views. Any people or records shown are fictional.",
};
