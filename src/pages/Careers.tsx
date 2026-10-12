import React, { useState } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, GraduationCap, Wrench, Users, ShieldCheck, Award, 
  MapPin, Clock, ChevronRight, CheckCircle2, Search, ArrowRight, X, Paperclip, Send
} from 'lucide-react';
import ScrollToFooterArrow from '@/components/ui/ScrollToFooterArrow';
import { cn } from '@/lib/utils';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';
import { useInventoryCareers } from '@/hooks/useInventory';

const PERKS = [
  { icon: Award, title: 'Competitive Pay', desc: 'Industry-leading compensation packages and performance bonuses.' },
  { icon: GraduationCap, title: 'Career Growth', desc: 'Continuous training and pathways for advancement within the company.' },
  { icon: Wrench, title: 'Modern Equipment', desc: 'Work with the latest diagnostic tools and state-of-the-art facilities.' },
  { icon: Users, title: 'Supportive Culture', desc: 'A collaborative, inclusive team environment that values every member.' },
  { icon: ShieldCheck, title: 'Health & Safety', desc: 'Rigorous safety standards and comprehensive health benefits.' },
  { icon: Briefcase, title: 'Employee Recognition', desc: 'Regular acknowledgment and rewards for outstanding performance.' },
];

const DEPARTMENTS = ['All', 'Towing & Recovery', 'Auto Repair', 'Body Works', 'Sales', 'Customer Support', 'Administration'];

const JOBS = [
  { 
    id: 1, 
    title: 'Senior Master Technician', 
    department: 'Auto Repair', 
    location: 'Accra Main Workshop', 
    type: 'Full-time',
    description: 'We are seeking an experienced Senior Master Technician to lead complex diagnostics and repairs.',
    responsibilities: [
      'Perform advanced diagnostic tests on modern car systems.',
      'Lead and mentor junior technicians in best practices.',
      'Ensure all repairs meet strict quality and safety standards.',
      'Maintain accurate service records and communicate with service advisors.'
    ],
    requirements: [
      'Minimum 7+ years of professional auto repair experience.',
      'Advanced diagnostic certifications (e.g., ASE Master certification or equivalent).',
      'Strong leadership and communication skills.',
      'Ability to operate the latest diagnostic equipment.'
    ],
    benefits: ['Competitive base salary', 'Performance bonuses', 'Health insurance', 'Tool allowance', 'Paid time off']
  },
  { 
    id: 2, 
    title: 'Heavy Duty Tow Truck Operator', 
    department: 'Towing & Recovery', 
    location: 'Kumasi Branch', 
    type: 'Full-time',
    description: 'Join our rapid response fleet as a Heavy Duty Tow Truck Operator handling commercial and complex recoveries.',
    responsibilities: [
      'Operate heavy-duty towing and recovery equipment safely.',
      'Provide excellent customer service during stressful roadside situations.',
      'Perform daily car inspections and basic maintenance.',
      'Document all towing operations and comply with safety regulations.'
    ],
    requirements: [
      'Valid heavy-duty commercial driver\'s license.',
      'Clean driving record.',
      'Prior experience in towing or heavy equipment operation.',
      'Ability to work flexible shifts including nights and weekends.'
    ],
    benefits: ['Competitive hourly rate', 'Overtime opportunities', 'Health insurance', 'Uniform provided', 'Safety training']
  },
  { 
    id: 3, 
    title: 'Service Advisor', 
    department: 'Customer Support', 
    location: 'Accra Main Workshop', 
    type: 'Full-time',
    description: 'Act as the primary liaison between our customers and the workshop team, ensuring a seamless service experience.',
    responsibilities: [
      'Greet customers and understand their car issues.',
      'Provide accurate cost estimates and repair timelines.',
      'Keep customers updated on repair progress.',
      'Upsell preventative maintenance services appropriately.'
    ],
    requirements: [
      'Previous experience in automotive customer service or sales.',
      'Excellent verbal and written communication skills.',
      'Basic understanding of automotive mechanics.',
      'Proficiency with shop management software.'
    ],
    benefits: ['Base salary + commission', 'Health insurance', 'Paid training', 'Career advancement opportunities']
  },
  { 
    id: 4, 
    title: 'Auto Body Painter', 
    department: 'Body Works', 
    location: 'Tema Facility', 
    type: 'Full-time',
    description: 'Bring cars back to their original showroom shine as a precision Auto Body Painter.',
    responsibilities: [
      'Prepare surfaces, mix paints, and match colors precisely.',
      'Apply primer, paint, and clear coats using spray guns.',
      'Ensure quality finishes free of runs, sags, or defects.',
      'Maintain a clean and safe spray booth environment.'
    ],
    requirements: [
      '3+ years of professional auto painting experience.',
      'Knowledge of modern waterborne and solvent paint systems.',
      'Attention to detail and a steady hand.',
      'Understanding of safety protocols regarding hazardous materials.'
    ],
    benefits: ['Competitive salary', 'Performance bonuses', 'Health insurance', 'State-of-the-art spray booth']
  },
];

