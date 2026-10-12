import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Search, Calendar, Clock, ArrowRight, ChevronRight,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SEO from '@/components/seo/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useContent } from '@/hooks/useContent';
import { BLOG_CATEGORIES, BLOG_POSTS } from '@/data/blogData';

const TAGS = ['Towing', 'Safety', 'Maintenance', 'Emergency', 'Fleet'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const allPosts = useContent<any[]>('blog.posts', BLOG_POSTS);
  const FEATURED_POST = allPosts && allPosts.length > 0 ? allPosts[0] : BLOG_POSTS[0];
  const REGULAR_POSTS = allPosts && allPosts.length > 1 ? allPosts.slice(1) : allPosts;

  const phoneRaw = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const seoTitle = useContent('seo.blog.title', 'Automotive Blog & Resources | Santa Towing');
  const seoDesc = useContent('seo.blog.description', 'Read the latest automotive guides, towing tips, safety advice, and industry updates from the experts at Santa Towing.');
  const blogBadge = useContent('blog.badge', 'Insights & Guides');
  const blogTitle = useContent('blog.title', 'Blog & Car Maintenance Guides');
  const blogDesc = useContent('blog.description', 'Expert advice, maintenance tips, safety guidelines, and company news to keep you moving safely on the road.');
  const heroImage = useContent('blog.heroImage', 'https://i.ibb.co/WpyLYZQk/Image-15-Car-Lightening-maintenance.jpg');

  const filteredPosts = useMemo(() => {
    return REGULAR_POSTS.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, REGULAR_POSTS]);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  
  const hasMore = visiblePosts < filteredPosts.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="pt-24 lg:pt-[104px] min-h-screen bg-white">
      <SEO title={seoTitle} description={seoDesc} canonical="/blog" />
      
      {/* 1. Hero Banner */}
      <section className="relative bg-primary overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-dark/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 text-white text-sm font-semibold backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />

            {blogBadge}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6"
          >
            Blog & <span className="text-accent">Resources</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto mb-10"
          >
            {blogDesc}
          </motion.p>
          
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto bg-white p-2 rounded-[1px] flex items-center shadow-2xl"
          >
            <div className="pl-4 pr-2 text-dark/70">
              <Search className="w-6 h-6" />
            </div>
            <input 
              type="text" 
              placeholder="Search articles by keyword..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 py-3 px-2 text-dark focus:outline-none bg-transparent"
            />
            <button type="submit" className="bg-accent hover:bg-accent/90 text-white px-6 py-3 font-bold transition-all rounded-full">
              Search
            </button>
          </motion.form>
        </div>
      </section>

      {/* 2. Categories Nav */}
      <section className="bg-white border-b border-dark/20 sticky top-[72px] lg:top-[104px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar py-4 gap-2">
            {BLOG_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); setSearchQuery(''); setVisiblePosts(6); }}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all",
                  activeCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-slate-100 text-dark/70 hover:bg-slate-200 hover:text-dark"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-16 md:py-24">
        
        {/* 3. Featured Post (Only show if no search/filter) */}
        {activeCategory === 'All' && !searchQuery && (
          <section className="mb-12 md:mb-20">
            <h2 className="text-2xl font-bold text-dark mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-accent rounded-full" /> Featured Article
            </h2>
            <Link to={`/blog/${FEATURED_POST.id}`} className="group block relative rounded-[1px] overflow-hidden bg-white border border-dark/10 shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={FEATURED_POST.image} alt={FEATURED_POST.title} className="w-full h-full object-cover min-h-[300px] group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute top-6 left-6 z-20">
                    <span className="bg-accent text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider shadow-lg rounded-full">
                      {FEATURED_POST.category}
                    </span>
                  </div>
                </div>
                <div className="md:w-1/2 p-6 sm:p-8 lg:p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs font-bold text-dark/60 mb-4 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {FEATURED_POST.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {FEATURED_POST.readTime}</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-dark mb-4 group-hover:text-accent transition-colors leading-tight">
                    {FEATURED_POST.title}
                  </h3>
                  <p className="text-dark/70 text-lg mb-8 line-clamp-3">
                    {FEATURED_POST.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <img src={FEATURED_POST.authorImg} alt={FEATURED_POST.author} className="w-12 h-12 rounded-[1px] border-2 border-dark/10" />
                      <div>
                        <p className="text-sm font-bold text-dark m-0 leading-none mb-1">{FEATURED_POST.author}</p>
                        <p className="text-xs text-dark/60 m-0">Editorial Team</p>
                      </div>
                    </div>
                    <span className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center group-hover:bg-white group-hover:text-secondary transition-colors border border-dark/5 shadow-sm">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          
          {/* 4. Main Feed */}
          <div className="w-full lg:w-2/3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-dark flex items-center gap-2">
                <span className="w-2 h-8 bg-primary rounded-full" /> 
                {searchQuery ? 'Search Results' : 'Latest Articles'}
              </h2>
            </div>
            
            {displayedPosts.length === 0 ? (
              <div className="text-center py-12 md:py-20 bg-slate-50 rounded-[1px] border border-dark/5">
                <Search className="w-12 h-12 text-dark/20 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark mb-2">No articles found</h3>
                <p className="text-dark/70">Try adjusting your search or selecting a different category.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="mt-6 text-accent font-bold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
                {displayedPosts.map((post, idx) => (
                  <motion.article 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex flex-col bg-white rounded-[1px] border border-dark/10 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <Link to={`/blog/${post.id}`} className="relative aspect-[16/10] overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-dark shadow-sm rounded-full">
                          {post.category}
                        </div>
                      </div>
                    </Link>
                    
                    <div className="p-6 sm:p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-center text-xs text-dark/70 mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                      </div>
                      
                      <Link to={`/blog/${post.id}`}>
                        <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-dark/70 text-sm mb-6 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-dark/10 mt-auto">
                        <div className="flex items-center gap-2">
                          <img src={post.authorImg} alt={post.author} className="w-8 h-8 rounded-[1px]" />
                          <span className="text-sm font-bold text-dark">{post.author}</span>
                        </div>
                        <Link to={`/blog/${post.id}`} className="text-primary hover:text-accent font-bold text-sm flex items-center gap-1">
                          Read <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
            
            {/* Pagination / Load More */}
            {hasMore && (
              <div className="flex justify-center">
                <button 
                  onClick={() => setVisiblePosts(prev => prev + 6)}
                  className="bg-white hover:bg-dark/5 border border-dark/20 text-dark font-bold px-4 sm:px-8 py-4 shadow-sm transition-colors flex items-center gap-2 rounded-full"
                >
                  Load More Articles <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* 5. Sidebar */}
          <aside className="w-full lg:w-1/3 space-y-8">
            
            {/* Categories */}
            <div className="bg-white rounded-[1px] p-6 border border-dark/10 shadow-sm">
              <h3 className="text-lg font-bold text-dark mb-4">Categories</h3>
              <ul className="space-y-2">
                {BLOG_CATEGORIES.filter(c => c !== 'All').map((cat, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => { setActiveCategory(cat); setSearchQuery(''); }}
                      className={cn(
                        "w-full flex justify-between items-center text-sm py-2 transition-colors",
                        activeCategory === cat ? "text-accent font-bold" : "text-dark/70 hover:text-accent"
                      )}
                    >
                      <span>{cat}</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Posts (Last 3) */}
            <div className="bg-white rounded-[1px] p-6 border border-dark/10 shadow-sm">
              <h3 className="text-lg font-bold text-dark mb-6 flex items-center gap-2">
                Recent Posts
              </h3>
              <div className="space-y-6">
                {BLOG_POSTS.slice(-3).reverse().map((post, idx) => (
                  <Link key={idx} to={`/blog/${post.id}`} className="group block">
                    <h4 className="font-bold text-dark text-sm group-hover:text-accent transition-colors line-clamp-2 mb-1">
                      {post.title}
                    </h4>
                    <span className="text-xs text-dark/70">{post.date}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Widget */}
            <div className="bg-primary rounded-[1px] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-[1px]" />
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Subscribe to Updates</h3>
              <p className="text-white/80 text-sm mb-6">Get the latest automotive tips and safety guides directly in your inbox.</p>
              {isSubscribed ? (
                <div className="bg-white/10 border border-white/20 text-white p-4 rounded-lg text-sm">
                  <span className="font-bold">Subscribed!</span> Thank you for signing up for automotive tips.
                </div>
              ) : (
                <form className="space-y-3" onSubmit={e => { e.preventDefault(); setIsSubscribed(true); }}>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent placeholder-white/70 text-sm"
                    required
                  />
                  <button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 transition-colors text-sm shadow-md rounded-full">
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>

            {/* Tag Cloud */}
            <div className="bg-white rounded-[1px] p-6 border border-dark/10 shadow-sm">
              <h3 className="text-lg font-bold text-dark mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => { setSearchQuery(tag); setActiveCategory('All'); }}
                    className="bg-slate-100 hover:bg-accent hover:text-white text-dark/70 text-xs font-bold px-3 py-1.5 transition-colors rounded-full"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* 6. Call-to-Action Banner */}
      <section className="py-12 md:py-20 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Towing Assistance? Call Now</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you need emergency recovery, roadside assistance, or general auto repairs, our 24/7 team is ready to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-accent hover:bg-red-700 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl rounded-full">
              Contact Us Immediately
            </Link>
            <a href={phoneTel || `tel:${phoneRaw}`} className="bg-white hover:bg-slate-100 text-primary px-4 sm:px-8 py-4 font-bold transition-all shadow-xl rounded-full">
              Call {phoneRaw}
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
