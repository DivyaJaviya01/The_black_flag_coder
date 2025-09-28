import React, { useState, useEffect } from 'react';
import { 
  BeakerIcon,
  CurrencyDollarIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  ChevronRightIcon,
  BookmarkIcon,
  CalculatorIcon,
  HeartIcon,
  AcademicCapIcon,
  CpuChipIcon,
  LightBulbIcon,
  UserGroupIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Roadmap = () => {
  const navigate = useNavigate();
  const [expandedStreams, setExpandedStreams] = useState({
    science: false,
    commerce: false,
    arts: false,
    diploma: false,
    vocational: false
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track viewed streams
  useEffect(() => {
    // This will run when the component mounts
    // We could add more sophisticated tracking here if needed
  }, []);

  // Define all fields for each stream
  const streamData = {
    science: {
      title: "Science Stream",
      icon: BeakerIcon,
      color: "from-blue-500 to-cyan-500",
      description: "Science stream is for students interested in engineering, medical, research, and technology. It deals with studying the natural world and is divided into PCM (Physics, Chemistry, Mathematics) for technical fields and PCB (Physics, Chemistry, Biology) for medical fields..",
      groups: [
        {
          id: "pcm",
          title: "Science A Group (PCM)",
          subtitle: "Physics, Chemistry, Mathematics",
          icon: CalculatorIcon,
          description: "If you love Maths, machines, computers, or technology, then this group is for you.",
          subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science (Optional)"],
          study: "How machines work, how electricity flows, how software is built, how structures are designed",
          careers: [
            "Engineering (Computer, Mechanical, Electrical, Civil, Electronics, Aerospace, Robotics, etc.)",
            "Architecture (B.Arch)",
            "Pilot / Aviation",
            "Defence (NDA, Technical entry)",
            "Data Science, Artificial Intelligence, Cybersecurity",
            "Research in Physics, Chemistry, or Mathematics"
          ],
          bestFor: "Students who enjoy problem-solving, logic, technology, and innovation"
        },
        {
          id: "pcb",
          title: "Science B Group (PCB)",
          subtitle: "Physics, Chemistry, Biology",
          icon: HeartIcon,
          description: "If you are curious about the human body, animals, plants, medicines, and life sciences, then this group fits you.",
          subjects: ["Physics", "Chemistry", "Biology"],
          study: "How the human body functions, how medicines are made, how plants grow, how diseases spread and can be cured",
          careers: [
            "Medical (Doctor, Dentist, Ayurveda, Homeopathy, Veterinary, Nursing, Physiotherapy)",
            "Pharmacy (B.Pharm, D.Pharm)",
            "Biotechnology, Microbiology, Genetics",
            "Agriculture and Food Technology",
            "Research in Biology and Life Sciences"
          ],
          bestFor: "Students who dream of becoming doctors, working in healthcare, or exploring life sciences"
        },
        {
          id: "pcmb",
          title: "Science Both (PCMB)",
          subtitle: "Physics, Chemistry, Maths, Biology",
          icon: AcademicCapIcon,
          description: "Some schools also offer all four subjects together. This is for students who are strong in both Maths and Biology or want to keep maximum career options open.",
          subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
          study: "Combination of both PCM and PCB subjects",
          careers: [
            "All Engineering fields",
            "All Medical fields",
            "Biotechnology and Bioinformatics",
            "Research in interdisciplinary sciences"
          ],
          bestFor: "Students who are good at both subjects and can handle extra study load"
        }
      ],
      tips: [
        "If you love Maths, coding, experiments, machines → PCM (A Group) is right",
        "If you are fascinated by biology, medicine, human body → PCB (B Group) is better",
        "If you are good at both and can handle extra study load → PCMB is the safest choice",
        "Don't pick Science just because others are doing it. Choose it only if you are interested and ready for hard work"
      ],
      summary: [
        { icon: CpuChipIcon, text: "A Group (PCM): Best for Engineering, Technology, Computers, Machines" },
        { icon: HeartIcon, text: "B Group (PCB): Best for Medicine, Healthcare, Life Sciences" },
        { icon: AcademicCapIcon, text: "PCMB: Keeps both doors open" }
      ]
    },
    commerce: {
      title: "Commerce Stream",
      icon: CurrencyDollarIcon,
      color: "from-green-500 to-emerald-500",
      description: "Commerce stream is for students interested in business, trade, finance, and management. It deals with subjects like Economics, Accountancy, and Business Studies, and is divided into courses leading to careers in fields like banking, entrepreneurship, and corporate management..",
      groups: [
        {
          id: "commerce-with-maths",
          title: "Commerce with Mathematics",
          subtitle: "For students interested in finance, accounting, and data analysis",
          icon: CalculatorIcon,
          description: "If you enjoy Maths, numbers, and logical calculations, this group is for you.",
          subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics / Applied Mathematics"],
          study: "How money is recorded and managed, how businesses work, how money, markets, and resources move in society, mathematical and statistical analysis for business decisions",
          careers: [
            "Chartered Accountant (CA)",
            "Company Secretary (CS)",
            "Cost & Management Accountant (CMA)",
            "Actuarial Science (Insurance & Risk analysis)",
            "Banking, Finance, and Investment",
            "Data Analytics, Business Analytics"
          ],
          bestFor: "Students who enjoy Maths, numbers, and logical calculations"
        },
        {
          id: "commerce-without-maths",
          title: "Commerce without Mathematics",
          subtitle: "For students interested in business management and entrepreneurship",
          icon: BuildingOfficeIcon,
          description: "If you are more interested in business, management, trade, or law, this group is for you.",
          subjects: ["Accountancy", "Business Studies", "Economics", "Optional: Statistics, Entrepreneurship, Computer Applications"],
          study: "How money is recorded and managed, how businesses work, how money, markets, and resources move in society, business operations and management principles",
          careers: [
            "Management (BBA, MBA)",
            "Accounting, Business Law, Taxation",
            "Marketing & Sales",
            "Human Resource Management (HR)",
            "Hotel & Tourism Management",
            "Digital Marketing, E-Commerce"
          ],
          bestFor: "Students more interested in business, management, trade, or law"
        },
        {
          id: "commerce-specialized",
          title: "Specialized Commerce Careers",
          subtitle: "Advanced career paths in commerce",
          icon: ChartBarIcon,
          description: "For students who want to pursue specialized careers after completing their commerce education.",
          subjects: ["Advanced Economics", "Business Law", "Financial Markets", "Entrepreneurship"],
          study: "Economic policy, financial markets, business law, startup and venture management",
          careers: [
            "Economics (BA/MA in Economics, Economist, Policy Maker)",
            "Entrepreneurship (starting your own business/startup)",
            "Stock Market, Investment Banking, Chartered Financial Analyst (CFA)",
            "Financial Planning and Wealth Management",
            "Business Consulting",
            "International Trade and Commerce"
          ],
          bestFor: "Students who want to pursue specialized careers in economics, entrepreneurship, or finance"
        }
      ],
      tips: [
        "If you enjoy Maths, numbers, and logical calculations → choose Commerce with Maths",
        "If you are more interested in business, management, trade, or law → choose Commerce without Maths",
        "If you dream of becoming a CA, Banker, Entrepreneur, or Manager, Commerce is the correct path"
      ],
      summary: [
        { icon: CalculatorIcon, text: "Commerce with Maths: Careers in Finance, Chartered Accountancy, Data, and Banking" },
        { icon: BuildingOfficeIcon, text: "Commerce without Maths: Careers in Management, Business, Marketing, HR, Law" },
        { icon: ChartBarIcon, text: "Flexible path to business, corporate jobs, or government services" }
      ]
    },

    arts: {
      title: "Arts Stream",
      icon: PaintBrushIcon,
      color: "from-purple-500 to-pink-500",
      description: "Arts stream is for students interested in creativity, society, culture, and history. It deals with subjects like History, Political Science, Sociology, Psychology, and Languages, and leads to careers in fields like law, journalism, education, design, and public services.",
      groups: [
        {
          id: "arts-civil-services",
          title: "Civil Services & Government Sector",
          subtitle: "For students interested in public service and governance",
          icon: UserGroupIcon,
          description: "If you're interested in serving the public and working in government roles, this group is for you.",
          subjects: ["History", "Political Science", "Geography", "Economics", "Sociology"],
          study: "How governments work, historical events and their impact, geographical features and their influence, economic policies, social structures and behaviors",
          careers: [
            "UPSC (IAS, IPS, IFS)",
            "State Public Service Exams",
            "Defence (NDA in some cases)",
            "Social Services",
            "Policy Making",
            "Public Administration"
          ],
          bestFor: "Students interested in serving the public and working in government roles"
        },
        {
          id: "arts-law-legal",
          title: "Law & Legal Studies",
          subtitle: "For students interested in legal careers and justice",
          icon: ScaleIcon,
          description: "If you're interested in law, justice, and legal systems, this group is for you.",
          subjects: ["Political Science", "History", "Economics", "Sociology", "Legal Studies"],
          study: "Legal systems, constitutional law, criminal justice, corporate regulations, human rights",
          careers: [
            "BA LLB (Lawyer, Judge, Legal Advisor)",
            "Corporate Law, Criminal Law, Human Rights Law",
            "Legal Consultant",
            "Notary",
            "Paralegal",
            "Legal Researcher"
          ],
          bestFor: "Students interested in law, justice, and legal systems"
        },
        {
          id: "arts-media-communication",
          title: "Media & Communication",
          subtitle: "For students interested in media, journalism, and creative expression",
          icon: CommandLineIcon,
          description: "If you're interested in media, communication, and creative expression, this group is for you.",
          subjects: ["History", "Political Science", "English Literature", "Mass Communication", "Psychology"],
          study: "Media ethics, communication techniques, journalism practices, public relations, content creation",
          careers: [
            "Journalism, Mass Communication",
            "Public Relations (PR)",
            "Content Writing, Editing, Anchoring",
            "Film, Television, Theatre",
            "Social Media Management",
            "Digital Marketing"
          ],
          bestFor: "Students interested in media, communication, and creative expression"
        },
        {
          id: "arts-education-social",
          title: "Education & Social Sciences",
          subtitle: "For students interested in teaching and understanding human behavior",
          icon: AcademicCapIcon,
          description: "If you're interested in education and understanding human behavior, this group is for you.",
          subjects: ["Psychology", "Sociology", "History", "Geography", "Philosophy"],
          study: "Human behavior, educational methods, social structures, historical analysis, philosophical thinking",
          careers: [
            "Teacher, Lecturer, Professor",
            "Psychologist / Counsellor",
            "Historian, Archaeologist, Sociologist",
            "Research Analyst",
            "Museum Curator",
            "Social Worker"
          ],
          bestFor: "Students interested in education and understanding human behavior"
        },
        {
          id: "arts-creative-design",
          title: "Creative & Design Careers",
          subtitle: "For students interested in artistic and creative fields",
          icon: PaintBrushIcon,
          description: "If you're interested in artistic and creative fields, this group is for you.",
          subjects: ["Fine Arts", "Performing Arts", "History", "English Literature", "Design"],
          study: "Artistic techniques, creative expression, design principles, cultural history, performance skills",
          careers: [
            "Fashion Design",
            "Interior Design",
            "Graphic Design, Animation, Fine Arts",
            "Performing Arts (Music, Dance, Theatre)",
            "Photography",
            "Creative Director"
          ],
          bestFor: "Students interested in artistic and creative fields"
        }
      ],
      tips: [
        "If you enjoy reading about history, society, psychology, or politics → Arts is your stream",
        "If you are good at expressing yourself through writing, speaking, or creativity → Arts gives you space to grow",
        "If your dream is to become a lawyer, journalist, civil servant, psychologist, teacher, or designer → Arts is the right path"
      ],
      summary: [
        { icon: UserGroupIcon, text: "Best for students who love creativity, society, culture, or governance" },
        { icon: ScaleIcon, text: "Opens doors to law, civil services, design, media, psychology, and education" },
        { icon: PaintBrushIcon, text: "Flexible stream with a wide range of career choices" }
      ]
    },

    diploma: {
      title: "Diploma Courses",
      icon: AcademicCapIcon,
      color: "from-amber-500 to-orange-500",
      description: "Apart from choosing Science, Commerce, or Arts, there is another popular option for students: Diploma courses. It is different because instead of focusing on broad subjects (like Physics or History), it directly teaches you practical and technical skills related to a particular field. It is usually a 3-year course after 10th, and after completing it, you can either start working or continue with higher studies like Degree or specialized courses.",
      groups: [
        {
          id: "engineering-diploma",
          title: "Engineering Diplomas",
          subtitle: "For students interested in technical and engineering fields",
          icon: CpuChipIcon,
          description: "If you are interested in engineering but want a hands-on start, these technical diploma programs provide practical skills in various engineering disciplines.",
          subjects: ["Mechanical", "Electrical", "Civil", "Computer / IT", "Electronics & Communication", "Automobile", "Mechatronics", "Chemical", "Textile", "Aerospace"],
          study: "Hands-on training in labs, workshops, and industries. Practical application of engineering principles, technical drawing, machinery operation, and problem-solving.",
          careers: [
            "Junior Engineer (Mechanical, Electrical, Civil, etc.)",
            "Technician in industries",
            "Computer Programmer, IT Support",
            "Lab Assistant",
            "Quality Control Inspector",
            "Maintenance Engineer"
          ],
          bestFor: "Students who are more practical than theoretical in their learning style and want early job opportunities in technical fields"
        },
        {
          id: "non-engineering-diploma",
          title: "Non-Engineering Diplomas",
          subtitle: "For students interested in creative and service-oriented fields",
          icon: PaintBrushIcon,
          description: "If you are creative and like designing, art, or fashion, or interested in service-oriented careers, these diploma programs offer specialized training.",
          subjects: ["Fashion Design", "Interior Design", "Hotel Management", "Animation & Multimedia", "Journalism & Mass Communication", "Pharmacy", "Agriculture", "Beauty & Cosmetology"],
          study: "Creative expression, design principles, hospitality management, media production, agricultural techniques, healthcare practices, and beauty treatments.",
          careers: [
            "Designer (Fashion, Interior, Graphic, Animation)",
            "Hotel & Tourism Professional",
            "Pharmacist (after pharmacy diplomas)",
            "Journalist, Content Creator",
            "Agricultural Technician",
            "Beauty Therapist, Cosmetologist"
          ],
          bestFor: "Students who are creative and like designing, art, or fashion, or interested in service-oriented careers"
        }
      ],
      tips: [
        "If you are interested in engineering but want a hands-on start → choose Engineering Diploma",
        "If you are creative and like designing, art, or fashion → choose Non-Engineering Diplomas like Fashion, Interior, or Animation",
        "If you want to start working early and earn practical skills, diploma is a smart choice"
      ],
      summary: [
        { icon: WrenchScrewdriverIcon, text: "Diploma is a skill-based, practical path after 10th" },
        { icon: BriefcaseIcon, text: "Best for students who want hands-on learning and early career opportunities" },
        { icon: AcademicCapIcon, text: "It offers both immediate jobs and higher study options (B.Tech, Degree, MBA)" }
      ]
    },

    vocational: {
      title: "Vocational Stream",
      icon: WrenchScrewdriverIcon,
      color: "from-red-500 to-rose-500",
      description: "Vocational education focuses on practical job skills instead of just academic subjects. It is specially designed for students who want to learn a trade or profession early, so that they can either start working right after 12th or continue in specialized skill-based fields. This stream is usually offered in schools under NCERT, CBSE, or State Boards, and also in ITI (Industrial Training Institutes) and skill-development colleges.",
      groups: [
        {
          id: "vocational-it",
          title: "IT & Computer Applications",
          subtitle: "For students interested in technology and computer skills",
          icon: ComputerDesktopIcon,
          description: "If you want to learn practical computer skills that can get you a job quickly, this group is for you.",
          subjects: ["Computer Applications", "IT Skills", "Data Entry", "Basic Programming", "Web Design", "Digital Marketing"],
          study: "Hands-on training in computer applications, software usage, basic programming, web design, and digital marketing techniques.",
          careers: [
            "Computer Operator",
            "Data Entry Operator",
            "IT Support Technician",
            "Web Designer",
            "Digital Marketing Specialist",
            "Software Application Trainer"
          ],
          bestFor: "Students who want to learn practical computer skills for immediate employment in the IT sector"
        },
        {
          id: "vocational-hospitality",
          title: "Hospitality & Tourism",
          subtitle: "For students interested in travel, tourism, and hospitality services",
          icon: BuildingOfficeIcon,
          description: "If you are interested in the hospitality industry, including hotels, restaurants, and tourism, this group provides hands-on training.",
          subjects: ["Hospitality Management", "Tourism & Travel", "Food & Beverage Services", "Hotel Operations", "Customer Service"],
          study: "Practical training in hotel operations, food service, tourism management, customer service, and event planning.",
          careers: [
            "Hotel Front Office Staff",
            "Restaurant Manager",
            "Travel Agent",
            "Tour Guide",
            "Event Planner",
            "Cruise Ship Staff"
          ],
          bestFor: "Students who enjoy working with people and want careers in the hospitality and tourism industry"
        },
        {
          id: "vocational-healthcare",
          title: "Healthcare & Wellness",
          subtitle: "For students interested in healthcare support and wellness services",
          icon: HeartIcon,
          description: "If you want to work in healthcare support roles or wellness services, this group provides essential training.",
          subjects: ["Healthcare Basics", "Paramedical Training", "Beauty & Wellness", "First Aid", "Patient Care"],
          study: "Hands-on training in healthcare support, patient care, beauty treatments, wellness services, and basic medical procedures.",
          careers: [
            "Paramedical Assistant",
            "Healthcare Worker",
            "Beautician",
            "Wellness Professional",
            "Dental Assistant",
            "Laboratory Technician"
          ],
          bestFor: "Students who want to work in healthcare support roles or wellness services"
        },
        {
          id: "vocational-automotive",
          title: "Automotive & Engineering Skills",
          subtitle: "For students interested in automobile technology and technical skills",
          icon: CpuChipIcon,
          description: "If you are interested in automobile technology and engineering skills, this group provides technical training.",
          subjects: ["Automobile Technology", "Electrical Skills", "Electronics", "Mechanical Skills", "Vehicle Maintenance"],
          study: "Practical training in automobile repair, electrical systems, electronics, mechanical systems, and vehicle maintenance.",
          careers: [
            "Automobile Technician",
            "Electrical Technician",
            "Electronics Technician",
            "Mechanic",
            "Service Advisor",
            "Automotive Sales Representative"
          ],
          bestFor: "Students who are interested in automobile technology and technical skills"
        },
        {
          id: "vocational-creative",
          title: "Creative & Design Skills",
          subtitle: "For students interested in creative arts and design",
          icon: PaintBrushIcon,
          description: "If you are creative and interested in design, this group provides training in creative arts and design skills.",
          subjects: ["Graphic Design", "Animation", "Multimedia", "Fashion Designing", "Interior Designing"],
          study: "Hands-on training in graphic design, animation, multimedia production, fashion designing, and interior designing.",
          careers: [
            "Graphic Designer",
            "Animator",
            "Multimedia Artist",
            "Fashion Designer",
            "Interior Designer",
            "Creative Director"
          ],
          bestFor: "Students who are creative and want careers in design and creative arts"
        },
        {
          id: "vocational-business",
          title: "Business & Financial Services",
          subtitle: "For students interested in business operations and financial services",
          icon: CurrencyDollarIcon,
          description: "If you are interested in business operations and financial services, this group provides practical training.",
          subjects: ["Retail Management", "Banking Services", "Financial Literacy", "Entrepreneurship", "Customer Service"],
          study: "Practical training in retail operations, banking services, financial literacy, entrepreneurship, and customer service.",
          careers: [
            "Retail Manager",
            "Banking Assistant",
            "Financial Services Representative",
            "Entrepreneur",
            "Customer Service Executive",
            "Sales Representative"
          ],
          bestFor: "Students who want careers in business operations and financial services"
        }
      ],
      tips: [
        "If you want to learn skills that can get you a job quickly → Vocational is a smart choice",
        "If you are interested in a specific industry (IT, Hospitality, Beauty, Healthcare, Agriculture, Automobile, Tourism), vocational subjects will give you hands-on training",
        "If you want to combine study + work (earn while learning), vocational courses are flexible and career-focused"
      ],
      summary: [
        { icon: WrenchScrewdriverIcon, text: "Vocational Stream = practical + job-oriented education" },
        { icon: BriefcaseIcon, text: "Best for students who want early employment skills, entrepreneurship opportunities, or applied careers" },
        { icon: AcademicCapIcon, text: "Offers direct jobs, higher studies (B.Voc, diplomas), and self-employment paths" }
      ]
    }
  };

  // Define government colleges data
  const governmentColleges = [
    {
      id: 1,
      name: "Indian Institute of Technology",
      location: "Delhi, India",
      type: "Engineering",
      rating: 4.8,
      description: "Premier institution for technology and engineering education with world-class research facilities."
    },
    {
      id: 2,
      name: "All India Institute of Medical Sciences",
      location: "New Delhi, India",
      type: "Medical",
      rating: 4.9,
      description: "Top medical institution in India offering undergraduate and postgraduate programs."
    },
    {
      id: 3,
      name: "University of Delhi",
      location: "Delhi, India",
      type: "Arts & Science",
      rating: 4.5,
      description: "One of India's most prestigious universities offering a wide range of undergraduate and postgraduate programs."
    },
    {
      id: 4,
      name: "Indian Institute of Management",
      location: "Ahmedabad, India",
      type: "Management",
      rating: 4.7,
      description: "Leading business school offering MBA and executive education programs."
    },
    {
      id: 5,
      name: "Jawaharlal Nehru University",
      location: "New Delhi, India",
      type: "Research",
      rating: 4.6,
      description: "Internationally recognized university for research and higher education."
    },
    {
      id: 6,
      name: "Banaras Hindu University",
      location: "Varanasi, India",
      type: "Comprehensive",
      rating: 4.4,
      description: "One of Asia's largest residential universities with diverse academic programs."
    }
  ];

  const toggleExpanded = (stream) => {
    setExpandedStreams(prev => ({
      ...prev,
      [stream]: !prev[stream]
    }));
    
    // Add to user history when expanding a stream
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const streamInfo = {
        name: streamData[stream].title,
        match: "85%", // This would be dynamic in a real implementation
        description: `Details for ${streamData[stream].title}`
      };
      
      // Get existing history
      const history = JSON.parse(localStorage.getItem('userHistory') || '{"viewedStreams":[],"viewedJobs":[]}');
      
      // Add to viewed streams (limit to 5)
      const newViewedStreams = [
        streamInfo,
        ...history.viewedStreams.filter(item => item.name !== streamInfo.name).slice(0, 4)
      ];
      
      // Update history
      const updatedHistory = {
        ...history,
        viewedStreams: newViewedStreams
      };
      
      localStorage.setItem('userHistory', JSON.stringify(updatedHistory));
    }
  };

  const ScienceGroupCard = ({ group }) => {
    const IconComponent = group.icon;
    return (
      <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-6 mb-6 transition-all duration-300 hover:border-slate-500/50">
        <div className="flex items-start space-x-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${streamData.science.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{group.title}</h3>
            <p className="text-slate-400">{group.subtitle}</p>
          </div>
        </div>
        
        <p className="text-slate-300 mb-4">{group.description}</p>
        
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-white mb-2">Subjects:</h4>
          <div className="flex flex-wrap gap-2">
            {group.subjects.map((subject, index) => (
              <span key={index} className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm">
                {subject}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-white mb-2">What you study:</h4>
          <p className="text-slate-300">{group.study}</p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-white mb-2">Career Paths:</h4>
          <ul className="space-y-2">
            {group.careers.map((career, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span className="text-slate-300">{career}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
            <LightBulbIcon className="h-5 w-5 mr-2 text-yellow-400" />
            Best For
          </h4>
          <p className="text-slate-300">{group.bestFor}</p>
        </div>
      </div>
    );
  };

  const CollegeCard = ({ college }) => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-800">{college.name}</h3>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {college.type}
          </span>
        </div>
        <p className="text-slate-600 mb-3">{college.location}</p>
        <p className="text-slate-700 mb-4">{college.description}</p>
        <div className="flex items-center">
          <div className="flex text-amber-400">
            {'★'.repeat(Math.floor(college.rating))}
            {'☆'.repeat(5 - Math.floor(college.rating))}
          </div>
          <span className="ml-2 text-slate-600 text-sm">{college.rating}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center">
            {/* Centered Text Content */}
            <div className="text-center mt-10">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Curated{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  Professional Pathway
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mx-auto mb-8">
                Explore detailed information about academic streams after 10th grade. Understand the subjects, 
                career opportunities, and pathways available in Science, Commerce, Arts, Diploma, and Vocational education.
              </p>
              <div className="text-lg text-slate-400 font-medium">
                Make informed decisions for your future 🎯
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Separator Line */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent mb-16"></div>
      </div>

      {/* Common Information Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        <div>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mr-4">
              <BookOpenIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">What After 10th? Choosing the Right Stream...</h2>
          </div>
          
          <p className="text-slate-300 text-lg mt-10 mb-3">
          After completing your 10th class, you reach a very important decision in your life: Which stream should I choose for 11th and 12th?
          </p>
          
          <p className="text-slate-300 mb-6">
            Streams are like different roads leading to different careers. Once you choose a stream, it decides what subjects you will study, and what kind of jobs or higher studies you can do in the future. The main options are Science, Commerce, Arts, Diploma Courses, and Vocational Skills.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-700/30 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <BeakerIcon className="h-5 w-5 text-blue-400 mr-2" />
                <h3 className="text-xl font-semibold text-white">Science Stream</h3>
              </div>
              <p className="text-slate-300">For students interested in engineering, medical, technology, research. Further divided into PCM (A group) and PCB (B group).</p>
            </div>
            
            <div className="bg-slate-700/30 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <CurrencyDollarIcon className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-xl font-semibold text-white">Commerce Stream</h3>
              </div>
              <p className="text-slate-300">For students who like business, finance, economics, management. Gives careers like CA, Banking, MBA, Marketing, Entrepreneurship.</p>
            </div>
            
            <div className="bg-slate-700/30 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <PaintBrushIcon className="h-5 w-5 text-purple-400 mr-2" />
                <h3 className="text-xl font-semibold text-white">Arts Stream</h3>
              </div>
              <p className="text-slate-300">For students interested in creativity, history, literature, law, social sciences, psychology, politics. Careers include Lawyer, Journalist, Designer, Teacher, Civil Services (UPSC), Social Work.</p>
            </div>
            
            <div className="bg-slate-700/30 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <AcademicCapIcon className="h-5 w-5 text-orange-400 mr-2" />
                <h3 className="text-xl font-semibold text-white">Diploma Courses</h3>
              </div>
              <p className="text-slate-300">A practical, skill-based alternative to traditional streams. Diploma courses focus on hands-on technical and professional skills directly applicable to employment. Students can pursue careers in engineering, IT, design, hospitality, and many other skilled trades. Diploma holders can either enter the workforce immediately or continue their education through lateral entry into degree programs.</p>
            </div>
            
            <div className="bg-slate-700/30 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <WrenchScrewdriverIcon className="h-5 w-5 text-red-400 mr-2" />
                <h3 className="text-xl font-semibold text-white">Vocational Skills</h3>
              </div>
              <p className="text-slate-300">Short-term, specialized training programs (6 months to 2 years) focused on specific trades. Ideal for students who want to quickly enter the workforce with practical skills in areas like plumbing, electrical work, automotive repair, beauty care, and culinary arts.</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-slate-600/30 rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-400" />
              How to Decide Which Stream is Right for You?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-blue-400 mr-2 mt-1">•</span>
                <span className="text-slate-300">Science: If you are good at Maths/Science and want to be an engineer, doctor, or scientist.</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">•</span>
                <span className="text-slate-300">Commerce: If you like numbers, accounts, money, or business.</span>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-2 mt-1">•</span>
                <span className="text-slate-300">Arts: If you are creative, love writing, history, politics, psychology, or want to prepare for government services.</span>
              </div>
              <div className="flex items-start">
                <span className="text-orange-400 mr-2 mt-1">•</span>
                <span className="text-slate-300">Diploma: If you prefer hands-on learning, want early job opportunities, or are clear about working in a specific technical or creative field.</span>
              </div>
              <div className="flex items-start">
                <span className="text-red-400 mr-2 mt-1">•</span>
                <span className="text-slate-300">Vocational: If you want the quickest entry into the workforce with specialized trade skills (6 months to 2 years).</span>
              </div>
            </div>
          </div>
          
          <div className="text-center ">
            <p className="text-lg text-slate-300">
              <span className="font-semibold text-white">So, after 10th,</span> students first need to choose one of these main paths. Then inside each path, there are many sub-options to choose...
            </p>
          </div>
        </div>
      </div>

      {/* Gradient Separator Line */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-20">
        <div className="h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent mb-16"></div>
      </div>


      {/* Streams Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {Object.entries(streamData).map(([streamKey, stream]) => {
          const IconComponent = stream.icon;

          return (
            <div key={streamKey} className="mb-16">
              {/* Stream Header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stream.color} flex items-center justify-center shadow-lg`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{stream.title}</h2>
                  <p className="text-slate-400 max-w-3xl">{stream.description}</p>
                </div>
              </div>

              {/* Science Stream Detailed Information */}
              {streamKey === 'science' && expandedStreams.science && (
                <div className="mb-10">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {stream.groups.map((group) => (
                      <ScienceGroupCard key={group.id} group={group} />
                    ))}
                  </div>
                  
                  <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-6 mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-400" />
                      How to Decide? (Tips for Class 9 & 10 Students)
                    </h3>
                    <ul className="space-y-3">
                      {stream.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2 mt-1">•</span>
                          <span className="text-slate-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-slate-600/30 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">In Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {stream.summary.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={index} className="bg-slate-800/50 p-4 rounded-lg flex items-start">
                            <IconComponent className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Commerce Stream Detailed Information */}
              {streamKey === 'commerce' && expandedStreams.commerce && (
                <div className="mb-10">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {stream.groups.map((group) => (
                      <ScienceGroupCard key={group.id} group={group} />
                    ))}
                  </div>
                  
                  <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-6 mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-400" />
                      How to Decide? (Tips for Class 9 & 10 Students)
                    </h3>
                    <ul className="space-y-3">
                      {stream.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2 mt-1">•</span>
                          <span className="text-slate-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-slate-600/30 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">In Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {stream.summary.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={index} className="bg-slate-800/50 p-4 rounded-lg flex items-start">
                            <IconComponent className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Arts Stream Detailed Information */}
              {streamKey === 'arts' && expandedStreams.arts && (
                <div className="mb-10">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {stream.groups.map((group) => (
                      <ScienceGroupCard key={group.id} group={group} />
                    ))}
                  </div>
                  
                  <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-6 mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-400" />
                      How to Decide? (Tips for Class 9 & 10 Students)
                    </h3>
                    <ul className="space-y-3">
                      {stream.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2 mt-1">•</span>
                          <span className="text-slate-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-slate-600/30 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">In Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {stream.summary.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={index} className="bg-slate-800/50 p-4 rounded-lg flex items-start">
                            <IconComponent className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Diploma Stream Detailed Information */}
              {streamKey === 'diploma' && expandedStreams.diploma && (
                <div className="mb-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {stream.groups.map((group) => (
                      <ScienceGroupCard key={group.id} group={group} />
                    ))}
                  </div>
                  
                  <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-6 mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-400" />
                      How to Decide? (Tips for Class 9 & 10 Students)
                    </h3>
                    <ul className="space-y-3">
                      {stream.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2 mt-1">•</span>
                          <span className="text-slate-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-slate-600/30 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">In Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {stream.summary.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={index} className="bg-slate-800/50 p-4 rounded-lg flex items-start">
                            <IconComponent className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Vocational Stream Detailed Information */}
              {streamKey === 'vocational' && expandedStreams.vocational && (
                <div className="mb-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stream.groups.map((group) => (
                      <ScienceGroupCard key={group.id} group={group} />
                    ))}
                  </div>
                  
                  <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-6 mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-400" />
                      How to Decide? (Tips for Class 9 & 10 Students)
                    </h3>
                    <ul className="space-y-3">
                      {stream.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2 mt-1">•</span>
                          <span className="text-slate-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-900/30 to-rose-900/30 border border-slate-600/30 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">In Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {stream.summary.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={index} className="bg-slate-800/50 p-4 rounded-lg flex items-start">
                            <IconComponent className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Other Streams Detailed Information */}
              {streamKey !== 'science' && streamKey !== 'commerce' && streamKey !== 'arts' && streamKey !== 'diploma' && streamKey !== 'vocational' && expandedStreams[streamKey] && (
                <div className="mb-10">
                  <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-6">
                    <p className="text-slate-300 text-lg">{stream.details}</p>
                  </div>
                </div>
              )}

              {/* See More Button */}
              <div className="text-center">
                <button
                  onClick={() => toggleExpanded(streamKey)}
                  className="inline-flex items-center space-x-2 px-6 py-3 text-white font-medium rounded-xl bg-transparent"
                >
                  <span>
                    {expandedStreams[streamKey] ? 'Show Less' : 'Learn More'}
                  </span>
                  <ChevronRightIcon 
                    className={`h-4 w-4 transition-transform duration-300 ${
                      expandedStreams[streamKey] ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
              </div>
            </div>
          );
        })}
        
        {/* Government Colleges Section */}
        <div className="mt-16">
          <div className="bg-white w-full rounded-2xl p-8 mb-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <AcademicCapIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-black">Top Government Colleges</h2>
                <p className="text-gray-600">Explore premier government institutions for higher education</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {governmentColleges.slice(0, 3).map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={() => navigate('/colleges')}
                className="inline-flex items-center space-x-2 px-6 py-3 text-blue-600 font-medium rounded-xl bg-transparent border border-blue-600 hover:bg-blue-50 transition-colors duration-300"
              >
                <span>View More</span>
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;