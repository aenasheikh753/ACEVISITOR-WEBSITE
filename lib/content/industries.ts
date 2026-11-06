import type { IndustriesContent } from "@/lib/types";

export const industriesContent: IndustriesContent = {
  hero: {
    eyebrow: "Industries",
    title: "Entrance requirements differ. The standard shouldn't.",
    description:
      "AceVisitor configures to the rules of each sector while keeping one consistent record of every visit across your organization.",
    metaTitle: "Industries",
    metaDescription:
      "Visitor management for corporate offices, healthcare, education, government, data centers and construction sites.",
    artLabel:
      "A street of different buildings: an office, a hospital, a school, a government building, a data center and a construction site",
  },
  sectors: {
    eyebrow: "Sectors",
    title: "Configured for the way your sites actually operate",
    items: [
      {
        id: "office",
        title: "Corporate offices",
        description: "Professional arrival experience for clients and candidates, with host approval and NDA signing built into check-in.",
        points: ["Meeting-linked pre-registration", "Branded lobby kiosks", "Multi-floor zone badges"],
        artLabel: "Corporate office tower",
      },
      {
        id: "healthcare",
        title: "Healthcare",
        description: "Controlled access for vendors, contractors and visitors in clinical environments where restricted areas matter.",
        points: ["Vendor credential checks", "Ward and zone restrictions", "Visiting-hours enforcement"],
        artLabel: "Hospital building",
      },
      {
        id: "education",
        title: "Education",
        description: "Campus-wide visitor and contractor control with clear safeguarding rules at every entrance.",
        points: ["Parent and guardian sign-in", "Contractor induction records", "Campus-wide reporting"],
        artLabel: "School building with a flag",
      },
      {
        id: "government",
        title: "Government",
        description: "Structured visitor handling for facilities that require identity verification and detailed retention of records.",
        points: ["Identity verification steps", "Escort-required workflows", "Long-term audit retention"],
        artLabel: "Government building with columns",
      },
      {
        id: "datacenter",
        title: "Data centers",
        description: "Strict access governance for colocation and critical infrastructure, down to the room and cage.",
        points: ["Pre-approved access windows", "Escort and two-person rules", "Granular zone permissions"],
        artLabel: "Data center with server racks",
      },
      {
        id: "construction",
        title: "Construction & industrial",
        description: "Site inductions, safety briefings and contractor tracking at gates with high daily turnover.",
        points: ["Digital safety briefings", "Certification expiry checks", "Live on-site headcount"],
        artLabel: "Construction site with a crane",
      },
    ],
  },
  cta: {
    title: "Discuss the requirements of your sites",
    description: "An enterprise specialist will walk through your entrances, visitor types and reporting obligations.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Talk to sales", href: "/contact" },
  },
};