const PROCESS_STEPS = [
  { title: 'Submit Application', desc: 'Apply online with your updated resume and cover letter.' },
  { title: 'Initial Screening', desc: 'Our HR team reviews applications and schedules a brief phone call.' },
  { title: 'Interview', desc: 'Meet with the hiring manager to discuss your experience and fit.' },
  { title: 'Skills Assessment', desc: 'Practical test or technical discussion (role dependent).' },
  { title: 'Offer & Onboarding', desc: 'Receive your offer and begin your journey with our team.' },
];

export default function Careers() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [isApplyingFor, setIsApplyingFor] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const { careers } = useInventoryCareers();
  const filteredJobs = activeFilter === 'All' 
    ? careers 
    : careers.filter(job => job.department === activeFilter);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setApplicationSuccess(true);
      setTimeout(() => {
        setApplicationSuccess(false);
        setIsApplyingFor(null);
      }, 3000);
    }, 1500);
  };

  const scrollToJobs = () => {
    document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
  };

  const seoTitle = useContent('seo.careers.title', 'Careers | Join the Santa Towing Team');
  const seoDesc = useContent('seo.careers.description', 'Explore exciting career opportunities for mechanics, tow truck operators, and administrative staff at Santa Towing.');
  const badge = useContent('careers.badge', 'Careers');
  const description = useContent('careers.description', "Join a team driven by excellence, innovation, and a passion for automotive service. We're looking for dedicated professionals to grow with us.");
  const heroImage = useContent('careers.heroImage', 'https://i.ibb.co/qV5D1J9/Image-13-Filters-maintenance.jpg');

  return (
    <main className="pt-24 lg:pt-[104px] min-h-screen bg-white">
      <SEO title={seoTitle} description={seoDesc} canonical="/careers" />
      
      {/* 1. Hero Banner */}
      <section className="relative bg-primary text-white py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/40 z-10" />
          <img 
            src={heroImage} 
            alt="Auto workshop team" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Careers' }]} variant="light" />
          </div>
          <div className="max-w-2xl">
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-4 block">{badge}</span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Build Your Career <span className="text-accent">With Us</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/70 leading-relaxed mb-8"
            >
              {description}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={scrollToJobs}
                className="bg-accent hover:bg-accent/90 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-lg shadow-accent/20 rounded-full"
              >
                View Open Positions
              </button>
              <a 
                href="#culture"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 sm:px-8 py-4 font-bold transition-all rounded-full"
              >
                Learn About Our Culture
              </a>
            </motion.div>
          </div>
        </div>
      
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 ">
          <ScrollToFooterArrow />
        </div>
      </section>

      {/* 2. Why Work With Us */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Why Work With Us</h2>
            <p className="text-dark/70">We believe in taking care of our team so they can take care of our customers. Here is what you can expect when you join.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PERKS.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div key={idx} className="bg-white rounded-[1px] p-6 sm:p-8 border border-dark/10 hover:shadow-xl transition-all hover:-translate-y-1 group">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">{perk.title}</h3>
                  <p className="text-dark/70 leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Life at the Company */}
      <section id="culture" className="py-12 md:py-20 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="text-accent font-bold tracking-wider uppercase text-sm">Life at Santa Towing</span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">More than just a workplace.</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                We foster a culture of continuous learning, mutual respect, and relentless dedication to quality. Whether you're turning wrenches in the bay, coordinating complex towing operations, or greeting customers at the front desk, your contribution matters here.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                We invest heavily in our facilities, ensuring our team has access to clean, modern environments and the best tools in the industry. But more importantly, we invest in our people.
              </p>
              <div className="pt-4 flex gap-4">
                <div className="bg-dark p-4 rounded-[1px] text-center flex-1 border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">150+</div>
                  <div className="text-sm text-white/70">Team Members</div>
                </div>
                <div className="bg-dark p-4 rounded-[1px] text-center flex-1 border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">4</div>
                  <div className="text-sm text-white/70">Locations</div>
                </div>
                <div className="bg-dark p-4 rounded-[1px] text-center flex-1 border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">10+</div>
                  <div className="text-sm text-white/70">Years in Business</div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img 
                  src="https://i.ibb.co/35NfN5Lx/Image-14-Suspension-Parts-maintenance.jpg" 
                  alt="Mechanics discussing" 
                  className="rounded-[1px] w-full h-48 lg:h-64 object-cover"
                />
                <img 
                  src="https://i.ibb.co/WpyLYZQk/Image-15-Car-Lightening-maintenance.jpg" 
                  alt="Customer service" 
                  className="rounded-[1px] w-full h-48 lg:h-64 object-cover translate-y-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 & 5. Open Positions */}
      <section id="open-positions" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Current Openings</h2>
            <p className="text-dark/70">Explore our current job opportunities. Don't see a perfect match? Submit a general application below.</p>
          </div>
          
          {/* Filters */}
          <div className="flex overflow-x-auto no-scrollbar py-4 gap-2 mb-8 border-b border-dark/20">
            {DEPARTMENTS.map(dept => (
              <button
                key={dept}
                onClick={() => { setActiveFilter(dept); setExpandedJobId(null); setIsApplyingFor(null); }}
                className={cn(
                  "px-6 py-2.5 rounded-md text-sm font-bold whitespace-nowrap transition-all",
                  activeFilter === dept 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-white border border-dark/20 text-dark/70 hover:border-accent hover:text-accent"
                )}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredJobs.map((job) => (
                <motion.div 
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-dark/20 rounded-[1px] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Job Header (Always visible) */}
                  <div 
                    onClick={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}
                    className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors rounded-full"
                  >
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-dark mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-dark/70 font-medium">
                        <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-[1px] text-dark"><Briefcase className="w-4 h-4" /> {job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-4">
                      {expandedJobId !== job.id && (
                        <button 
                          className="bg-primary hover:bg-black text-white px-6 py-2.5 font-bold transition-all hidden sm:block rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedJobId(job.id);
                          }}
                        >
                          View Details
                        </button>
                      )}
                      <div className={cn(
                        "w-10 h-10 rounded-xl border border-dark/20 flex items-center justify-center transition-transform",
                        expandedJobId === job.id ? "rotate-90 bg-white" : ""
                      )}>
                        <ChevronRight className="w-5 h-5 text-dark/70" />
                      </div>
                    </div>
                  </div>

                  {/* Job Details (Expandable) */}
                  <AnimatePresence>
                    {expandedJobId === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 sm:p-8 border-t border-dark/10 bg-white flex flex-col lg:flex-row gap-8">
                          
                          <div className="flex-1 space-y-8">
                            <div>
                              <h4 className="font-bold text-dark text-lg mb-3">About the Role</h4>
                              <p className="text-dark/70 leading-relaxed">{job.description}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-dark text-lg mb-3">Responsibilities</h4>
                              <ul className="space-y-2">
                                {job.responsibilities.map((req, i) => (
                                  <li key={i} className="flex items-start gap-2 text-dark/70">
                                    <div className="w-1.5 h-1.5 rounded-[1px] bg-primary mt-2 shrink-0" />
                                    <span className="leading-relaxed">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-bold text-dark text-lg mb-3">Requirements</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="flex items-start gap-2 text-dark/70">
                                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="w-full lg:w-1/3">
                            <div className="bg-white p-6 rounded-[1px] border border-dark/20 shadow-sm sticky top-32">
                              <h4 className="font-bold text-dark text-lg mb-4">Benefits</h4>
                              <ul className="space-y-3 mb-8">
                                {job.benefits.map((benefit, i) => (
                                  <li key={i} className="flex items-center gap-2 text-dark/70 text-sm font-medium">
                                    <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                      <Award className="w-4 h-4" />
                                    </div>
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                              
                              {!isApplyingFor || isApplyingFor !== job.id ? (
                                <button 
                                  onClick={() => setIsApplyingFor(job.id)}
                                  className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-4 font-bold transition-all shadow-lg flex justify-center items-center gap-2 text-lg rounded-full"
                                >
                                  Apply Now <ArrowRight className="w-5 h-5" />
                                </button>
                              ) : (
                                <div className="text-center p-4 bg-white rounded-[1px] border border-dark/20">
                                  <span className="font-bold text-dark mb-2 block">Application Form Open</span>
                                  <span className="text-sm text-dark/70">Scroll down to complete your application.</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Application Form Drawer (per job) */}
                  <AnimatePresence>
                    {isApplyingFor === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-primary text-white"
                      >
                        <div className="p-6 sm:p-8 md:p-10 border-t border-white/20 relative">
                          <button 
                            onClick={() => setIsApplyingFor(null)}
                            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors rounded-full"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          
                          <h3 className="text-2xl font-bold mb-2">Apply for {job.title}</h3>
                          <p className="text-white/80 mb-8">Please fill out the form below to submit your application.</p>
                          
                          {applicationSuccess ? (
                            <div className="bg-primary/50/20 border border-primary/50 rounded-[1px] p-6 text-center">
                              <div className="w-16 h-16 bg-primary/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-white" />
                              </div>
                              <h4 className="text-xl font-bold text-white mb-2">Application Submitted!</h4>
                              <p className="text-white/80">Thank you for applying. Our hiring team will review your application and be in touch soon.</p>
                            </div>
                          ) : (
                            <form onSubmit={handleApply} className="space-y-6">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-sm font-bold text-white/90">Full Name *</label>
                                  <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-bold text-white/90">Email Address *</label>
                                  <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-bold text-white/90">Phone Number *</label>
                                  <input type="tel" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-bold text-white/90">Portfolio / LinkedIn URL</label>
                                  <input type="url" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-white/90">Resume / CV *</label>
                                <div className="border-2 border-dashed border-white/20 rounded-[1px] p-6 text-center hover:border-accent/50 transition-colors bg-white/5">
                                  <Paperclip className="w-8 h-8 text-white/80 mx-auto mb-3" />
                                  <p className="text-sm text-white/80 mb-1">Drag and drop your resume here or</p>
                                  <button type="button" className="text-accent font-bold text-sm hover:underline rounded-full">Browse files</button>
                                  <p className="text-xs text-white/70 mt-2">PDF, DOCX up to 5MB</p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-bold text-white/70">Cover Letter / Message</label>
                                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none" placeholder="Tell us why you're a great fit for this role..."></textarea>
                              </div>

                              <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="bg-accent hover:bg-accent/90 text-white font-bold px-4 sm:px-8 py-4 transition-all shadow-lg flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-50 rounded-full"
                              >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'} <Send className="w-5 h-5" />
                              </button>
                            </form>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              ))}
              
              {filteredJobs.length === 0 && (
                <div className="text-center py-12 bg-white rounded-[1px] border border-dark/20">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-dark/70" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">No openings in this department</h3>
                  <p className="text-dark/70">Check back later or submit a general application.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>



      {/* 7. Our Hiring Process */}
      <section className="py-12 md:py-20 bg-white border-y border-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Hiring Process</h2>
            <p className="text-dark/70 max-w-2xl mx-auto">We value your time. Our process is designed to be transparent, efficient, and respectful of your career journey.</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-white -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-xl border-4 border-dark/10 shadow-md flex items-center justify-center text-xl font-bold text-dark mb-4">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-dark mb-2">{step.title}</h4>
                  <p className="text-sm text-dark/70 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8 & 9. CTA Banner */}
      <section className="py-12 md:py-20 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
        
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Team?</h2>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Even if you don't see a perfect role listed today, we are always on the lookout for great talent. Submit a general application and we'll reach out when a match opens up.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={scrollToJobs}
              className="bg-accent hover:bg-accent/90 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl text-lg rounded-full"
            >
              View Open Positions
            </button>
            <Link to="/contact" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl text-lg rounded-full">
              Submit General Application
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
