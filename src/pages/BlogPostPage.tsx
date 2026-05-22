import { useParams, Link, useNavigate } from "react-router-dom";
import { getBlogPost, blogPosts } from "@/data/seoData";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import { Shield, ArrowLeft, ArrowRight, Clock, BookOpen } from "lucide-react";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPost(slug) : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center bg-card rounded-2xl border border-border p-10 max-w-md">
          <BookOpen className="w-14 h-14 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-black text-foreground mb-2">Artikkelia ei löytynyt</h1>
          <Link to="/blogi"><Button className="rounded-full mt-4">Selaa artikkeleita</Button></Link>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Jatkoturva" },
    publisher: { "@type": "Organization", name: "Jatkoturva" },
  };

  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4">{block.slice(3)}</h2>;
      if (block.startsWith("### ")) return <h3 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">{block.slice(4)}</h3>;
      if (block.startsWith("|")) {
        const rows = block.split("\n").filter(r => !r.match(/^\|[-|]+\|$/));
        const headers = rows[0]?.split("|").filter(Boolean).map(h => h.trim());
        const data = rows.slice(1).map(r => r.split("|").filter(Boolean).map(c => c.trim()));
        return (
          <div key={i} className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead><tr>{headers?.map((h, j) => <th key={j} className="text-left p-3 border-b border-border font-semibold text-foreground bg-muted/50">{h}</th>)}</tr></thead>
              <tbody>{data.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci} className="p-3 border-b border-border/50 text-muted-foreground">{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        );
      }
      if (block.match(/^(\d+\.|-) /m)) {
        const items = block.split("\n").map(l => l.replace(/^(\d+\.\s|-\s)/, "").trim());
        return (
          <ul key={i} className="space-y-2 my-4">
            {items.filter(Boolean).map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
              </li>
            ))}
          </ul>
        );
      }
      return <p key={i} className="text-muted-foreground leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />;
    });
  };

  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead title={`${post.title} | Jatkoturva`} description={post.metaDescription} canonical={`https://akkuturva.fi/blogi/${slug}`} jsonLd={jsonLd} />

      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-extrabold text-foreground">Jatkoturva</span>
          </Link>
          <Link to="/"><Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-primary/80 btn-glow font-bold">Laske hinta heti</Button></Link>
        </div>
      </nav>

      <article className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/blogi" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Blogi
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">{post.category}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
            <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("fi-FI", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-8 leading-tight">{post.title}</h1>

          <div>{renderContent(post.content)}</div>

          <div className="mt-12 bg-primary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-black text-primary-foreground mb-3">Suojaa akkusi nyt</h3>
            <p className="text-primary-foreground/80 mb-6">Tarkista autosi kelpoisuus ja saat tarjouksen heti.</p>
            <Button size="lg" className="h-13 px-10 rounded-full bg-primary-foreground text-foreground font-bold hover:bg-primary-foreground/90" onClick={() => navigate("/")}>
              Aloita tästä <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </div>

          {otherPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-bold text-foreground mb-5">Lue myös</h3>
              <div className="space-y-2">
                {otherPosts.map(p => (
                  <Link key={p.slug} to={`/blogi/${p.slug}`} className="block bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors group">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{p.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{p.readTime} · {p.category}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"><Shield className="w-4 h-4 text-primary-foreground" /></div>
            <span className="font-bold text-foreground">Jatkoturva</span>
          </Link>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Jatkoturva</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostPage;
