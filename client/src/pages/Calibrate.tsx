/**
 * CALIBRATE — The Physician's War Room: Wealth Genome Discovery
 * Design: Full-screen immersive dark experience with breathing animations,
 * progressive visual intensity, and emerald glow reveals.
 * Architecture: 7-step flow condensed from the 11-section Session One script.
 * API Integration: All responses persisted to backend in real-time.
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, ArrowLeft, Shield, Target, Zap, Heart, 
  Brain, Crown, Compass, Scale, Flame, Minimize2,
  TrendingUp, Building, Bitcoin, DollarSign, Activity
} from "lucide-react";
import { startCalibrationSession, submitResponse, completeCalibration } from "@/lib/calibration-api";

// ─── WEALTH GENOME TYPES ───────────────────────────────────────────────────────
interface WealthGenomeType {
  id: string;
  name: string;
  essence: string;
  strategyTilt: string;
  icon: typeof Shield;
  color: string;
  iul: string;
  stocks: string;
  realEstate: string;
  crypto: string;
  overall: string;
}

const WEALTH_GENOMES: WealthGenomeType[] = [
  {
    id: "quiet-strategist",
    name: "The Quiet Strategist",
    essence: "Power through patience and precise timing",
    strategyTilt: "Heavy emphasis on laddered, patient HELOC→IUL structures + long-term compounding",
    icon: Target,
    color: "from-emerald-400 to-teal-500",
    iul: "Moderate",
    stocks: "Moderate",
    realEstate: "Moderate",
    crypto: "Cautious",
    overall: "Moderate"
  },
  {
    id: "legacy-builder",
    name: "The Legacy Builder",
    essence: "Everything is measured by what lasts beyond them",
    strategyTilt: "Strong multi-generational mortgage killer focus + legacy planning",
    icon: Crown,
    color: "from-amber-400 to-orange-500",
    iul: "Aggressive",
    stocks: "Mod-Aggressive",
    realEstate: "Mod-Aggressive",
    crypto: "Moderate",
    overall: "Aggressive"
  },
  {
    id: "freedom-architect",
    name: "The Freedom Architect",
    essence: "Obsessed with options, flexibility, and escape velocity",
    strategyTilt: "Maximize liquidity + flexible access while still building protected wealth",
    icon: Compass,
    color: "from-sky-400 to-blue-500",
    iul: "Mod-Aggressive",
    stocks: "Mod-Aggressive",
    realEstate: "Mod-Aggressive",
    crypto: "Moderate",
    overall: "Mod-Aggressive"
  },
  {
    id: "steady-guardian",
    name: "The Steady Guardian",
    essence: "Protects what matters most with calm consistency",
    strategyTilt: "Conservative growth + strong downside protection layers",
    icon: Shield,
    color: "from-slate-400 to-zinc-500",
    iul: "Low-Moderate",
    stocks: "Cautious",
    realEstate: "Cautious",
    crypto: "Very Cautious",
    overall: "Cautious-Moderate"
  },
  {
    id: "bold-weaver",
    name: "The Bold Weaver",
    essence: "Comfortable blending aggressive growth with deep protection",
    strategyTilt: "Dynamic allocation between IUL ladder and growth assets",
    icon: Flame,
    color: "from-red-400 to-rose-500",
    iul: "Aggressive",
    stocks: "Aggressive",
    realEstate: "Mod-Aggressive",
    crypto: "Mod-Aggressive",
    overall: "Aggressive"
  },
  {
    id: "intuitive-alchemist",
    name: "The Intuitive Alchemist",
    essence: "Turns intuition and timing into financial advantage",
    strategyTilt: "More active rebalancing + opportunistic moves within a protected framework",
    icon: Zap,
    color: "from-violet-400 to-purple-500",
    iul: "Mod-Aggressive",
    stocks: "Mod-Aggressive",
    realEstate: "Moderate",
    crypto: "Moderate",
    overall: "Mod-Aggressive"
  },
  {
    id: "family-sovereign",
    name: "The Family Sovereign",
    essence: "Decisions filtered through family security and multi-generational impact",
    strategyTilt: "Heavy focus on legacy structures and family wealth transfer mechanics",
    icon: Heart,
    color: "from-pink-400 to-fuchsia-500",
    iul: "Moderate",
    stocks: "Moderate",
    realEstate: "Moderate",
    crypto: "Cautious",
    overall: "Moderate"
  },
  {
    id: "calculated-creator",
    name: "The Calculated Creator",
    essence: "Builds wealth through design, systems, and iteration",
    strategyTilt: "Systematic, rules-based approach to the repeating HELOC→IUL machine",
    icon: Brain,
    color: "from-cyan-400 to-teal-500",
    iul: "Moderate",
    stocks: "Moderate",
    realEstate: "Moderate",
    crypto: "Cautious",
    overall: "Moderate"
  },
  {
    id: "resilient-optimizer",
    name: "The Resilient Optimizer",
    essence: "Thrives by adapting quickly and learning from friction",
    strategyTilt: "Flexible strategies that can pivot as life changes",
    icon: Activity,
    color: "from-green-400 to-emerald-500",
    iul: "Low-Moderate",
    stocks: "Moderate",
    realEstate: "Moderate",
    crypto: "Low-Moderate",
    overall: "Low-Moderate"
  },
  {
    id: "sovereign-minimalist",
    name: "The Sovereign Minimalist",
    essence: "Values clarity, simplicity, and maximum control with minimum noise",
    strategyTilt: "Clean, low-noise structures with maximum personal control",
    icon: Minimize2,
    color: "from-neutral-400 to-stone-500",
    iul: "Very Low",
    stocks: "Cautious",
    realEstate: "Very Cautious",
    crypto: "Very Cautious",
    overall: "Very Low / Passive"
  }
];

// ─── CALIBRATION QUESTIONS ─────────────────────────────────────────────────────
interface Question {
  id: string;
  phase: "values" | "risk" | "goals" | "style";
  text: string;
  subtext?: string;
  options: { label: string; value: string; scores: Record<string, number> }[];
}

const QUESTIONS: Question[] = [
  // VALUES PHASE
  {
    id: "v1",
    phase: "values",
    text: "When you imagine your wealth 20 years from now, what feeling matters most?",
    subtext: "There's no wrong answer. We're listening for what moves you.",
    options: [
      { label: "Knowing my family is protected for generations", value: "legacy", scores: { "legacy-builder": 3, "family-sovereign": 3, "steady-guardian": 1 } },
      { label: "Complete freedom to choose how I spend my time", value: "freedom", scores: { "freedom-architect": 3, "sovereign-minimalist": 2, "resilient-optimizer": 1 } },
      { label: "Watching a system I built compound quietly", value: "system", scores: { "quiet-strategist": 3, "calculated-creator": 3, "bold-weaver": 1 } },
      { label: "The thrill of growth balanced with deep security", value: "growth", scores: { "bold-weaver": 3, "intuitive-alchemist": 2, "freedom-architect": 1 } }
    ]
  },
  {
    id: "v2",
    phase: "values",
    text: "A colleague asks why you chose medicine. What's closest to your truth?",
    subtext: "Your answer reveals how you relate to long-term commitment.",
    options: [
      { label: "I wanted to build something meaningful that outlasts me", value: "meaning", scores: { "legacy-builder": 3, "family-sovereign": 2, "calculated-creator": 1 } },
      { label: "I'm drawn to mastery — the craft itself is the reward", value: "mastery", scores: { "quiet-strategist": 3, "calculated-creator": 2, "intuitive-alchemist": 1 } },
      { label: "It gave me the platform to create the life I actually want", value: "platform", scores: { "freedom-architect": 3, "bold-weaver": 2, "resilient-optimizer": 1 } },
      { label: "I like solving complex problems with real stakes", value: "stakes", scores: { "bold-weaver": 2, "intuitive-alchemist": 3, "resilient-optimizer": 2 } }
    ]
  },
  {
    id: "v3",
    phase: "values",
    text: "It's Saturday morning. No obligations. What does your ideal day look like?",
    subtext: "How you rest tells us how you build.",
    options: [
      { label: "Quiet morning with family, no screens, nowhere to be", value: "peace", scores: { "steady-guardian": 3, "family-sovereign": 2, "sovereign-minimalist": 2 } },
      { label: "Reviewing my portfolio, planning the next move", value: "planning", scores: { "calculated-creator": 3, "quiet-strategist": 2, "bold-weaver": 1 } },
      { label: "Something spontaneous — travel, a new experience", value: "spontaneous", scores: { "freedom-architect": 2, "intuitive-alchemist": 3, "resilient-optimizer": 2 } },
      { label: "Working on a passion project that could become something", value: "building", scores: { "bold-weaver": 2, "legacy-builder": 2, "calculated-creator": 2 } }
    ]
  },
  // RISK PHASE
  {
    id: "r1",
    phase: "risk",
    text: "The market drops 30% in a month. Your first instinct?",
    subtext: "We're not judging. We're calibrating.",
    options: [
      { label: "Stay the course. I built for this.", value: "hold", scores: { "quiet-strategist": 3, "steady-guardian": 2, "calculated-creator": 2 } },
      { label: "Look for buying opportunities in the chaos", value: "buy", scores: { "bold-weaver": 3, "intuitive-alchemist": 3, "freedom-architect": 1 } },
      { label: "Check my protection layers are holding, then relax", value: "protect", scores: { "steady-guardian": 3, "family-sovereign": 2, "sovereign-minimalist": 2 } },
      { label: "Reassess and adapt my strategy to the new reality", value: "adapt", scores: { "resilient-optimizer": 3, "freedom-architect": 2, "intuitive-alchemist": 1 } }
    ]
  },
  {
    id: "r2",
    phase: "risk",
    text: "You're offered a real estate deal: high upside, moderate risk, 5-year lock. Your response?",
    subtext: "How you evaluate opportunity reveals your wealth architecture.",
    options: [
      { label: "I need to see the numbers, run the models, then decide", value: "analyze", scores: { "calculated-creator": 3, "quiet-strategist": 2, "sovereign-minimalist": 1 } },
      { label: "If the upside is real, I'm in — life rewards the bold", value: "bold", scores: { "bold-weaver": 3, "legacy-builder": 2, "intuitive-alchemist": 1 } },
      { label: "5-year lock makes me nervous. I need flexibility.", value: "flex", scores: { "freedom-architect": 3, "resilient-optimizer": 2, "sovereign-minimalist": 1 } },
      { label: "Only if it fits my family's long-term plan", value: "family", scores: { "family-sovereign": 3, "legacy-builder": 2, "steady-guardian": 1 } }
    ]
  },
  // GOALS PHASE
  {
    id: "g1",
    phase: "goals",
    text: "What would make you feel truly wealthy — not rich, but wealthy?",
    subtext: "Rich is a number. Wealthy is a state. What's yours?",
    options: [
      { label: "Never worrying about money again — for me or my kids", value: "security", scores: { "family-sovereign": 3, "steady-guardian": 3, "legacy-builder": 1 } },
      { label: "Having my money work harder than I do", value: "leverage", scores: { "calculated-creator": 3, "quiet-strategist": 2, "bold-weaver": 2 } },
      { label: "The ability to say yes to anything, anytime", value: "optionality", scores: { "freedom-architect": 3, "intuitive-alchemist": 2, "resilient-optimizer": 1 } },
      { label: "Building an empire that my grandchildren inherit", value: "empire", scores: { "legacy-builder": 3, "bold-weaver": 2, "family-sovereign": 2 } }
    ]
  },
  {
    id: "g2",
    phase: "goals",
    text: "In 10 years, which headline would make you proudest?",
    subtext: "Your future self is watching. What does she see?",
    options: [
      { label: "\"Local physician builds $20M tax-free legacy — quietly\"", value: "quiet-wealth", scores: { "quiet-strategist": 3, "sovereign-minimalist": 2, "calculated-creator": 2 } },
      { label: "\"Doctor's family trust now funds three generations\"", value: "generations", scores: { "legacy-builder": 3, "family-sovereign": 3 } },
      { label: "\"Physician retires at 48, portfolio runs itself\"", value: "early-retire", scores: { "freedom-architect": 3, "resilient-optimizer": 2, "bold-weaver": 1 } },
      { label: "\"Doctor-turned-investor outperforms hedge funds\"", value: "outperform", scores: { "bold-weaver": 3, "intuitive-alchemist": 3 } }
    ]
  },
  // STYLE PHASE
  {
    id: "s1",
    phase: "style",
    text: "How do you prefer to make big financial decisions?",
    subtext: "Your decision architecture shapes your wealth architecture.",
    options: [
      { label: "Slowly, methodically, with all the data", value: "methodical", scores: { "quiet-strategist": 3, "calculated-creator": 3, "sovereign-minimalist": 1 } },
      { label: "Trust my gut once I understand the fundamentals", value: "intuitive", scores: { "intuitive-alchemist": 3, "bold-weaver": 2, "freedom-architect": 1 } },
      { label: "Consult my spouse/family, then commit fully", value: "collaborative", scores: { "family-sovereign": 3, "steady-guardian": 2, "legacy-builder": 1 } },
      { label: "Fast when it feels right, pivot if it doesn't work", value: "adaptive", scores: { "resilient-optimizer": 3, "freedom-architect": 2, "bold-weaver": 1 } }
    ]
  },
  {
    id: "s2",
    phase: "style",
    text: "Which best describes your relationship with complexity?",
    subtext: "Some people thrive in complexity. Others cut through it.",
    options: [
      { label: "I love elegant systems with many moving parts", value: "complex", scores: { "calculated-creator": 3, "bold-weaver": 2, "intuitive-alchemist": 1 } },
      { label: "Give me the simplest path to the best outcome", value: "simple", scores: { "sovereign-minimalist": 3, "steady-guardian": 2, "quiet-strategist": 1 } },
      { label: "I want to understand it deeply, then let it run", value: "deep-auto", scores: { "quiet-strategist": 3, "legacy-builder": 2, "calculated-creator": 1 } },
      { label: "I adapt to whatever the situation demands", value: "fluid", scores: { "resilient-optimizer": 3, "freedom-architect": 2, "intuitive-alchemist": 1 } }
    ]
  },
  {
    id: "s3",
    phase: "style",
    text: "Final question. What's the one thing you'd never compromise on?",
    subtext: "This is your non-negotiable. It defines everything.",
    options: [
      { label: "My family's security — everything else is secondary", value: "family-first", scores: { "family-sovereign": 3, "steady-guardian": 3, "legacy-builder": 1 } },
      { label: "My freedom — I won't be locked into anything", value: "freedom-first", scores: { "freedom-architect": 3, "sovereign-minimalist": 2, "resilient-optimizer": 1 } },
      { label: "My legacy — I'm building something that outlives me", value: "legacy-first", scores: { "legacy-builder": 3, "bold-weaver": 2, "quiet-strategist": 1 } },
      { label: "My edge — I want the best strategy, period", value: "edge-first", scores: { "bold-weaver": 2, "intuitive-alchemist": 2, "calculated-creator": 3 } }
    ]
  }
];

// ─── SCORING ENGINE ────────────────────────────────────────────────────────────
function calculateGenome(answers: Record<string, string>): WealthGenomeType {
  const scores: Record<string, number> = {};
  WEALTH_GENOMES.forEach(g => { scores[g.id] = 0; });

  Object.entries(answers).forEach(([questionId, selectedValue]) => {
    const question = QUESTIONS.find(q => q.id === questionId);
    if (!question) return;
    const option = question.options.find(o => o.value === selectedValue);
    if (!option) return;
    Object.entries(option.scores).forEach(([genomeId, score]) => {
      scores[genomeId] = (scores[genomeId] || 0) + score;
    });
  });

  const topId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return WEALTH_GENOMES.find(g => g.id === topId) || WEALTH_GENOMES[0];
}

// ─── BREATHING ANIMATION COMPONENT ────────────────────────────────────────────
function BreathingOrb({ phase }: { phase: "inhale" | "hold" | "exhale" }) {
  const scale = phase === "inhale" ? 1.4 : phase === "hold" ? 1.4 : 1;
  const opacity = phase === "inhale" ? 0.8 : phase === "hold" ? 0.9 : 0.5;
  
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ scale, opacity }}
        transition={{ duration: phase === "hold" ? 0.3 : 4, ease: "easeInOut" }}
        className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 blur-xl absolute"
      />
      <motion.div
        animate={{ scale: scale * 0.8, opacity: opacity + 0.1 }}
        transition={{ duration: phase === "hold" ? 0.3 : 4, ease: "easeInOut" }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400/50 to-cyan-400/50 blur-md absolute"
      />
      <motion.div
        animate={{ scale: scale * 0.5 }}
        transition={{ duration: phase === "hold" ? 0.3 : 4, ease: "easeInOut" }}
        className="w-10 h-10 rounded-full bg-emerald-400/80 absolute"
      />
      <span className="relative z-10 text-xs font-mono text-emerald-200 uppercase tracking-widest mt-24">
        {phase === "inhale" ? "Breathe in..." : phase === "hold" ? "Hold..." : "Release..."}
      </span>
    </div>
  );
}

// ─── STEP COMPONENTS ───────────────────────────────────────────────────────────

// Step 0: Welcome
function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 border border-emerald-400/30 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-emerald-400/60 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Discover Your <span className="text-glow text-emerald-400">Wealth Genome</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-3 leading-relaxed">
          A Harvard-researched calibration process that studies <em>you</em> more than your money.
        </p>
        <p className="text-sm text-zinc-500 max-w-md mx-auto mb-10">
          10 questions. 3 minutes. You'll receive your personalized Wealth Genome Type — 
          the blueprint for how physicians like you build tax-free, multi-generational wealth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button 
            onClick={onNext}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-200 active:scale-[0.97]"
          >
            Begin Calibration <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-zinc-600 mt-6">
          Patent-pending process • No login required • Results are private
        </p>
      </motion.div>
    </motion.div>
  );
}

// Step 1: Breathing Calibration
function BreathingStep({ onNext }: { onNext: () => void }) {
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const sequence = () => {
      setBreathPhase("inhale");
      timerRef.current = setTimeout(() => {
        setBreathPhase("hold");
        timerRef.current = setTimeout(() => {
          setBreathPhase("exhale");
          timerRef.current = setTimeout(() => {
            setCycles(c => c + 1);
            sequence();
          }, 4000);
        }, 4000);
      }, 4000);
    };
    sequence();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-zinc-400 text-sm uppercase tracking-widest mb-8"
      >
        Calibrating your baseline
      </motion.p>
      
      <div className="h-48 flex items-center justify-center mb-8">
        <BreathingOrb phase={breathPhase} />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-zinc-500 text-sm max-w-sm mb-8"
      >
        Take a moment. Let your nervous system settle. 
        The best decisions come from a centered state.
      </motion.p>

      {cycles >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onClick={onNext}
            variant="outline"
            className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10 px-6 py-3"
          >
            I'm centered. Let's begin. <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}

// Step 2-5: Question Steps
function QuestionStep({ 
  questions, 
  phaseLabel, 
  phaseNumber,
  answers, 
  onAnswer, 
  onNext, 
  onBack 
}: { 
  questions: Question[];
  phaseLabel: string;
  phaseNumber: number;
  answers: Record<string, string>;
  onAnswer: (questionId: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const question = questions[currentQ];
  const allAnswered = questions.every(q => answers[q.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      {/* Progress indicator */}
      <div className="fixed top-6 left-6 right-6 flex items-center gap-2">
        <button onClick={onBack} className="text-zinc-500 hover:text-zinc-300 transition-colors p-2">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 flex gap-1">
          {[1,2,3,4].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i < phaseNumber ? 'bg-emerald-400' : i === phaseNumber ? 'bg-emerald-400/50' : 'bg-zinc-800'
            }`} />
          ))}
        </div>
        <span className="text-xs text-zinc-600 font-mono ml-2">{phaseNumber}/4</span>
      </div>

      <div className="max-w-2xl w-full">
        <motion.p
          key={phaseLabel}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-emerald-400/70 text-xs uppercase tracking-[0.2em] mb-4 font-mono"
        >
          {phaseLabel}
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
              {question.text}
            </h2>
            {question.subtext && (
              <p className="text-zinc-500 text-sm mb-8 italic">{question.subtext}</p>
            )}

            <div className="grid gap-3 mt-8">
              {question.options.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    onAnswer(question.id, option.value);
                    if (currentQ < questions.length - 1) {
                      setTimeout(() => setCurrentQ(currentQ + 1), 300);
                    }
                  }}
                  className={`w-full text-left p-5 rounded-lg border transition-all duration-200 ${
                    answers[question.id] === option.value
                      ? 'border-emerald-400/60 bg-emerald-400/10 text-white'
                      : 'border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/50'
                  }`}
                >
                  <span className="text-sm md:text-base">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentQ(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentQ ? 'bg-emerald-400 w-6' : answers[q.id] ? 'bg-emerald-400/40' : 'bg-zinc-700'
              }`}
            />
          ))}
        </div>

        {allAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-8"
          >
            <Button
              onClick={onNext}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3"
            >
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Step 6: Future-Self Activation (emotional peak)
function FutureSelfStep({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-lg"
      >
        <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-400/30 to-gold/30 border border-emerald-400/20 flex items-center justify-center">
          <Crown className="w-7 h-7 text-emerald-400" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Close your eyes for a moment.
        </h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-zinc-400 text-lg leading-relaxed mb-4"
        >
          Picture yourself five years from now. Your wealth is working — 
          quietly, powerfully, tax-free. You didn't need a costume. 
          You didn't need to be loud.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-zinc-500 text-base leading-relaxed mb-8"
        >
          Your power is steady. Rooted in who you actually are. 
          The system runs. The legacy builds. And you — you're free.
        </motion.p>

        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-emerald-400/80 text-sm mb-6 font-mono">
              Your Wealth Genome has been calculated.
            </p>
            <Button
              onClick={onNext}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-4 text-lg"
            >
              Reveal My Wealth Genome <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

// Step 7: Wealth Genome Reveal
function GenomeRevealStep({ genome, onNext }: { genome: WealthGenomeType; onNext: () => void }) {
  const [showDetails, setShowDetails] = useState(false);
  const Icon = genome.icon;

  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const aggressivenessToWidth = (level: string): number => {
    const map: Record<string, number> = {
      "Very Low": 10, "Very Cautious": 15, "Cautious": 25, "Low-Moderate": 35,
      "Cautious-Moderate": 30, "Moderate": 50, "Mod-Aggressive": 70, 
      "Moderately Aggressive": 70, "Aggressive": 85, "Very Low / Passive": 8
    };
    return map[level] || 50;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-16"
    >
      {/* The Reveal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${genome.color} flex items-center justify-center shadow-lg shadow-emerald-400/20`}
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-emerald-400/70 text-xs uppercase tracking-[0.3em] mb-2 font-mono"
        >
          Your Wealth Genome
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          {genome.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xl text-zinc-400 italic max-w-md mx-auto"
        >
          "{genome.essence}"
        </motion.p>
      </motion.div>

      {/* Strategy Profile */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl"
        >
          <div className="glow-card p-6 mb-6">
            <h3 className="text-sm text-emerald-400 uppercase tracking-widest mb-4 font-mono">
              Your Strategy Tilt
            </h3>
            <p className="text-zinc-300 leading-relaxed">{genome.strategyTilt}</p>
          </div>

          <div className="glow-card p-6 mb-6">
            <h3 className="text-sm text-emerald-400 uppercase tracking-widest mb-6 font-mono">
              Asset Class Profile
            </h3>
            <div className="space-y-4">
              {[
                { label: "IUL / Life Insurance", value: genome.iul, icon: DollarSign },
                { label: "Stocks & Bonds", value: genome.stocks, icon: TrendingUp },
                { label: "Real Estate", value: genome.realEstate, icon: Building },
                { label: "Crypto", value: genome.crypto, icon: Bitcoin },
              ].map((asset, i) => (
                <motion.div
                  key={asset.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-3"
                >
                  <asset.icon className="w-4 h-4 text-zinc-500 shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-zinc-500">{asset.label}</span>
                      <span className="text-xs text-emerald-400 font-mono">{asset.value}</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${aggressivenessToWidth(asset.value)}%` }}
                        transition={{ delay: 0.3 + 0.1 * i, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glow-card p-6 mb-8">
            <h3 className="text-sm text-emerald-400 uppercase tracking-widest mb-3 font-mono">
              Overall Aggressiveness
            </h3>
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-zinc-500" />
              <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${aggressivenessToWidth(genome.overall)}%` }}
                  transition={{ delay: 0.8, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-300 rounded-full"
                />
              </div>
              <span className="text-sm text-emerald-400 font-mono font-bold">{genome.overall}</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center"
          >
            <Button
              onClick={onNext}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-4 text-lg w-full sm:w-auto"
            >
              Speak With Your Advisor <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-xs text-zinc-600 mt-3">
              Your personalized strategy brief has been prepared
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Step 8: Advisor Handoff
function HandoffStep({ genome, sessionId, clientId }: { genome: WealthGenomeType; sessionId: number | null; clientId: number | null }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const Icon = genome.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Track conversion
    if (typeof window !== 'undefined' && (window as any).umami) {
      (window as any).umami.track('calibrate_complete', { 
        genome: genome.id,
        name,
        email,
        sessionId,
        clientId,
      });
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
            <Icon className="w-7 h-7 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">You're in.</h2>
          <p className="text-zinc-400 mb-6">
            A Russell Capital advisor specializing in <span className="text-emerald-400">{genome.name}</span> profiles 
            will reach out within 24 hours with your personalized strategy brief.
          </p>
          <div className="glow-card p-4 text-left">
            <p className="text-xs text-zinc-500 mb-1">Your Wealth Genome</p>
            <p className="text-emerald-400 font-semibold">{genome.name}</p>
            <p className="text-xs text-zinc-600 mt-1 italic">{genome.essence}</p>
          </div>
          <p className="text-xs text-zinc-600 mt-8">
            Check your inbox for your full Wealth Genome report.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      <div className="max-w-md w-full text-center">
        <div className={`w-14 h-14 mx-auto mb-6 rounded-full bg-gradient-to-br ${genome.color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Your Strategy Brief is Ready
        </h2>
        <p className="text-zinc-400 text-sm mb-8">
          As a <span className="text-emerald-400">{genome.name}</span>, you qualify for a personalized 
          tax-free wealth strategy session with one of our physician-specialized advisors.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1 block">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr. ..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:border-emerald-400/50 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@practice.com"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:border-emerald-400/50 focus:outline-none transition-colors"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-4 text-base mt-4"
          >
            Send My Strategy Brief
          </Button>
        </form>

        <p className="text-xs text-zinc-600 mt-6">
          No spam. No cold calls. Just your personalized Wealth Genome report 
          and an invitation to a strategy session.
        </p>
      </div>
    </motion.div>
  );
}

// ─── MAIN CALIBRATE PAGE ───────────────────────────────────────────────────────
export default function Calibrate() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [genome, setGenome] = useState<WealthGenomeType | null>(null);
  
  // API session state
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const responseCountRef = useRef<number>(0);

  // Initialize session when user clicks "Begin Calibration"
  const handleBegin = useCallback(async () => {
    setStep(1);
    startTimeRef.current = Date.now();
    // Fire-and-forget: create session in background
    const result = await startCalibrationSession({});
    if (result) {
      setSessionId(result.sessionId);
      setClientId(result.clientId);
    }
  }, []);

  // Handle answer selection with API persistence
  const handleAnswer = useCallback((questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Persist to backend (fire-and-forget)
    if (sessionId) {
      const question = QUESTIONS.find(q => q.id === questionId);
      responseCountRef.current += 1;
      submitResponse({
        sessionId,
        questionId,
        questionCategory: question?.phase || "values",
        responseValue: value,
        responseType: "choice",
        responseTimeMs: null,
        sequenceOrder: responseCountRef.current,
      });
    }
  }, [sessionId]);

  // Handle genome reveal with API completion
  const handleReveal = useCallback(async () => {
    const result = calculateGenome(answers);
    setGenome(result);
    setStep(7);
    
    // Track genome reveal
    if (typeof window !== 'undefined' && (window as any).umami) {
      (window as any).umami.track('genome_revealed', { genome: result.id });
    }

    // Persist completion to backend (fire-and-forget)
    if (sessionId && clientId) {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      // Convert genome id format: "quiet-strategist" → "quiet_strategist"
      const genomeType = result.id.replace(/-/g, "_");
      
      // Calculate phase scores from answers
      const phaseScores = { values: 0, risk: 0, goals: 0, decisionStyle: 0 };
      Object.entries(answers).forEach(([qId, val]) => {
        const q = QUESTIONS.find(qu => qu.id === qId);
        if (!q) return;
        const opt = q.options.find(o => o.value === val);
        if (!opt) return;
        const maxScore = Math.max(...Object.values(opt.scores));
        if (q.phase === "values") phaseScores.values += maxScore;
        else if (q.phase === "risk") phaseScores.risk += maxScore;
        else if (q.phase === "goals") phaseScores.goals += maxScore;
        else if (q.phase === "style") phaseScores.decisionStyle += maxScore;
      });

      completeCalibration({
        sessionId,
        clientId,
        genomeType,
        scores: phaseScores,
        durationSeconds,
      });
    }
  }, [answers, sessionId, clientId]);

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.015_260)] relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/[0.02] rounded-full blur-3xl" />
        {/* Progressive intensity based on step */}
        <motion.div
          animate={{ opacity: step * 0.01 }}
          className="absolute inset-0 bg-gradient-to-b from-emerald-400/[0.03] to-transparent"
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && <WelcomeStep key="welcome" onNext={handleBegin} />}
        {step === 1 && <BreathingStep key="breathing" onNext={() => setStep(2)} />}
        {step === 2 && (
          <QuestionStep
            key="values"
            questions={QUESTIONS.filter(q => q.phase === "values")}
            phaseLabel="Phase I — Values & Vision"
            phaseNumber={1}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <QuestionStep
            key="risk"
            questions={QUESTIONS.filter(q => q.phase === "risk")}
            phaseLabel="Phase II — Risk & Protection"
            phaseNumber={2}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <QuestionStep
            key="goals"
            questions={QUESTIONS.filter(q => q.phase === "goals")}
            phaseLabel="Phase III — Goals & Legacy"
            phaseNumber={3}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={() => setStep(5)}
            onBack={() => setStep(3)}
          />
        )}
        {step === 5 && (
          <QuestionStep
            key="style"
            questions={QUESTIONS.filter(q => q.phase === "style")}
            phaseLabel="Phase IV — Decision Architecture"
            phaseNumber={4}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={() => setStep(6)}
            onBack={() => setStep(4)}
          />
        )}
        {step === 6 && <FutureSelfStep key="future" onNext={handleReveal} />}
        {step === 7 && genome && <GenomeRevealStep key="reveal" genome={genome} onNext={() => setStep(8)} />}
        {step === 8 && genome && <HandoffStep key="handoff" genome={genome} sessionId={sessionId} clientId={clientId} />}
      </AnimatePresence>
    </div>
  );
}
