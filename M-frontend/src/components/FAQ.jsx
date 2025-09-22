import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Why is having career field information important for students?",
      answer: "Having career insights is essential for students because it empowers them to make informed decisions about their future. It's not just about a job title; it's about understanding the reality of a profession.\n\nInformed Decisions: Knowing about career options helps students choose paths that align with their interests and skills, preventing career dissatisfaction later. Strategic Academic Planning: With career knowledge, students can select relevant subjects and educational streams that directly support their professional goals, making their learning purposeful. Realistic Expectations: Insights into daily tasks and challenges provide a true picture of a career, helping students manage expectations and decide if a job is the right fit.\n\nJob Market Readiness: Understanding in-demand skills and emerging industries gives students a competitive edge, allowing them to focus their development on areas with high growth potential. Increased Motivation: A clear career goal gives students a sense of purpose, boosting their motivation and focus to excel in their studies."
    },
    {
      question: "How does this information help in academic planning?",
      answer: "The particulars (or insights) about a career field are essential for academic planning because they provide a direct link between what a student studies and what they want to achieve professionally. Without this knowledge, academic choices can feel random or purposeless. Here's how it helps:\n\nSubject Selection: Knowing a career's requirements guides students in choosing the right subjects. For example, someone aiming for a career in engineering will prioritize physics and mathematics, while an aspiring doctor will focus on biology and chemistry. This ensures they meet the prerequisites for their desired higher education. Streamlining the Curriculum: These insights help students and their advisors create a focused academic plan. They can choose elective courses, projects, or certifications that build relevant skills for their chosen field, rather than just taking general subjects.\n\nBoosting Motivation: When a student sees a direct connection between a difficult subject and their dream job, their motivation increases. The challenges of learning complex topics become a necessary step on their career roadmap, giving their studies a clear sense of purpose. Making Informed Decisions: Understanding a career's academic demands helps students make realistic choices. If a student discovers a field requires advanced math they aren't strong in, they can either get extra help or pivot to a different, more suitable career path before investing years in the wrong direction."
    },
    {
      question: "Can this information prevent career disappointment?",
      answer: "Yes, statistics can significantly help prevent career disappointment by providing a realistic, data-driven perspective on a particular career field. Instead of relying on a romanticized or anecdotal view, a student can use statistics to understand the hard truths and practicalities of a profession. Here's how statistics help:\n\nAligning Expectations with Reality: Statistics on job growth, salary ranges, and work-life balance can help a student verify if their expectations for a career are realistic. For example, a student interested in becoming a graphic designer might discover through statistics that it's a very competitive field with a median salary lower than they expected. This insight allows them to either adjust their goals or choose a more financially stable path.\n\nHighlighting Necessary Skills: Data on skill requirements and market demand can show a student which specific abilities are most valuable in a field. If a student sees that careers in data science are projected to grow significantly, with a high demand for Python and SQL skills, they can prioritize learning those languages. This prevents the disappointment of entering a field without the necessary skills. Understanding Industry Stability: Statistics on job turnover rates and industry trends can give a student a sense of a field's stability. A student interested in a highly volatile industry might use this information to create a more resilient career plan, perhaps by pursuing skills in a related but more stable sector as a backup."
    },
    {
      question: "How does having this knowledge help in the job market?",
      answer: "Having career insights and knowledge about different fields is a significant advantage in the job market because it allows you to be proactive and strategic, rather than reactive. This knowledge helps you not only find a job but find the right job.\n\n1. Identifying High-Growth Opportunities 📈\nKnowledge of the job market helps you spot emerging roles and industries. For example, by researching current trends, you would discover that data analytics and cybersecurity are high-growth fields, even if they didn't exist in a major way ten years ago. This allows you to focus your education and skill development on areas with a high demand for talent, increasing your chances of getting hired.\n\n2. Tailoring Your Skills and Resume 🎯\nUnderstanding the specifics of a career field allows you to tailor your resume and cover letter to match exactly what employers are looking for. Instead of listing generic skills, you can highlight the in-demand skills (e.g., Python for data science, Figma for UX design) that are most relevant to the role you're applying for. This makes you a more compelling candidate and shows you've done your homework. 3. Effective Networking and Interviewing 🤝\nWhen you have a deep understanding of a field, you can have more meaningful conversations with professionals in that industry. You can ask intelligent questions during interviews that go beyond the obvious. This shows interviewers that you are genuinely interested and knowledgeable, setting you apart from other applicants who may be less prepared."
    },
    {
      question: "Is this information useful for career transitions?",
      answer: "Career insights are vital for a successful career transition because they transform a risky, impulsive change into a strategic and well-planned move. They go beyond simple research and provide a structured framework for understanding a new profession.\n\nInstead of just jumping from one job to another, a person can use these insights to explore new fields methodically, gaining a data-driven understanding of the daily demands, salary potential, and long-term outlook.\n\nThis helps them identify which of their existing transferable skills (like project management or communication) are valuable in the new field. Ultimately, having this knowledge helps a career changer avoid the disappointment of landing in a job that doesn't align with their expectations, ensuring their next professional step is an informed one."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Enhanced gradient background with mesh pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.15),transparent_70%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_70%)] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_70%)] opacity-70" />
      
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-500/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/15 blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      <div className="pointer-events-none absolute top-1/4 left-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-400/10 blur-3xl animate-pulse" style={{animationDelay: '4s'}} />

      {/* Floating geometric elements */}
      <div className="pointer-events-none absolute top-20 right-20 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}} />
      <div className="pointer-events-none absolute top-40 left-20 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-300 rounded-full animate-bounce opacity-40" style={{animationDelay: '3s'}} />
      <div className="pointer-events-none absolute bottom-40 left-40 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full animate-bounce opacity-50" style={{animationDelay: '5s'}} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">Questions</span>
          </h2>
          <p className="text-xl text-slate-300/90 max-w-3xl mx-auto">
            Get answers to common questions about our AI-powered career guidance platform
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              <button
                className="flex items-center justify-between w-full px-6 py-5 text-left group"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                  {faq.question}
                </span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  {openIndex === index ? (
                    <MinusIcon className="w-5 h-5 text-cyan-300" />
                  ) : (
                    <PlusIcon className="w-5 h-5 text-cyan-300" />
                  )}
                </div>
              </button>
              
              <div 
                className={`grid transition-all duration-300 px-6 ${
                  openIndex === index 
                    ? 'grid-rows-[1fr] opacity-100 mb-5' 
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <p 
                  className="overflow-hidden text-slate-300/90 leading-relaxed whitespace-pre-line"
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;