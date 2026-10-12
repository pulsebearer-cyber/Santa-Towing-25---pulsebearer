import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronRight, Calendar, Clock, Facebook, Twitter, 
  Linkedin, Link2, ArrowRight, AlertTriangle
} from 'lucide-react';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';
import { BLOG_POSTS } from '@/data/blogData';

export default function BlogPost() {
  const { id } = useParams();
  const phoneRaw = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const allPosts = useContent<any[]>('blog.posts', BLOG_POSTS);
  
  const article = useMemo(() => {
    return (allPosts || BLOG_POSTS).find(p => String(p.id) === String(id)) || (allPosts || BLOG_POSTS)[0];
  }, [id, allPosts]);

  const publishedIso = useMemo(() => {
    try {
      const d = new Date(article.date);
      return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
    } catch {
      return new Date().toISOString();
    }
  }, [article.date]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) return null;

  // Generate generic content based on the excerpt since we only have short data
  const content = `
    <p class="lead">${article.excerpt}</p>
    <h2>Understanding the Basics</h2>
    <p>Whether you're dealing with an emergency or performing routine maintenance, knowledge is your best defense against the unexpected. Taking the time to properly inspect your car can prevent costly breakdowns.</p>
    
    <blockquote>"Preparation is the key to safety on the road. A few minutes of checks can save you hours of stress." - ${article.author}</blockquote>
    
    <h2>Key Recommendations</h2>
    <p>In addition to standard guidelines, we strongly recommend that you:</p>
    <ul>
      <li><strong>Check Regularly:</strong> Inspect essential components before every major trip.</li>
      <li><strong>Use Quality Parts:</strong> Never compromise on tires, brakes, or fluids.</li>
      <li><strong>Consult Professionals:</strong> If you're unsure about an unusual noise, have a certified mechanic take a look.</li>
      <li><strong>Stay Safe:</strong> In an emergency, always prioritize your physical safety over the car.</li>
    </ul>

    <h2>When to Call for Help</h2>
    <p>Some situations are too dangerous to handle alone. If your car breaks down on a busy highway, loses power steering, or experiences severe overheating, pull over safely and call a professional towing service immediately.</p>
    
    <img src="${article.image}" alt="${article.title}" />
    
    <h2>Final Thoughts</h2>
    <p>By staying proactive about car care and understanding your roadside assistance options, you can travel with peace of mind. Remember, our 24/7 emergency dispatch team is always just a phone call away.</p>
  `;

  const relatedArticles = BLOG_POSTS.filter(p => p.id !== article.id && p.category === article.category).slice(0, 3);
  if (relatedArticles.length === 0) {
    relatedArticles.push(...BLOG_POSTS.filter(p => p.id !== article.id).slice(0, 3));
  }

  return (
    <main className="pt-24 lg:pt-[104px] min-h-screen bg-white">
      <SEO title={`${article.title} | Santa Towing Blog`} description={article.excerpt} canonical={`/blog/${article.id}`} />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          image: [article.image],
          datePublished: publishedIso,
          author: [{
            "@type": "Person",
            name: article.author
          }]
        })}
      </script>
      
      {/* 1. Breadcrumb Navigation */}
      <div className="bg-white border-b border-dark/20 py-4 sticky top-[72px] lg:top-[104px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm text-dark/70 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <Link to="/blog" className="hover:text-accent transition-colors">Blog</Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <Link to="/blog" className="hover:text-accent transition-colors">{article.category}</Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <span className="text-dark font-medium truncate">{article.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 relative">
          
          {/* Main Article Content */}
          <div className="w-full lg:w-2/3">
            
            {/* 2. Article Header */}
            <div className="mb-8">
              <span className="inline-block bg-accent/10 text-accent font-bold px-3 py-1 text-sm mb-4">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-dark/70 py-4 border-y border-dark/10">
                <div className="flex items-center gap-3">
                  <img src={article.authorImg} alt={article.author} className="w-10 h-10 rounded-[1px] border border-dark/10" />
                  <span className="font-bold text-dark">{article.author}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {article.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime}</span>
                </div>
              </div>
            </div>

            {/* 3. Featured Image */}
            <div className="rounded-[1px] overflow-hidden mb-12 shadow-md">
              <img src={article.image} alt={article.title} className="w-full h-auto max-h-[500px] object-cover" />
            </div>

            {/* 4. Article Body (Typography) */}
            <article 
              className="prose prose-lg prose-slate max-w-none mb-12 prose-headings:font-bold prose-headings:text-dark prose-a:text-accent hover:prose-a:text-red-700 prose-img:prose-img:shadow-sm prose-img:w-full prose-blockquote:border-l-accent prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:-r-xl prose-blockquote:font-medium prose-blockquote:text-dark/80 prose-blockquote:not-italic"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* 5. Tags & Share */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-6 border-y border-dark/10 mb-12">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-bold text-dark mr-2">Tags:</span>
                {article.tags.map((tag, idx) => (
                  <Link key={idx} to="/blog" className="bg-slate-100 hover:bg-slate-200 text-dark/70 hover:text-dark text-xs font-bold px-3 py-1.5 transition-colors rounded-full">
                    {tag}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-dark">Share:</span>
                <button className="w-9 h-9 bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-dark/60 rounded-full"><Facebook className="w-4 h-4" /></button>
                <button className="w-9 h-9 bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-dark/60 rounded-full"><Twitter className="w-4 h-4" /></button>
                <button className="w-9 h-9 bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-dark/60 rounded-full"><Linkedin className="w-4 h-4" /></button>
                <button className="w-9 h-9 bg-slate-100 flex items-center justify-center hover:bg-dark hover:text-white transition-colors text-dark/60 rounded-full"><Link2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            
            {/* Previous / Next Article Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 mb-12">
              {(() => {
                const currentIndex = BLOG_POSTS.findIndex(p => p.id === article.id);
                const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
                const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;
                
                return (
                  <>
                    <div className="w-full sm:w-1/2 flex justify-start">
                      {prevPost && (
                        <Link to={`/blog/${prevPost.id}`} className="group flex items-center gap-3 hover:bg-slate-50 p-3 rounded-[1px] transition-colors max-w-full">
                          <div className="w-10 h-10 shrink-0 bg-slate-100 flex items-center justify-center rounded-xl group-hover:bg-accent group-hover:text-white transition-colors">
                            <ChevronRight className="w-5 h-5 rotate-180" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-xs text-dark/50 font-bold uppercase tracking-wider mb-0.5">Previous Article</div>
                            <div className="text-sm font-bold text-dark group-hover:text-accent truncate">{prevPost.title}</div>
                          </div>
                        </Link>
                      )}
                    </div>
                    <div className="w-full sm:w-1/2 flex justify-end">
                      {nextPost && (
                        <Link to={`/blog/${nextPost.id}`} className="group flex items-center gap-3 hover:bg-slate-50 p-3 rounded-[1px] transition-colors max-w-full text-right">
                          <div className="overflow-hidden">
                            <div className="text-xs text-dark/50 font-bold uppercase tracking-wider mb-0.5">Next Article</div>
                            <div className="text-sm font-bold text-dark group-hover:text-accent truncate">{nextPost.title}</div>
                          </div>
                          <div className="w-10 h-10 shrink-0 bg-slate-100 flex items-center justify-center rounded-xl group-hover:bg-accent group-hover:text-white transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </Link>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* 6. Contact / Service CTA Box */}
            <div className="bg-primary text-white rounded-[1px] p-6 sm:p-8 shadow-xl relative overflow-hidden mb-12">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white opacity-5 rounded-[1px] blur-2xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-accent" /> Need Towing Assistance?
                  </h3>
                  <p className="text-white/80 max-w-md">Our expert mechanics and towing fleet are available 24/7 across Greater Accra. Don't stay stranded.</p>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                  <a href={phoneTel || `tel:${phoneRaw}`} className="bg-accent hover:bg-accent/90 text-white font-bold px-6 py-3 text-center transition-all shadow-md rounded-full">
                    Call {phoneRaw}
                  </a>
                  <Link to="/towing" className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 text-center transition-all rounded-full">
                    View Towing Services
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* 7. Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="sticky top-[160px] space-y-8">
              
              {/* Author Bio */}
              <div className="bg-slate-50 rounded-[1px] p-6 border border-dark/5 shadow-sm text-center">
                <img src={article.authorImg} alt={article.author} className="w-20 h-20 rounded-[1px] mx-auto mb-4 border-2 border-white shadow-sm" />
                <h3 className="font-bold text-dark text-lg mb-1">{article.author}</h3>
                <p className="text-accent text-sm font-bold mb-4 uppercase tracking-wider">Automotive Expert</p>
                <p className="text-sm text-dark/70 mb-4">Sharing industry insights and actionable advice to keep drivers safe and their cars running perfectly.</p>
                <Link to="/contact" className="text-primary hover:text-accent text-sm font-bold inline-flex items-center gap-1 transition-colors">
                  Contact Author <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Related Posts Widget */}
              <div className="bg-white rounded-[1px] border border-dark/10 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-dark/5 bg-slate-50">
                  <h3 className="font-bold text-dark flex items-center gap-2 text-lg">
                    Related Articles
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  {relatedArticles.map((post, idx) => (
                    <Link key={idx} to={`/blog/${post.id}`} className="group flex gap-4">
                      <div className="w-20 h-20 shrink-0 rounded-[1px] overflow-hidden bg-slate-100">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-accent mb-1">{post.category}</span>
                        <h4 className="font-bold text-dark text-sm group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Service Areas Link */}
              <div className="bg-white rounded-[1px] border border-dark/10 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-dark/5 bg-slate-50">
                  <h3 className="font-bold text-dark text-lg">Our Service Areas</h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-dark/70 mb-4">We provide 24/7 towing and recovery across Greater Accra.</p>
                  <Link to="/service-areas" className="text-accent hover:text-primary font-bold text-sm inline-flex items-center gap-1 transition-colors">
                    View All Locations <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
      
    </main>
  );
}
