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
import { ArrowLeft, Clock, Brain, Activity as ActivityIcon, MessageSquare, Settings, Trash2, X } from 'lucide-react';
import { cn } from './lib/utils';

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

  const handleGetActivity = () => {
    if (!mood) return;
    const suggestion = getRandomActivity(mood, mode, minutes);
    if (suggestion) {
      setActivity(suggestion);
      setStep('result');
    } else {
      // Fallback/Error state if no activity found (should differ to user)
      alert("No matching activities found for these filters. Try adjusting the time!");
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
          <MoodSelector onSelect={handleMoodSelect} />
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
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> What's on your mind? (Optional)
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
                className="w-full p-4 rounded-2xl border border-gray-200 focus:border-primary-accent focus:ring-1 focus:ring-primary-accent outline-none min-h-[100px] resize-none text-sm"
              />
              <div className="flex items-start gap-2 px-1">
                <p className="text-xs text-gray-400 italic">
                  Practice naming your feelings. Whatever you write here disappears when you start. It is not saved anywhere.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4" /> How much time do you have?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 30, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMinutes(m)}
                    className={cn(
                      "py-2 px-3 rounded-xl text-sm font-medium transition-all",
                      minutes === m
                        ? "bg-primary-accent text-white shadow-sm ring-2 ring-primary-accent ring-offset-2"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Brain className="w-4 h-4" /> What kind of reset?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMode('mind')}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition-all flex items-center gap-3",
                    mode === 'mind'
                      ? "border-primary-accent bg-blue-50/50 ring-1 ring-primary-accent"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  )}
                >
                  <div className={cn("p-2 rounded-full", mode === 'mind' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500")}>
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Mind</div>
                    <div className="text-xs text-gray-500">Calm & clear</div>
                  </div>
                </button>

                <button
                  onClick={() => setMode('move')}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition-all flex items-center gap-3",
                    mode === 'move'
                      ? "border-primary-accent bg-green-50/50 ring-1 ring-primary-accent"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  )}
                >
                  <div className={cn("p-2 rounded-full", mode === 'move' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500")}>
                    <ActivityIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Move</div>
                    <div className="text-xs text-gray-500">Body & energy</div>
                  </div>
                </button>
              </div>
            </div>

            <Button size="lg" fullWidth onClick={handleGetActivity}>
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

            userNote={undefined} // Note is never shared/saved now
            selectedTime={minutes}
          />
        </div>
      )}

      {step === 'completion' && (
        <div className="flex flex-col items-center justify-center text-center gap-8 animate-slide-up py-10">
          <div className="space-y-2">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900">Well done!</h2>
            <p className="text-gray-600">You took a moment for yourself.</p>
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
