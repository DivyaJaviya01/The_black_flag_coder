import React, { useEffect } from 'react';
import { AcademicCapIcon, MapPinIcon, CalendarIcon, UserGroupIcon, CurrencyRupeeIcon, LinkIcon, ChevronRightIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const Colleges = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash === '#career-fields-section') {
      // Wait a bit for the page to render, then scroll to the section
      setTimeout(() => {
        const careerFieldsSection = document.getElementById('career-fields-section');
        if (careerFieldsSection) {
          careerFieldsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Default behavior - scroll to top
      window.scrollTo(0, 0);
    }
  }, []);

  // Move helper components to the top level of the component

  // Define government colleges data with detailed information
  const governmentColleges = [
    // IITs
    {
      id: 1,
      name: "Indian Institute of Technology Bombay",
      shortName: "IIT Bombay",
      type: "IIT",
      location: "Powai, Mumbai, Maharashtra",
      founded: "1958",
      campus: "Urban, ~550 acres",
      courses: {
        ug: "B.Tech (CSE, EE, Mechanical, Civil, Chemical), B.S. (Interdisciplinary)",
        pg: "M.Tech, MSc, MBA",
        research: "PhD across departments"
      },
      intake: "Several hundred UG seats",
      admissionPath: [
        "Complete Class 12 with Physics, Chemistry, Mathematics (PCM)",
        "Appear for JEE Main (NTA) and qualify for JEE Advanced",
        "Appear for JEE Advanced and secure a rank",
        "Participate in JoSAA counselling and choice filling"
      ],
      eligibility: {
        stream: "10+2 with PCM",
        percentage: "Top-percentile/percentage criteria set by exam authorities",
        entrance: "JEE Advanced"
      },
      timeline: {
        entrance: "JEE Main: Jan/Apr; JEE Advanced: May/June",
        counseling: "June–July"
      },
      fees: "INR ~1–3 LPA (government-subsidised)",
      reservation: "OBC-NCL, SC, ST, EWS, PwD quotas",
      placements: "Top recruiters include tech companies, finance, research labs",
      whyConsider: "One of India's top engineering institutes with excellent research, peer group and placement opportunities",
      tips: "Start strong in PCM from Class 11; practice problem solving and past JEE questions",
      website: "https://www.iitb.ac.in"
    },
    {
      id: 2,
      name: "Indian Institute of Technology Delhi",
      shortName: "IIT Delhi",
      type: "IIT",
      location: "Hauz Khas, New Delhi",
      founded: "1961",
      campus: "Urban, ~320 acres",
      courses: {
        ug: "B.Tech (CSE, EE, Mechanical, Civil, Chemical), B.Arch",
        pg: "M.Tech, MSc",
        research: "PhD across departments"
      },
      intake: "Several hundred UG seats",
      admissionPath: [
        "Complete Class 12 with Physics, Chemistry, Mathematics (PCM)",
        "Appear for JEE Main (NTA) and qualify for JEE Advanced",
        "Appear for JEE Advanced and secure a rank",
        "Participate in JoSAA counselling and choice filling"
      ],
      eligibility: {
        stream: "10+2 with PCM",
        percentage: "Top-percentile/percentage criteria set by exam authorities",
        entrance: "JEE Advanced"
      },
      timeline: {
        entrance: "JEE Main: Jan/Apr; JEE Advanced: May/June",
        counseling: "June–July"
      },
      fees: "INR ~1–3 LPA (government-subsidised)",
      reservation: "OBC-NCL, SC, ST, EWS, PwD quotas",
      placements: "Strong industry placements for all branches",
      whyConsider: "One of India's premier engineering institutes with excellent academics and research",
      tips: "Focus on fundamentals in PCM; practice time management with mock tests",
      website: "https://www.iitd.ac.in"
    },
    {
      id: 3,
      name: "Indian Institute of Technology Madras",
      shortName: "IIT Madras",
      type: "IIT",
      location: "Chennai, Tamil Nadu",
      founded: "1959",
      campus: "Urban, ~600 acres",
      courses: {
        ug: "B.Tech (CSE, EE, Mechanical, Civil, Chemical), BS",
        pg: "M.Tech, MSc, MBA",
        research: "PhD across departments"
      },
      intake: "Approximately 1,200 UG seats",
      admissionPath: [
        "Complete Class 12 with Physics, Chemistry, Mathematics (PCM)",
        "Appear for JEE Main (NTA) and qualify for JEE Advanced",
        "Appear for JEE Advanced and secure a rank",
        "Participate in JoSAA counselling and choice filling"
      ],
      eligibility: {
        stream: "10+2 with PCM",
        percentage: "Top-percentile/percentage criteria set by exam authorities",
        entrance: "JEE Advanced"
      },
      timeline: {
        entrance: "JEE Main: Jan/Apr; JEE Advanced: May/June",
        counseling: "June–July"
      },
      fees: "INR ~1–3 LPA (government-subsidised)",
      reservation: "OBC-NCL, SC, ST, EWS, PwD quotas",
      placements: "Top recruiters include Microsoft, Google, Amazon, Goldman Sachs",
      whyConsider: "Premier engineering institute with strong research culture and innovation",
      tips: "Strong conceptual understanding; regular problem-solving practice",
      website: "https://www.iitm.ac.in"
    },
    {
      id: 4,
      name: "Indian Institute of Technology Kharagpur",
      shortName: "IIT Kharagpur",
      type: "IIT",
      location: "Kharagpur, West Bengal",
      founded: "1951",
      campus: "Rural, ~2,100 acres",
      courses: {
        ug: "B.Tech (CSE, EE, Mechanical, Civil, Chemical), B.Arch",
        pg: "M.Tech, MSc, MBA",
        research: "PhD across departments"
      },
      intake: "Approximately 1,300 UG seats",
      admissionPath: [
        "Complete Class 12 with Physics, Chemistry, Mathematics (PCM)",
        "Appear for JEE Main (NTA) and qualify for JEE Advanced",
        "Appear for JEE Advanced and secure a rank",
        "Participate in JoSAA counselling and choice filling"
      ],
      eligibility: {
        stream: "10+2 with PCM",
        percentage: "Top-percentile/percentage criteria set by exam authorities",
        entrance: "JEE Advanced"
      },
      timeline: {
        entrance: "JEE Main: Jan/Apr; JEE Advanced: May/June",
        counseling: "June–July"
      },
      fees: "INR ~1–3 LPA (government-subsidised)",
      reservation: "OBC-NCL, SC, ST, EWS, PwD quotas",
      placements: "Top recruiters include TCS, Infosys, Wipro, L&T, Microsoft",
      whyConsider: "India's first IIT with rich heritage and excellent infrastructure",
      tips: "Focus on core subjects; practice previous years' JEE Advanced papers",
      website: "https://www.iitkgp.ac.in"
    },
    {
      id: 5,
      name: "Indian Institute of Technology Kanpur",
      shortName: "IIT Kanpur",
      type: "IIT",
      location: "Kanpur, Uttar Pradesh",
      founded: "1959",
      campus: "Rural, ~1,000 acres",
      courses: {
        ug: "B.Tech (CSE, EE, Mechanical, Civil, Chemical), BS",
        pg: "M.Tech, MSc, MBA",
        research: "PhD across departments"
      },
      intake: "Approximately 800 UG seats",
      admissionPath: [
        "Complete Class 12 with Physics, Chemistry, Mathematics (PCM)",
        "Appear for JEE Main (NTA) and qualify for JEE Advanced",
        "Appear for JEE Advanced and secure a rank",
        "Participate in JoSAA counselling and choice filling"
      ],
      eligibility: {
        stream: "10+2 with PCM",
        percentage: "Top-percentile/percentage criteria set by exam authorities",
        entrance: "JEE Advanced"
      },
      timeline: {
        entrance: "JEE Main: Jan/Apr; JEE Advanced: May/June",
        counseling: "June–July"
      },
      fees: "INR ~1–3 LPA (government-subsidised)",
      reservation: "OBC-NCL, SC, ST, EWS, PwD quotas",
      placements: "Top recruiters include Google, Microsoft, Goldman Sachs, McKinsey",
      whyConsider: "Known for strong academics and research in science and engineering",
      tips: "Focus on conceptual clarity; practice analytical problem-solving",
      website: "https://www.iitk.ac.in"
    },
    {
      id: 6,
      name: "Indian Institute of Technology Roorkee",
      shortName: "IIT Roorkee",
      type: "IIT",
      location: "Roorkee, Uttarakhand",
      founded: "1847",
      campus: "Rural, ~365 acres",
      courses: {
        ug: "B.Tech (CSE, EE, Mechanical, Civil, Chemical), B.Arch",
        pg: "M.Tech, MSc, MBA",
        research: "PhD across departments"
      },
      intake: "Approximately 900 UG seats",
      admissionPath: [
        "Complete Class 12 with Physics, Chemistry, Mathematics (PCM)",
        "Appear for JEE Main (NTA) and qualify for JEE Advanced",
        "Appear for JEE Advanced and secure a rank",
        "Participate in JoSAA counselling and choice filling"
      ],
      eligibility: {
        stream: "10+2 with PCM",
        percentage: "Top-percentile/percentage criteria set by exam authorities",
        entrance: "JEE Advanced"
      },
      timeline: {
        entrance: "JEE Main: Jan/Apr; JEE Advanced: May/June",
        counseling: "June–July"
      },
      fees: "INR ~1–3 LPA (government-subsidised)",
      reservation: "OBC-NCL, SC, ST, EWS, PwD quotas",
      placements: "Top recruiters include L&T, TCS, Infosys, Wipro, Amazon",
      whyConsider: "One of the oldest technical institutions with strong heritage",
      tips: "Focus on fundamentals; practice time management during exams",
      website: "https://www.iitr.ac.in"
    },
    
    // NITs
    {
      id: 7,
      name: "National Institute of Technology Trichy",
      shortName: "NIT Trichy",
      type: "NIT",
      location: "Tiruchirappalli, Tamil Nadu",
      founded: "1964",
      campus: "Urban, ~200 acres",
      courses: {
        ug: "B.Tech (CSE, ECE, Mechanical, Civil, Electrical)",
        pg: "M.Tech, MSc",
        research: "PhD programs"
      },
      intake: "Approximately 1,000 UG seats",
      admissionPath: [
        "Complete Class 12 with Physics, Chemistry, Mathematics (PCM)",
        "Appear for JEE Main (NTA)",
        "Based on JEE Main rank participate in JoSAA counseling",
        "Choice filling and seat allocation"
      ],
      eligibility: {
        stream: "10+2 with PCM",
        percentage: "As per NTA/JoSAA guidelines",
        entrance: "JEE Main"
      },
      timeline: {
        entrance: "JEE Main: Jan/Apr",
        counseling: "June–July"
      },
      fees: "INR ~1–2 LPA (government-subsidised)",
      reservation: "SC, ST, OBC-NCL, EWS, PwD and Home State quotas",
      placements: "Top recruiters include TCS, Infosys, Wipro, L&T, Accenture",
      whyConsider: "One of India's top NITs with strong academics and placements",
      tips: "Focus on JEE Main preparation; practice numerical problems regularly",
      website: "https://www.nitt.edu"
    },
    {
      id: 8,
      name: "National Institute of Technology Warangal",
      shortName: "NIT Warangal",
      type: "NIT",
      location: "Warangal, Telangana",
      founded: "1959",
      campus: "Urban, ~240 acres",
      courses: {
        ug: "B.Tech (CSE, ECE, Mechanical, Civil, Electrical)",
        pg: "M.Tech, MSc",
        research: "PhD programs"
      },
      intake: "Approximately 900 UG seats",
      admissionPath: [
        "Complete Class 12 with Physics, Chemistry, Mathematics (PCM)",
        "Appear for JEE Main (NTA)",
        "Based on JEE Main rank participate in JoSAA counseling",
        "Choice filling and seat allocation"
      ],
      eligibility: {
        stream: "10+2 with PCM",
        percentage: "As per NTA/JoSAA guidelines",
        entrance: "JEE Main"
      },
      timeline: {
        entrance: "JEE Main: Jan/Apr",
        counseling: "June–July"
      },
      fees: "INR ~1–2 LPA (government-subsidised)",
      reservation: "SC, ST, OBC-NCL, EWS, PwD and Home State quotas",
      placements: "Top recruiters include Microsoft, Amazon, Google, TCS, Infosys",
      whyConsider: "One of the oldest and most prestigious NITs with excellent infrastructure",
      tips: "Strong foundation in PCM; regular practice of JEE Main pattern questions",
      website: "https://www.nitw.ac.in"
    },
    {
      id: 9,
      name: "National Institute of Technology Surathkal",
      shortName: "NIT Surathkal",
      type: "NIT",
      location: "Surathkal, Karnataka",
      founded: "1960",
      campus: "Urban, ~350 acres",
      courses: {
        ug: "B.Tech (CSE, ECE, Mechanical, Civil, Electrical)",
        pg: "M.Tech, MSc",
        research: "PhD programs"
      },
      intake: "Approximately 800 UG seats",
      admissionPath: [
        "Complete Class 12 with Physics, Chemistry, Mathematics (PCM)",
        "Appear for JEE Main (NTA)",
        "Based on JEE Main rank participate in JoSAA counseling",
        "Choice filling and seat allocation"
      ],
      eligibility: {
        stream: "10+2 with PCM",
        percentage: "As per NTA/JoSAA guidelines",
        entrance: "JEE Main"
      },
      timeline: {
        entrance: "JEE Main: Jan/Apr",
        counseling: "June–July"
      },
      fees: "INR ~1–2 LPA (government-subsidised)",
      reservation: "SC, ST, OBC-NCL, EWS, PwD and Home State quotas",
      placements: "Top recruiters include TCS, Infosys, Wipro, L&T, Microsoft",
      whyConsider: "Top NIT with excellent faculty and research facilities",
      tips: "Focus on core engineering subjects; practice aptitude questions",
      website: "https://www.nitk.ac.in"
    },
    
    // IIITs
    {
      id: 10,
      name: "International Institute of Information Technology Hyderabad",
      shortName: "IIIT Hyderabad",
      type: "IIIT",
      location: "Gachibowli, Hyderabad, Telangana",
      founded: "1998",
      campus: "Urban, ~75 acres",
      courses: {
        ug: "B.Tech (CSE, ECE), Dual Degree (CSE, ECE)",
        pg: "M.Tech, MS, MBA",
        research: "PhD in CS, ECE, CB, CDS"
      },
      intake: "Approximately 300 UG seats",
      admissionPath: [
        "Complete Class 12 with Mathematics",
        "Appear for JEE Main or UGEE (IIIT Hyderabad entrance exam)",
        "Based on rank participate in counseling",
        "Choice filling and seat allocation"
      ],
      eligibility: {
        stream: "10+2 with Mathematics",
        percentage: "As per institute guidelines",
        entrance: "JEE Main/UGEE"
      },
      timeline: {
        entrance: "JEE Main: Jan/Apr; UGEE: May",
        counseling: "June–July"
      },
      fees: "INR ~2–4 LPA",
      reservation: "SC, ST, OBC-NCL, EWS, PwD quotas",
      placements: "Top recruiters include Google, Microsoft, Amazon, Facebook, Apple",
      whyConsider: "Premier institute for IT and CS with strong industry connections",
      tips: "Focus on programming and mathematics; practice coding problems",
      website: "https://www.iiit.ac.in"
    },
    {
      id: 11,
      name: "Indian Institute of Information Technology Bangalore",
      shortName: "IIIT Bangalore",
      type: "IIIT",
      location: "Bangalore, Karnataka",
      founded: "2013",
      campus: "Urban, ~50 acres",
      courses: {
        ug: "B.Tech (CSE, ECE), Dual Degree",
        pg: "M.Tech, MS",
        research: "PhD programs"
      },
      intake: "Approximately 200 UG seats",
      admissionPath: [
        "Complete Class 12 with Mathematics",
        "Appear for JEE Main",
        "Based on JEE Main rank participate in JoSAA counseling",
        "Choice filling and seat allocation"
      ],
      eligibility: {
        stream: "10+2 with Mathematics",
        percentage: "As per NTA/JoSAA guidelines",
        entrance: "JEE Main"
      },
      timeline: {
        entrance: "JEE Main: Jan/Apr",
        counseling: "June–July"
      },
      fees: "INR ~2–3 LPA",
      reservation: "SC, ST, OBC-NCL, EWS, PwD quotas",
      placements: "Top recruiters include Microsoft, Google, Amazon, Flipkart",
      whyConsider: "Focused on IT education with industry-oriented curriculum",
      tips: "Focus on programming skills; practice competitive coding",
      website: "https://www.iiitb.ac.in"
    },
    
    // AIIMS
    {
      id: 12,
      name: "All India Institute of Medical Sciences",
      shortName: "AIIMS New Delhi",
      type: "AIIMS",
      location: "Ansari Nagar, New Delhi",
      founded: "1956",
      campus: "Urban, ~160 acres",
      courses: {
        ug: "MBBS, BSc Nursing (Hons), BSc Allied Health",
        pg: "MD/MS, DM/MCh",
        research: "PhD programs"
      },
      intake: "Approximately 100 MBBS seats",
      admissionPath: [
        "Complete Class 12 with Physics, Chemistry, Biology (PCB)",
        "Appear for NEET-UG (National Testing Agency)",
        "Based on NEET rank & counseling (DGHS processes)",
        "Seat allocation through centralized counseling"
      ],
      eligibility: {
        stream: "12th with PCB",
        percentage: "As per NEET prospectus",
        entrance: "NEET-UG"
      },
      timeline: {
        entrance: "NEET-UG: May (annual)",
        counseling: "June–July"
      },
      fees: "INR ~5,000-15,000 per year (heavily subsidized)",
      reservation: "SC, ST, OBC, EWS, PwD quotas as per government norms",
      placements: "100% placement rate for MBBS graduates in prestigious hospitals",
      whyConsider: "India's premier medical institution with world-class facilities and faculty",
      tips: "Focus on NCERT textbooks; practice MCQs regularly; maintain consistency",
      website: "https://www.aiims.edu"
    },
    {
      id: 13,
      name: "All India Institute of Medical Sciences",
      shortName: "AIIMS Bhopal",
      type: "AIIMS",
      location: "Bhopal, Madhya Pradesh",
      founded: "2012",
      campus: "Urban, ~240 acres",
      courses: {
        ug: "MBBS, BSc Nursing (Hons), BSc Allied Health",
        pg: "MD/MS, DM/MCh",
        research: "PhD programs"
      },
      intake: "Approximately 100 MBBS seats",
      admissionPath: [
        "Complete Class 12 with Physics, Chemistry, Biology (PCB)",
        "Appear for NEET-UG (National Testing Agency)",
        "Based on NEET rank & counseling (DGHS processes)",
        "Seat allocation through centralized counseling"
      ],
      eligibility: {
        stream: "12th with PCB",
        percentage: "As per NEET prospectus",
        entrance: "NEET-UG"
      },
      timeline: {
        entrance: "NEET-UG: May (annual)",
        counseling: "June–July"
      },
      fees: "INR ~5,000-15,000 per year (heavily subsidized)",
      reservation: "SC, ST, OBC, EWS, PwD quotas as per government norms",
      placements: "100% placement rate for MBBS graduates in prestigious hospitals",
      whyConsider: "Part of prestigious AIIMS network with modern facilities",
      tips: "Focus on NCERT textbooks; practice MCQs regularly",
      website: "https://www.aiimsbhopal.edu.in"
    },
    
    // Other Government Colleges
    {
      id: 14,
      name: "Shri Ram College of Commerce",
      shortName: "SRCC, DU",
      type: "Government Commerce College",
      location: "North Campus, New Delhi",
      founded: "1926",
      campus: "Urban, Part of DU North Campus",
      courses: {
        ug: "B.Com (Hons), B.A. (Hons) Economics",
        pg: "M.Com, M.A. Economics",
        research: "PhD programs"
      },
      intake: "Approximately 400 UG seats (highly competitive)",
      admissionPath: [
        "Complete Class 12 in any stream",
        "Based on Class 12 board marks",
        "Participate in DU Common Seat Allocation System (CSAS)",
        "Choice filling and seat allocation based on cutoffs"
      ],
      eligibility: {
        stream: "10+2 in any stream",
        percentage: "High cutoffs (95%+ for top courses)",
        entrance: "Class 12 board marks"
      },
      timeline: {
        entrance: "Class 12 board exams: March-May",
        counseling: "June–July"
      },
      fees: "INR ~10,000-20,000 per year",
      reservation: "SC, ST, OBC quotas as per DU norms",
      placements: "Top recruiters include KPMG, Deloitte, PwC, EY, Goldman Sachs",
      whyConsider: "One of India's top commerce colleges with excellent faculty and placement opportunities",
      tips: "Focus on board exams; aim for 95%+ in relevant subjects",
      website: "https://www.srcw.du.ac.in"
    },
    {
      id: 15,
      name: "Banaras Hindu University",
      shortName: "BHU",
      type: "Central University",
      location: "Varanasi, Uttar Pradesh",
      founded: "1916",
      campus: "Urban, ~1,300 acres",
      courses: {
        ug: "B.A., B.Sc., B.Com, B.Ed, B.Tech, MBBS",
        pg: "M.A., M.Sc., M.Com, M.Ed, M.Tech, MD/MS",
        research: "PhD across departments"
      },
      intake: "Approximately 5,000 UG seats across programs",
      admissionPath: [
        "Complete Class 12 in relevant stream",
        "Appear for BHU UET/PET entrance exams or through CUET",
        "Based on entrance rank participate in counseling",
        "Choice filling and seat allocation"
      ],
      eligibility: {
        stream: "10+2 in relevant stream",
        percentage: "As per university guidelines",
        entrance: "BHU UET/PET or CUET"
      },
      timeline: {
        entrance: "May-June",
        counseling: "July-August"
      },
      fees: "INR ~5,000-50,000 per year (varies by program)",
      reservation: "SC, ST, OBC, EWS, PwD quotas as per government norms",
      placements: "Top recruiters include TCS, Infosys, Wipro, HCL, ICICI Bank",
      whyConsider: "One of Asia's largest residential universities with diverse programs",
      tips: "Focus on entrance exam preparation; practice previous years' papers",
      website: "https://www.bhu.ac.in"
    },
    {
      id: 16,
      name: "Indian Statistical Institute",
      shortName: "ISI",
      type: "Institute of National Importance",
      location: "Kolkata, West Bengal",
      founded: "1931",
      campus: "Urban, ~35 acres",
      courses: {
        ug: "B.Stat, B.Math",
        pg: "M.Stat, M.Math, M.Tech",
        research: "PhD in Statistics, Mathematics, Computer Science"
      },
      intake: "Approximately 60 UG seats (highly competitive)",
      admissionPath: [
        "Complete Class 12 with Mathematics and English",
        "Appear for ISI Admission Test (UG)",
        "Shortlisted candidates called for interview",
        "Final selection based on test and interview performance"
      ],
      eligibility: {
        stream: "10+2 with Mathematics and English",
        percentage: "No specific minimum percentage",
        entrance: "ISI Admission Test"
      },
      timeline: {
        entrance: "May (annual)",
        counseling: "June-July"
      },
      fees: "INR ~5,000-15,000 per year (heavily subsidized)",
      reservation: "SC, ST, OBC, PwD quotas as per government norms",
      placements: "Top recruiters include Google, Microsoft, Goldman Sachs, McKinsey",
      whyConsider: "Premier institute for Statistics and Mathematics with excellent research opportunities",
      tips: "Strong foundation in Mathematics; practice Olympiad-level problems",
      website: "https://www.isical.ac.in"
    },
    {
      id: 17,
      name: "Jawaharlal Nehru University",
      shortName: "JNU",
      type: "Central University",
      location: "New Delhi",
      founded: "1969",
      campus: "Urban, ~1,000 acres",
      courses: {
        ug: "BA (Hons) in various subjects",
        pg: "MA, MSc, MCA, MPhil",
        research: "PhD across departments"
      },
      intake: "Approximately 3,000 UG seats across programs",
      admissionPath: [
        "Complete Class 12 in any stream",
        "Appear for JNUEE (JNU Entrance Examination)",
        "Based on entrance rank participate in counseling",
        "Choice filling and seat allocation"
      ],
      eligibility: {
        stream: "10+2 in any stream",
        percentage: "As per university guidelines",
        entrance: "JNUEE"
      },
      timeline: {
        entrance: "September-October",
        counseling: "November-December"
      },
      fees: "INR ~10,000-25,000 per year",
      reservation: "SC, ST, OBC, EWS, PwD quotas as per government norms",
      placements: "Top recruiters include UN agencies, NGOs, Media houses, Government services",
      whyConsider: "Internationally recognized university for research and higher education",
      tips: "Strong general knowledge; practice analytical reasoning questions",
      website: "https://www.jnu.ac.in"
    },
    {
      id: 18,
      name: "Indian Institute of Science",
      shortName: "IISc Bangalore",
      type: "Institute of National Importance",
      location: "Bangalore, Karnataka",
      founded: "1909",
      campus: "Urban, ~400 acres",
      courses: {
        ug: "B.Sc (Research), B.A. (Hons)",
        pg: "M.Sc, M.Des, M.Tech",
        research: "PhD across departments"
      },
      intake: "Approximately 200 UG seats",
      admissionPath: [
        "Complete Class 12 with PCM/PCB",
        "Appear for JEE Advanced or KVPY or IISER Aptitude Test",
        "Based on rank participate in counseling",
        "Choice filling and seat allocation"
      ],
      eligibility: {
        stream: "10+2 with PCM/PCB",
        percentage: "As per institute guidelines",
        entrance: "JEE Advanced/KVPY/IISER Aptitude Test"
      },
      timeline: {
        entrance: "JEE Advanced: May/June; KVPY: November",
        counseling: "June–July"
      },
      fees: "INR ~10,000-20,000 per year (heavily subsidized)",
      reservation: "SC, ST, OBC-NCL, EWS, PwD quotas",
      placements: "Top recruiters include Google, Microsoft, Intel, TCS Research",
      whyConsider: "Premier research institute with world-class facilities",
      tips: "Strong foundation in science subjects; focus on research aptitude",
      website: "https://www.iisc.ac.in"
    }
  ];

  // Move helper components to the top level
  const CareerFieldCard = ({ field, streamColor }) => {
    // Function to get trend color based on trend value
    const getTrendColor = (trend) => {
      if (trend.includes('Up') || trend.includes('up') || trend.includes('+')) {
        return 'text-green-400';
      } else if (trend.includes('Down') || trend.includes('down') || trend.includes('-')) {
        return 'text-red-400';
      } else {
        return 'text-yellow-400';
      }
    };

    return (
      <div className="group bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">
            {field.name}
          </h3>
          <BookmarkIcon className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${getTrendColor(field.trend)}`}>
            {field.trend}
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-12 bg-slate-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full bg-gradient-to-r ${streamColor} transition-all duration-500`}
                style={{ width: `${field.popularity}%` }}
              ></div>
            </div>
            <span className="text-xs text-slate-400">{field.popularity}%</span>
          </div>
        </div>
      </div>
    );
  };

  const CollegeCard = ({ college }) => {
    // Generate a unique background color based on college name
    const getCollegeColor = (name) => {
      const colors = [
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-green-500 to-emerald-500',
        'from-amber-500 to-orange-500',
        'from-rose-500 to-red-500',
        'from-indigo-500 to-blue-500',
        'from-teal-500 to-cyan-500',
        'from-fuchsia-500 to-purple-500',
        'from-lime-500 to-green-500',
        'from-violet-500 to-purple-500'
      ];
      
      // Simple hash function to get consistent color for each college
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      return colors[Math.abs(hash) % colors.length];
    };
    
    const collegeColor = getCollegeColor(college.name);

    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* College Image Placeholder */}
        <div className={`h-48 bg-gradient-to-r ${collegeColor} relative`}>
          {/* Simulate campus elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <AcademicCapIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{college.shortName}</h3>
              <p className="text-blue-100 text-sm mt-1">{college.type}</p>
            </div>
          </div>
          
          {/* Simulate campus buildings */}
          <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center space-x-2 px-4">
            <div className="w-8 h-12 bg-white/20 rounded-sm"></div>
            <div className="w-6 h-8 bg-white/20 rounded-sm"></div>
            <div className="w-10 h-16 bg-white/20 rounded-sm"></div>
            <div className="w-6 h-10 bg-white/20 rounded-sm"></div>
            <div className="w-8 h-14 bg-white/20 rounded-sm"></div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-800">{college.name}</h3>
              <p className="text-slate-600 text-sm">{college.shortName}</p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
              {college.type}
            </span>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-slate-600">
              <MapPinIcon className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm">{college.location}</span>
            </div>
            
            <div className="flex items-center text-slate-600">
              <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm">Founded: {college.founded}</span>
            </div>
            
            <div className="flex items-center text-slate-600">
              <UserGroupIcon className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm">Intake: {college.intake}</span>
            </div>
            
            <div className="flex items-center text-slate-600">
              <CurrencyRupeeIcon className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm">Fees: {college.fees}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-md font-semibold text-slate-800 mb-2">Why Consider?</h4>
            <p className="text-slate-700 text-sm">{college.whyConsider}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-md font-semibold text-slate-800 mb-2">Admission Path</h4>
            <ul className="space-y-1">
              {college.admissionPath.slice(0, 2).map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2 text-xs mt-1">{index + 1}.</span>
                  <span className="text-slate-600 text-xs">{step}</span>
                </li>
              ))}
              <li className="text-slate-600 text-xs">+{college.admissionPath.length - 2} more steps</li>
            </ul>
          </div>
          
          <div className="flex justify-between items-center">
            <a 
              href={college.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <LinkIcon className="h-4 w-4 mr-1" />
              Visit Website
            </a>
            <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded">
              {college.reservation}
            </span>
          </div>
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
                Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Government Colleges</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mx-auto mb-8">
                Explore premier government institutions for higher education across various fields with detailed information on admissions, courses, and opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Separator Line */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent mb-16"></div>
      </div>

      {/* Colleges Section */}
      <div className="relative z-10 mx-auto px-10 pb-20">
        <div className="bg-white rounded-2xl p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governmentColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colleges;
