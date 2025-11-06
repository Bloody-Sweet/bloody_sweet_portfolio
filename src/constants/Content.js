export const WELCOME_MESSAGE = "Welcome to Adithya's portfolio";
export const FIRST_CARD_DESCRIPTION = "What if I told you that the difference between a system that crashes under pressure and one that scales effortlessly lies in a single developer's ability to see what others miss?";
export const DESCRIPTION = "I’m Adithya, a full-stack developer (3+ years) who sees the hidden bugs, bottlenecks and works mainly with Java/Spring Boot and React to develop Full Stack Applications. I’ve built banking admin portals and e-commerce microservices, and moved pieces to AWS/Azure. I focus on cleaning up slow APIs, breaking big apps into microservices, and adding monitoring. That helps teams ship faster, avoid crashes, and cut some of their cloud/runtime costs.";
export const PROJECTS = [
  {
    title: 'Service Hub',
    description: 'Web-based platform for booking home services with role-based access.',
    bullets: [
      'Implemented user authentication, service search, and booking flows with role-based access.',
      'Built admin dashboard and location-based provider search.',
    ],
    tech: ['Python', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    github: '',
    demo: ''
  },
  {
    title: 'Student Management System',
    description: 'Secure REST API to manage student records, courses, and enrollments.',
    bullets: [
      'Developed with Spring Boot and Spring Data JPA with layered architecture.',
      'Enforced input validation and exception handling for data integrity.',
      'Used Swagger and Postman for API documentation and testing.'
    ],
    tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'Swagger', 'Postman'],
    github: '',
    demo: ''
  },
  {
    title: 'Weather Application',
    description: 'React app integrating a weather API for real-time updates.',
    bullets: [
      'Designed responsive UI with dynamic temperature, icons, and styling.',
      'Optimized API calls for efficient retrieval and performance.'
    ],
    tech: ['React', 'CSS'],
    github: '',
    demo: ''
  },
  {
    title: 'Economic Poverty Trends Visualization',
    description: 'Interactive dashboard analyzing poverty trends using Tableau.',
    bullets: [
      'Leveraged filters, parameters, calculations, and LOD expressions to enhance insights.',
      'Storytelling visuals highlighting key indicators and regional disparities.'
    ],
    tech: ['Tableau'],
    github: '',
    demo: ''
  },
  {
    title: 'Product Sentiment Analysis',
    description: 'Data analysis project scoring 13,500 customer comments using AFINN.',
    bullets: [
      'Identified positive/negative sentiment and top patterns to guide strategy.',
      'Delivered visual insights impacting differentiation and engagement.'
    ],
    tech: ['R', 'AFINN', 'Visualization'],
    github: '',
    demo: ''
  }
];

export const EXPERIENCE = [
  {
    role: 'Software Engineer',
    company: 'PNC Bank — MI, USA',
    period: 'October 2024 — Present',
    bullets: [
      'Transformed legacy banking systems into a cloud‑native microservices ecosystem using Java, Spring Boot, and React.',
      'Deployed solutions on AWS and Azure; optimized cloud resources, reducing infra costs by ~$500k+.',
      'Built internal Operations Management admin portals for customer accounts, loan applications, and credit card requests.',
      'Implemented PostgreSQL-backed services, Docker/Kubernetes (EKS), and AWS services (RDS, S3) for availability and scale.',
      'Improved DB performance with Spring Data JPA, Hibernate, Redis caching, connection pooling, and query tuning (−30% DB load, +40% response).',
      'Collaborated in Agile/Scrum with PMs, UX, DevOps, and QA; maintained documentation in Confluence and tracked work in JIRA.',
      'Authored integration and E2E tests with JUnit, Mockito, and Selenium, improving release stability and reducing defects by 25%.'
    ],
    tech: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Redis']
  },
  {
    role: 'Software Engineer',
    company: 'Infosys — Hyderabad, India',
    period: 'June 2021 — June 2023',
    bullets: [
      'Developed high‑performance e‑commerce microservices (Pricing, Subscription, Catalog, Ratings & Reviews).',
      'Integrated services with clients’ websites, improving functionality and user experience.',
      'Implemented bulk promotion/catalog feed processing via Spring Batch on Infosys Equinox Platform.',
      'Resolved production issues post‑Java upgrades; coordinated hotfix rollouts and debugging in prod.',
      'Mentored juniors on CI/CD best practices with Jenkins pipelines and Git branching workflows.',
      'Collaborated with cross‑functional teams (DevOps, QA, PM) in Agile/Scrum for requirements and delivery.'
    ],
    tech: ['Java', 'Spring Boot', 'Spring Batch', 'Microservices', 'Jenkins', 'Git']
  }
];

export const SKILLS = [
  'Java', 'Python', 'R', 'HTML', 'CSS', 'JavaScript', 'JSON', 'JSPs', 'REST APIs', 'SOAP', 'XML',
  'Spring', 'Spring Boot', 'Spring Batch', 'React', 'Node.js', 'Angular',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Oracle SQL', 'Redis',
  'AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins',
  'GitHub', 'Git',
  'JUnit 5', 'Mockito', 'Selenium', 'SonarQube', 'ESLint', 'Prettier', 'Jest', 'Supertest', 'Cypress',
  'Hibernate', 'Maven', 'Jira', 'Confluence', 'Microsoft Office', 'Tableau'
];

export const SKILL_GROUPS = [
  { group: 'Languages', items: ['Java', 'Python', 'R', 'HTML', 'CSS', 'JavaScript', 'JSON', 'JSPs', 'REST/SOAP Web Services', 'XML'] },
  { group: 'Frameworks', items: ['Spring', 'Spring Boot', 'Spring Batch', 'React JS', 'Node JS', 'Angular'] },
  { group: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Oracle SQL', 'Redis'] },
  { group: 'Cloud', items: ['AWS', 'Azure'] },
  { group: 'CI/CD', items: ['Docker', 'Kubernetes', 'Jenkins'] },
  { group: 'Version Control', items: ['GitHub', 'Git'] },
  { group: 'Testing / Quality', items: ['JUnit 5', 'Mockito', 'Selenium', 'SonarQube', 'ESLint', 'Prettier', 'Jest', 'Supertest', 'Cypress'] },
  { group: 'Tools & Visualization', items: ['Hibernate ORM', 'Maven', 'Jira', 'Confluence', 'Microsoft Office', 'Tableau'] }
];

// Resume PDF hosted in the app's public folder
export const RESUME_URL = '/A_Resume.pdf';