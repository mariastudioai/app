import { Zap, ShieldCheck, BarChart3, MailCheck, Globe2, TerminalSquare, Sparkles, Image as ImageIcon, Code2 } from 'lucide-react';

export const aiTools = [
  { name: 'Claude', logo: 'Claude' },
  { name: 'Cursor', logo: 'Cursor' },
  { name: 'Bolt', logo: 'bolt' },
  { name: 'V0', logo: 'V0' },
  { name: 'Windsurf', logo: 'Windsurf' },
  { name: 'Kimi', logo: 'KIMI' },
  { name: 'Replit', logo: 'replit' },
  { name: 'Lovable', logo: 'Lovable' },
];

export const features = [
  {
    title: 'Deploy in seconds',
    desc: 'Upload a ZIP or push to GitHub. Your site is live before you finish your coffee.',
    visual: 'upload',
    icon: Zap,
  },
  {
    title: 'SSL included',
    desc: 'Every site gets a free SSL certificate automatically. No config, no renewals.',
    visual: 'ssl',
    icon: ShieldCheck,
  },
  {
    title: 'Built-in analytics',
    desc: "See who's visiting, where they're from, and what they're reading. No tracking scripts to install.",
    visual: 'analytics',
    icon: BarChart3,
  },
  {
    title: 'Forms that work',
    desc: 'Add data-maria to any form. Submissions show up in your dashboard instantly.',
    visual: 'forms',
    icon: MailCheck,
  },
  {
    title: 'Custom domains',
    desc: 'Connect your own domain in minutes. SSL provisions automatically on the first visit.',
    visual: 'domains',
    icon: Globe2,
  },
  {
    title: 'CLI for developers',
    desc: 'Deploy from your terminal with one command. Integrate into any workflow.',
    visual: 'cli',
    icon: TerminalSquare,
  },
  {
    title: 'AI SEO Optimizer',
    desc: 'Get AI-powered SEO recommendations for every page. Analyze, fix, and apply improvements with one click.',
    visual: 'seo',
    icon: Sparkles,
  },
  {
    title: 'Image Hosting',
    desc: 'Upload images and get instant public URLs. Perfect for emails, docs, or anywhere you need a hosted image.',
    visual: 'images',
    icon: ImageIcon,
  },
  {
    title: 'Built-in Code Editor',
    desc: 'Edit your HTML, CSS, and JS directly in the browser. Fix typos or update content without redeploying.',
    visual: 'editor',
    icon: Code2,
  },
];

export const steps = [
  {
    number: '01',
    title: 'Build with AI',
    desc: 'Use any AI coding tool to build your HTML, CSS, and JS site. Claude Code, Cursor, Bolt — they all work.',
  },
  {
    number: '02',
    title: 'Deploy to MARI.A Launch',
    desc: 'Drop your ZIP file or connect a GitHub repo. We extract, optimize, and push your files to the CDN.',
  },
  {
    number: '03',
    title: 'Share with the world',
    desc: 'Your site is live at yourname.marialaunch.app with SSL, analytics, and forms ready out of the box.',
  },
];

export const plans = {
  monthly: [
    {
      name: 'Free', price: '$0', sub: '',
      cta: 'Get started free', popular: false,
      features: [
        ['Sites', '2'], ['Storage', '500 MB'], ['Asset storage', '50 MB'],
        ['Custom domains', '—'], ['Forms / mo', '100'],
        ['Analytics', true], ['CLI', true], ['Support', 'Community'],
      ],
    },
    {
      name: 'Starter', price: '$5', sub: '/mo',
      cta: 'Start with Starter', popular: false,
      features: [
        ['Sites', '5'], ['Storage', '2 GB'], ['Asset storage', '500 MB'],
        ['Custom domains', '1'], ['Forms / mo', '1,000'],
        ['Analytics', true], ['CLI', true], ['Support', 'Email'],
      ],
    },
    {
      name: 'Pro', price: '$10', sub: '/mo',
      cta: 'Start with Pro', popular: true,
      features: [
        ['Sites', '20'], ['Storage', '10 GB'], ['Asset storage', '2 GB'],
        ['Custom domains', '5'], ['Forms / mo', 'Unlimited'],
        ['Analytics', true], ['CLI', true], ['Support', 'Priority'],
      ],
    },
    {
      name: 'Agency', price: '$19', sub: '/mo',
      cta: 'Contact us', popular: false,
      features: [
        ['Sites', 'Unlimited'], ['Storage', '50 GB'], ['Asset storage', '10 GB'],
        ['Custom domains', 'Unlimited'], ['Forms / mo', 'Unlimited'],
        ['Analytics', true], ['CLI', true], ['Support', 'White-glove'],
      ],
    },
  ],
  yearly: [
    {
      name: 'Free', price: '$0', sub: '',
      cta: 'Get started free', popular: false,
      features: [
        ['Sites', '2'], ['Storage', '500 MB'], ['Asset storage', '50 MB'],
        ['Custom domains', '—'], ['Forms / mo', '100'],
        ['Analytics', true], ['CLI', true], ['Support', 'Community'],
      ],
    },
    {
      name: 'Starter', price: '$50', sub: '/yr',
      cta: 'Start with Starter', popular: false,
      features: [
        ['Sites', '5'], ['Storage', '2 GB'], ['Asset storage', '500 MB'],
        ['Custom domains', '1'], ['Forms / mo', '1,000'],
        ['Analytics', true], ['CLI', true], ['Support', 'Email'],
      ],
    },
    {
      name: 'Pro', price: '$100', sub: '/yr',
      cta: 'Start with Pro', popular: true,
      features: [
        ['Sites', '20'], ['Storage', '10 GB'], ['Asset storage', '2 GB'],
        ['Custom domains', '5'], ['Forms / mo', 'Unlimited'],
        ['Analytics', true], ['CLI', true], ['Support', 'Priority'],
      ],
    },
    {
      name: 'Agency', price: '$190', sub: '/yr',
      cta: 'Contact us', popular: false,
      features: [
        ['Sites', 'Unlimited'], ['Storage', '50 GB'], ['Asset storage', '10 GB'],
        ['Custom domains', 'Unlimited'], ['Forms / mo', 'Unlimited'],
        ['Analytics', true], ['CLI', true], ['Support', 'White-glove'],
      ],
    },
  ],
};
