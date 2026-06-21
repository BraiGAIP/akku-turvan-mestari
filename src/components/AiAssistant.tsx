import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Sparkles, ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  buttons?: QuickAction[];
}

interface QuickAction {
  label: string;
  message: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`;

const INITIAL_FLOWS: QuickAction[] = [
  { label: "💰 Haluan tietää hinnan autolleni", message: "Haluan tietää hinnan autolleni" },
  { label: "🤔 Mikä turva sopii minulle?", message: "Mikä Jatkoturva-tuote sopii autolleni?" },
  { label: "🛡️ Haluan suojan heti", message: "Haluan suojan heti" },
];

const FLOW_RESPONSES: Record<string, { content: string; buttons?: QuickAction[] }> = {
  "Haluan tietää hinnan autolleni": {
    content: "Hyvä valinta 👍\n\nSyötä auton tiedot, niin näytän hinnan heti. Koko prosessi vie alle 2 minuuttia.",
    buttons: [{ label: "Näe hinta autollesi →", message: "__START_FLOW__" }],
  },
  "Mikä Jatkoturva-tuote sopii autolleni?": {
    content: "Jatkoturvalta saat neljä tuotelinjaa:\n\n🛡️ Perusturva — edullinen perusturva vanhempaan autoon\n👑 Premium — kattava bensiini-, diesel- ja hybridiautoille (suosituin)\n⚡ Sähköturva — täyssähköautolle, sisältää korkeajänniteakun\n🔋 Akkuturva — lataushybridille, Premium + akkuturva\n\nKerro autosi käyttövoima ja ikä, niin suosittelen oikean.",
    buttons: [{ label: "Laske hinta autollesi →", message: "__START_FLOW__" }],
  },
  "Haluan suojan heti": {
    content: "Hienoa 👍\n\nAloitetaan – tarvitsen vain autosi tiedot. Koko prosessi vie alle 2 minuuttia.",
    buttons: [{ label: "Syötä auton tiedot →", message: "__START_FLOW__" }],
  },
};

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInitialButtons, setShowInitialButtons] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-open: 2s timer OR 20% scroll
  useEffect(() => {
    const trigger = () => {
      if (hasTriggered.current) return;
      hasTriggered.current = true;
      setShowBubble(true);
    };

    const timer = setTimeout(trigger, 2000);

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.2) trigger();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      const apiMessages = allMessages.map(({ role, content }) => ({ role, content }));
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => ({}));
        upsert(errorData.error || "Pahoittelut, en pysty vastaamaan juuri nyt.");
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

  const handleFlowAction = (message: string) => {
    if (message === "__START_FLOW__") {
      // Trigger the qualification flow on the page
      const event = new CustomEvent("startQualificationFlow");
      window.dispatchEvent(event);
      setIsOpen(false);
      return;
    }

    const flowResponse = FLOW_RESPONSES[message];
    if (flowResponse) {
      setShowInitialButtons(false);
      const userMsg: Message = { role: "user", content: message };
      const assistantMsg: Message = {
        role: "assistant",
        content: flowResponse.content,
        buttons: flowResponse.buttons,
      };
      setMessages(prev => [...prev, userMsg, assistantMsg]);
      return;
    }

    send(message);
  };

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setShowInitialButtons(false);
    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    await streamChat(newMessages);
  };

  const openChat = () => {
    setIsOpen(true);
    setShowBubble(false);
  };

  return (
    <>
      {/* Bubble prompt */}
      {showBubble && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-fade-up max-w-[280px]">
          <div
            className="bg-card rounded-2xl rounded-br-sm border border-border p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            onClick={openChat}
          >
            <p className="text-sm font-semibold text-foreground mb-1">Hei 👋</p>
            <p className="text-sm text-muted-foreground">
              Autan sinua löytämään oikean Fragus-lisäturvan autollesi. Mikä tilanne sinulla on?
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => { setIsOpen(!isOpen); setShowBubble(false); }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/25 transition-transform duration-200 hover:scale-105"
      >
        {isOpen
          ? <X className="w-6 h-6 text-primary-foreground" />
          : <MessageCircle className="w-6 h-6 text-primary-foreground" />
        }
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-card rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-scale-in"
          style={{ height: "min(540px, calc(100vh - 140px))" }}
        >
          {/* Header */}
          <div className="bg-primary p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold text-primary-foreground text-sm">Jatkoturva Opas</p>
              <p className="text-xs text-primary-foreground/70">Autan löytämään oikean turvan</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Welcome + initial flow buttons */}
            {messages.length === 0 && showInitialButtons && (
              <div className="space-y-3">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-foreground leading-relaxed">
                  <p className="font-semibold mb-1">Hei 👋</p>
                  <p>Autan sinua löytämään oikean Fragus-lisäturvan autollesi. Mikä tilanne sinulla on?</p>
                </div>
                <div className="space-y-2">
                  {INITIAL_FLOWS.map(({ label, message }) => (
                    <button
                      key={message}
                      onClick={() => handleFlowAction(message)}
                      className="w-full text-left px-4 py-3 rounded-xl border border-primary/20 bg-primary/5 text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/40 transition-all flex items-center justify-between group"
                    >
                      <span>{label}</span>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message list */}
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
                {/* Action buttons after assistant message */}
                {msg.role === "assistant" && msg.buttons && (
                  <div className="mt-2 space-y-1.5">
                    {msg.buttons.map((btn) => (
                      <button
                        key={btn.label}
                        onClick={() => handleFlowAction(btn.message)}
                        className="w-full text-left px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-between"
                      >
                        <span>{btn.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
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
          <div className="p-3 border-t border-border">
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Kirjoita viesti..."
                disabled={isLoading}
                className="flex-1 h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-50 transition-colors hover:bg-primary/90"
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
