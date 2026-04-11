import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Shield, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`;

const quickQuestions = [
  "Kannattaako tämä?",
  "Mitä tämä kattaa?",
  "Miksi tarvitsen tämän?",
];

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  // Auto-trigger after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasTriggered.current) {
        setShowBubble(true);
        hasTriggered.current = true;
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const streamChat = useCallback(async (allMessages: Message[]) => {
    setIsLoading(true);
    let assistantSoFar = "";

    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => ({}));
        upsert(errorData.error || "Pahoittelut, en pysty vastaamaan juuri nyt. Yritä hetken kuluttua uudelleen.");
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsert(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch {
      upsert("Yhteysvirhe. Yritä uudelleen.");
    }
    setIsLoading(false);
  }, []);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    await streamChat(newMessages);
  };

  return (
    <>
      {/* Notification bubble */}
      {showBubble && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-fade-up max-w-[260px]">
          <div className="glass-strong rounded-2xl rounded-br-sm p-4 shadow-premium-lg cursor-pointer" onClick={() => { setIsOpen(true); setShowBubble(false); }}>
            <p className="text-sm font-medium text-foreground">Hei! 👋 Voinko auttaa akkuturvan valinnassa?</p>
            <button onClick={(e) => { e.stopPropagation(); setShowBubble(false); }} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground text-xs">✕</button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => { setIsOpen(!isOpen); setShowBubble(false); }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-hero flex items-center justify-center shadow-premium-lg transition-all duration-300 hover:scale-110 ${isOpen ? "rotate-0" : "animate-pulse-glow"}`}
      >
        {isOpen ? <X className="w-6 h-6 text-primary-foreground" /> : <MessageCircle className="w-6 h-6 text-primary-foreground" />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] glass-strong rounded-3xl shadow-premium-lg flex flex-col overflow-hidden animate-scale-in" style={{ height: "min(500px, calc(100vh - 140px))" }}>
          {/* Header */}
          <div className="gradient-hero p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold text-primary-foreground text-sm">AkkuTurva Avustaja</p>
              <p className="text-xs text-primary-foreground/70">Vastaan kaikkiin kysymyksiisi</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <Shield className="w-10 h-10 text-primary/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-4">Kysy mitä vain akkuturvasta!</p>
                <div className="space-y-2">
                  {quickQuestions.map(q => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="w-full text-left px-4 py-2.5 rounded-xl border border-border text-sm text-foreground hover:bg-muted/50 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "gradient-hero text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border/50">
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Kirjoita kysymys..."
                disabled={isLoading}
                className="flex-1 h-11 px-4 rounded-xl border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center text-primary-foreground disabled:opacity-50 transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
