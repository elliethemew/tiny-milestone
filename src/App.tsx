import { useState } from 'react';
import { Layout } from './components/Layout';
import { MoodSelector } from './components/MoodSelector';
import { ActivityCard } from './components/ActivityCard';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { useActivitySuggestion } from './hooks/useActivitySuggestion';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Mood, Activity } from './types';
import { triggerConfetti } from './lib/confetti';
import { ArrowLeft, Clock, Brain, Activity as ActivityIcon, MessageSquare, Settings, Trash2, X, Check } from 'lucide-react';
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
    triggerConfetti();
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
        <div className="flex flex-col gap-6 animate-fade-in">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">How are you feeling?</h2>
            <p className="text-gray-500">Let's find a tiny step forward.</p>
          </div>
          <MoodSelector onSelect={handleMoodSelect} selectedMood={mood} />
        </div>
      )}

      {step === 'options' && (
        <div className="flex flex-col gap-6 animate-slide-up">
          <button
            onClick={() => setStep('mood')}
            className="self-start text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-primary-DEFAULT flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary-accent" /> What's on your mind? (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={
                  mood === 'happy' ? "Share what's making you smile..." :
                    mood === 'calm' ? "What's keeping you centered?" :
                      mood === 'surprise' ? "You think you can surprise me?" :
                        "I'm feeling a bit stuck because..."
                }
                className="w-full p-6 rounded-3xl bg-white border-none shadow-sm focus:ring-2 focus:ring-primary-accent/20 outline-none min-h-[120px] resize-none text-base placeholder:text-muted/60 transition-all font-sans"
              />
              <div className="flex items-start gap-2 px-1">
                <p className="text-xs text-muted italic">
                  Practice naming your feelings. Whatever you write here disappears when you start. It is not saved anywhere.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-primary-DEFAULT flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-accent" /> How much time do you have?
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[5, 10, 30, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMinutes(m)}
                    className={cn(
                      "py-3 px-2 rounded-2xl text-sm font-semibold transition-all border",
                      minutes === m
                        ? "border-primary-accent bg-background text-primary-accent shadow-sm ring-1 ring-primary-accent/10"
                        : "border-border bg-white text-secondary hover:border-primary-accent/30 hover:bg-slate-50"
                    )}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-primary-DEFAULT flex items-center gap-2">
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
                    <div className={cn("font-bold transition-colors", mode === 'mind' ? "text-primary-DEFAULT" : "text-secondary group-hover:text-primary-DEFAULT")}>Mind</div>
                    <div className="text-xs text-secondary font-medium">Calm & clear</div>
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
                    <div className={cn("font-bold transition-colors", mode === 'move' ? "text-primary-DEFAULT" : "text-secondary group-hover:text-primary-DEFAULT")}>Move</div>
                    <div className="text-xs text-secondary font-medium">Body & energy</div>
                  </div>
                </button>
              </div>
            </div>

            <Button size="lg" fullWidth onClick={handleGetActivity} className="shadow-lg shadow-primary-accent/20 mt-4 text-lg">
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
          />
        </div>
      )}

      {step === 'completion' && (
        <div className="flex flex-col items-center justify-center text-center gap-8 animate-slide-up py-10">
          <div className="space-y-4 animate-fade-in group">
            <div className="text-6xl mb-4 transform transition-transform group-hover:scale-110 duration-300">🎉</div>
            <h2 className="text-3xl font-bold text-primary-DEFAULT tracking-tight">Well done!</h2>
            <p className="text-secondary text-lg">You took a moment for yourself.</p>
          </div>



          <div className="w-full space-y-3">
            <Button size="lg" fullWidth onClick={handleReset}>
              Start New Check-in
            </Button>
            <p className="text-xs text-gray-400">
              Great job showing up for yourself.
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
