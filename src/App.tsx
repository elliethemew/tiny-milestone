import { useState } from 'react';
import { Layout } from './components/Layout';
import { MoodSelector } from './components/MoodSelector';
import { ActivityCard } from './components/ActivityCard';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { useActivitySuggestion } from './hooks/useActivitySuggestion';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Mood, Activity } from './types';
import { ArrowLeft, Clock, Brain, Activity as ActivityIcon, Settings, Trash2, X, Check } from 'lucide-react';
import { cn } from './lib/utils';
import { MODE_STYLES } from './lib/theme';

type Step = 'mood' | 'options' | 'result' | 'completion';

function App() {
  const [step, setStep] = useState<Step>('mood');
  const [mood, setMood] = useState<Mood | null>(null);
  const [minutes, setMinutes] = useState<number>(5);
  const [mode, setMode] = useState<'mind' | 'move'>('mind');
  const [note, setNote] = useState('');

  const [activity, setActivity] = useState<Activity | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // History storage (background only as per MVP)
  const [_history, setHistory] = useLocalStorage<any[]>('tiny-milestone-history', []);

  const { getRandomActivity, markCompleted } = useActivitySuggestion();

  const handleMoodSelect = (selectedMood: Mood) => {
    setMood(selectedMood);
    setStep('options');
  };

  const [rerollsLeft, setRerollsLeft] = useState(2);

  const handleGetActivity = () => {
    if (!mood) return;

    // Start new session: Reset rerolls
    setRerollsLeft(2);

    const suggestion = getRandomActivity(mood, mode, minutes); // No exclusion on first load

    if (suggestion) {
      setActivity(suggestion);
      setStep('result');
    } else {
      alert("No matching activities found for these filters. Try adjusting the time!");
    }
  };

  const handleReroll = () => {
    if (!mood || rerollsLeft <= 0) return;

    const suggestion = getRandomActivity(mood, mode, minutes, activity?.id);

    if (suggestion) {
      setActivity(suggestion);
      setRerollsLeft(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    // triggerConfetti(); // Removed for calm/premium vibe
    if (activity) {
      markCompleted(activity.id);

      // Save to history if configured (or minimal log)
      // MVP: Just save locally in background
      const logEntry = {
        id: crypto.randomUUID(),
        activityId: activity.id,
        timestamp: Date.now(),
        mood: mood,
        note: undefined, // Notes are ephemeral now
      };

      setHistory((prev: any[]) => [logEntry, ...prev].slice(0, 50));
    }
    setStep('completion');
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear your local history and preferences?")) {
      setHistory([]);
      localStorage.removeItem('tiny-milestone-completed');
      alert("Data cleared.");
      setShowSettings(false);
    }
  };

  const handleReset = () => {
    setStep('mood');
    setMood(null);
    setActivity(null);
    setNote('');
  };

  return (
    <Layout className="relative">
      <button
        onClick={() => setShowSettings(true)}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Settings className="w-5 h-5" />
      </button>

      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 animate-fade-in">
          <Card className="w-full max-w-sm p-6 relative">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold mb-4">Settings</h3>
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>Tiny Milestone v1.0</p>
                <p>Data is stored locally on your device.</p>
              </div>
              <Button
                variant="outline"
                fullWidth
                onClick={handleClearData}
                className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-100"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Clear All Data
              </Button>
            </div>
          </Card>
        </div>
      )}

      {step === 'mood' && (
        <div className="flex flex-col gap-8 animate-fade-in pt-4">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-serif font-semibold text-primary-DEFAULT tracking-tight">How are you feeling?</h2>
            <p className="text-base text-secondary font-normal tracking-wide">Let's find a tiny step forward.</p>
          </div>
          <MoodSelector onSelect={handleMoodSelect} selectedMood={mood} />
        </div>
      )}

      {step === 'options' && (
        <div className="flex flex-col gap-6 animate-slide-up">
          <button
            onClick={() => setStep('mood')}
            className="self-start text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 font-medium tracking-wide"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[15px] font-medium text-primary-DEFAULT flex items-center gap-2">
                What's on your mind? <span className="text-[13px] text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={
                    mood === 'happy' ? "Share what's making you smile..." :
                      mood === 'calm' ? "What's keeping you centered?" :
                        mood === 'surprise' ? "You think you can surprise me?" :
                          "I'm feeling a bit stuck because..."
                  }
                  className="w-full p-6 rounded-[24px] bg-white/95 border-none shadow-[inset_0_1px_4px_rgba(0,0,0,0.03)] focus:ring-2 focus:ring-primary-accent/10 outline-none min-h-[140px] resize-none text-base placeholder:text-slate-500 transition-all font-sans leading-relaxed"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1 pl-1">
                This note disappears when you start. Saved nowhere.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-[15px] font-medium text-primary-DEFAULT flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-accent" /> How much time do you have?
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[5, 10, 30, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMinutes(m)}
                    className={cn(
                      "py-3 px-2 rounded-2xl text-[15px] font-medium transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] relative group border will-change-transform active:scale-95",
                      minutes === m
                        ? "bg-teal-50 text-primary-DEFAULT border-primary-accent/5 ring-1 ring-primary-accent/30 shadow-none z-10" // Opaque bg-teal-50
                        : "bg-white text-secondary border-slate-900/5 shadow-none hover:-translate-y-0.5 hover:shadow-sm hover:border-slate-900/10"
                    )}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[15px] font-medium text-primary-DEFAULT flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary-accent" /> What kind of reset?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMode('mind')}
                  className={cn(
                    "p-5 rounded-[24px] border text-left transition-all flex items-center gap-4 relative group",
                    // Micro-interactions
                    "hover:-translate-y-1 hover:shadow-md active:scale-[0.98]",
                    mode === 'mind' ? MODE_STYLES.mind.selected : MODE_STYLES.mind.base
                  )}
                >
                  {mode === 'mind' && (
                    <div className={cn("absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center text-white animate-fade-in shadow-sm", MODE_STYLES.mind.badgeColor)}>
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                  )}
                  <div className={cn(
                    "p-3 rounded-full transition-colors duration-300",
                    mode === 'mind' ? MODE_STYLES.mind.icon.selected : MODE_STYLES.mind.icon.base
                  )}>
                    <Brain className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div>
                    <div className={cn("font-medium text-base transition-colors", mode === 'mind' ? "text-primary-DEFAULT" : "text-secondary group-hover:text-primary-DEFAULT")}>Mind</div>
                    <div className="text-[13px] text-slate-500 font-normal mt-0.5">Calm & clear</div>
                  </div>
                </button>

                <button
                  onClick={() => setMode('move')}
                  className={cn(
                    "p-5 rounded-[24px] border text-left transition-all flex items-center gap-4 relative group",
                    // Micro-interactions
                    "hover:-translate-y-1 hover:shadow-md active:scale-[0.98]",
                    mode === 'move' ? MODE_STYLES.move.selected : MODE_STYLES.move.base
                  )}
                >
                  {mode === 'move' && (
                    <div className={cn("absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center text-white animate-fade-in shadow-sm", MODE_STYLES.move.badgeColor)}>
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                  )}
                  <div className={cn(
                    "p-3 rounded-full transition-colors duration-300",
                    mode === 'move' ? MODE_STYLES.move.icon.selected : MODE_STYLES.move.icon.base
                  )}>
                    <ActivityIcon className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div>
                    <div className={cn("font-medium text-base transition-colors", mode === 'move' ? "text-primary-DEFAULT" : "text-secondary group-hover:text-primary-DEFAULT")}>Move</div>
                    <div className="text-[13px] text-slate-500 font-normal mt-0.5">Body & energy</div>
                  </div>
                </button>
              </div>
            </div>

            <Button size="lg" fullWidth onClick={handleGetActivity} className="shadow-lg shadow-primary-accent/20 mt-4 mb-8 text-base font-semibold tracking-wide">
              Let's do it!
            </Button>
          </div>
        </div>
      )}

      {step === 'result' && activity && (
        <div className="animate-fade-in flex flex-col gap-4">
          <button
            onClick={() => setStep('options')}
            className="self-start text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to filters
          </button>
          <ActivityCard
            activity={activity}
            onComplete={handleComplete}
            onReroll={handleReroll}
            rerollsLeft={rerollsLeft}

            userNote={undefined} // Note is never shared/saved now
            selectedTime={minutes}
            selectedMood={mood}
          />
        </div>
      )}

      <div className="fixed z-50 pointer-events-none animate-fade-in" style={{
        bottom: `max(1.25rem, calc(var(--safe-area-inset-bottom) + 0.5rem))`,
        left: `max(1.25rem, calc(var(--safe-area-inset-left) + 0.5rem))`
      }}>
        <div className="px-3 py-1.5 rounded-full bg-white/70 border border-slate-50 shadow-[0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-[2px] text-slate-500/75 font-serif font-medium text-[13px]">
          Lo’s Workspace
        </div>
      </div>

      {step === 'completion' && (
        <div className="flex flex-col items-center justify-center text-center animate-slide-up py-10 relative isolate">
          {/* Radial Overlay for 'Clean Center' */}
          <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(255,255,255,0.92),rgba(255,255,255,0))] z-[-1] pointer-events-none" />

          <div className="space-y-6 animate-fade-in flex flex-col items-center max-w-xs mx-auto">
            {/* Premium Check Icon (Refined: Gradient fill + Soft Shadow) */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white to-teal-50/50 border border-teal-100 flex items-center justify-center shadow-[0_2px_8px_-1px_rgba(20,184,166,0.1)] mb-2">
              <Check className="w-7 h-7 text-teal-600" strokeWidth={2.5} absoluteStrokeWidth />
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-primary-DEFAULT tracking-wide">Well done!</h2>
              <p className="text-secondary/80 text-base leading-relaxed font-normal">You took a moment for yourself.</p>
            </div>
          </div>

          <div className="w-full space-y-4 max-w-[280px] mt-14"> {/* Increased top margin (+8px) */}
            <Button size="lg" fullWidth onClick={handleReset} className="shadow-lg shadow-teal-900/5 hover:shadow-teal-900/10">
              Check in again
            </Button>
            {/* Increased contrast for readability */}
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              One tiny step matters.
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
