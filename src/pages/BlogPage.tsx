import { Link } from "react-router-dom";
import { blogPosts } from "@/data/seoData";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import { Shield, ArrowRight, Clock } from "lucide-react";

const BlogPage = () => (
  <div className="min-h-screen bg-background">
    <SeoHead
      title="Blogi – Sähköauton akku ja huolto | AkkuTurva"
      description="Lue asiantuntija-artikkeleita sähköauton akusta, huollosta, kustannuksista ja riskeistä."
      canonical="https://akkuturva.fi/blogi"
    />

    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-extrabold text-foreground">AkkuTurva</span>
        </Link>
        <Link to="/"><Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-primary/80 btn-glow font-bold">Laske hinta heti</Button></Link>
      </div>
    </nav>

    <div className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
          AkkuTurva <span className="text-primary">blogi</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Asiantuntija-artikkeleita sähköautojen akuista, huollosta ja suojaamisesta.
        </p>

        <div className="space-y-4">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blogi/${post.slug}`}
              className="block bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">{post.category}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{post.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.metaDescription}</p>
                  <p className="text-xs text-muted-foreground mt-3">{new Date(post.date).toLocaleDateString("fi-FI", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>

    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"><Shield className="w-4 h-4 text-primary-foreground" /></div>
          <span className="font-bold text-foreground">AkkuTurva</span>
        </Link>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} AkkuTurva</p>
      </div>
    </footer>
  </div>
);

export default BlogPage;
