"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import { Badge } from "@/components/ui/badge";
import { BlueTitle, GrayTitle } from "@/components/reusables";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { PLACEHOLDERS, SUGGESTIONS } from "@/lib/data";
import { ArrowRight } from "lucide-react";




export default function Home() {
 const { isSignedIn, has } = useAuth();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
if (isFocused || prompt) return;
const t = setInterval(() => {
setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
}, 3000);
return () => clearInterval(t);
  } , [isFocused, prompt]);


  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [prompt]);


  const handleSubmit = () => {
    if (!prompt.trim() || !isSignedIn) {
      return;
    }
    router.push(`/workspace?prompt=${encodeURIComponent(prompt.trim())}`);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

    const handleSuggestion = (s: string) => {
    setPrompt(s);
    textareaRef.current?.focus();
  };


  return (
     <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">
        <section className="relative flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center">

         <HoleBackground
          strokeColor="rgba(255,255,255,0.05)" // blur
          className="absolute inset-0 h-full w-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
          }}
        />

<Badge variant={"outline"} className="gap-2 p-4 backdrop-blur-sm">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Powered by Agentic AI
        </Badge>

         <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-6xl lg:text-7xl z-10">
          <GrayTitle>
            Forge your Dream 
          </GrayTitle>
          <br />
          <BlueTitle>
            from a single prompt
          </BlueTitle>
         </h1>

          <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-white/40 z-10">
          Describe what you want to build. AI writes the code, picks the
          packages, and renders a live preview all inside your browser.
        </p>

        {/* {prompt box} */}
      
        <div className="relative mx-auto mt-12 w-full max-w-2xl">
          <div
            className={cn(
              "rounded-2xl border bg-[#111111] duration-200",
              isFocused
                ? "border-white/20 ring-1 ring-white/8"
                : "border-white/8"
            )}
          >

 <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={PLACEHOLDERS[placeholderIndex]}
              rows={1}
              className="w-full resize-none bg-transparent px-5 pb-4 pt-5 text-sm placeholder:text-white/20 focus:outline-none sm:text-base"
              style={{ minHeight: 56, maxHeight: 200 }}
            />

 <div className="flex items-center justify-between border-t border-white/6 px-4 py-2.5">
              <span className="text-xs text-white/20">
                Press ⏎ to generate · Shift+⏎ for new line
              </span>

          {isSignedIn ? (
            <Button>
              Generate
            </Button>
          ) : (
            <SignInButton mode="modal"> 
<Button className="h-8 rounded-full bg-white px-5 font-semibold">
                    Generate
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
            </SignInButton>
          ) }
</div>
          </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs text-white/40 hover:border-white/15 hover:bg-white/8 hover:text-white/70"
              >
                {s}
              </button>
            ))}
          </div>
            </div>

 <p className="mt-10 text-xs text-white/20">
          No credit card required · 10 free generations on sign up
        </p>

        </section>

{/* browser mockup section */}
        <section className="border-t border-white/6 bg-[#070707] px-4 py-8 sm:py-12">
          <div className="mx-auto w-full max-w-6xl rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_40px_120px_rgba(0,0,0,0.65)] sm:p-4">
            <div className="flex items-center gap-3 border-b border-white/8 px-3 pb-3 text-[11px] text-white/30 sm:px-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-center text-white/35">
                https://studio.ai-app-builder.dev/workspace/preview
              </div>
            </div>

            <div className="grid gap-3 p-3 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[1.5rem] border border-white/8 bg-[#0e0e0e] p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/30">
                      Workspace UI
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-white/90 sm:text-2xl">
                      Chat with the builder
                    </h2>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] text-emerald-300">
                    Live sync
                  </div>
                </div>

                <div className="space-y-3 rounded-[1.25rem] border border-white/8 bg-[#090909] p-4">
                  <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-white/10 px-4 py-3 text-sm leading-relaxed text-white/80">
                    Build a kanban dashboard with a dark theme, rounded cards,
                    and a compact sidebar.
                  </div>
                  <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-white/8 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/70">
                    I will scaffold the workspace, wire the layout, and render a
                    polished preview panel with matching spacing.
                  </div>
                  <div className="max-w-[86%] rounded-2xl rounded-bl-md border border-white/8 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/70">
                    <div className="flex items-center gap-1.5 text-white/55">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-white/50" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-white/35 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-white/20 [animation-delay:300ms]" />
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/8 bg-[#121212] px-4 py-3 text-sm text-white/30">
                    Type a follow-up prompt...
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/8 bg-[#0e0e0e] p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="inline-flex rounded-full border border-white/8 bg-white/5 p-1 text-[11px] text-white/45">
                    <span className="rounded-full bg-white px-3 py-1 text-[#090909]">
                      Preview
                    </span>
                    <span className="px-3 py-1">Code</span>
                  </div>
                  <div className="text-[11px] text-white/30">
                    React + Tailwind preview
                  </div>
                </div>

                <div className="rounded-[1.25rem] border border-white/8 bg-[#090909] p-4">
                  <div className="mb-4 flex items-center justify-between text-xs text-white/35">
                    <span>Project roadmap</span>
                    <span>Auto-generated board</span>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium text-white/80">Todo</h3>
                        <span className="text-[11px] text-white/25">3</span>
                      </div>
                      <div className="space-y-2.5">
                        <div className="h-16 rounded-xl border border-white/8 bg-linear-to-b from-white/7 to-white/3" />
                        <div className="h-16 rounded-xl border border-white/8 bg-linear-to-b from-white/7 to-white/3" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium text-white/80">
                          In Progress
                        </h3>
                        <span className="text-[11px] text-white/25">2</span>
                      </div>
                      <div className="space-y-2.5">
                        <div className="h-14 rounded-xl border border-white/8 bg-linear-to-b from-white/8 to-white/3" />
                        <div className="h-18 rounded-xl border border-white/8 bg-linear-to-b from-white/8 to-white/3" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium text-white/80">Done</h3>
                        <span className="text-[11px] text-white/25">4</span>
                      </div>
                      <div className="space-y-2.5">
                        <div className="h-12 rounded-xl border border-white/8 bg-linear-to-b from-white/10 to-white/3" />
                        <div className="h-14 rounded-xl border border-white/8 bg-linear-to-b from-white/10 to-white/3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
     </main>
  );
}
