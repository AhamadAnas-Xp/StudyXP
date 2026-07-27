import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Activity,
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  Brain,
  Check,
  ChevronRight,
  Circle,
  Clock3,
  Flame,
  Headphones,
  Home,
  Leaf,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Send,
  Sparkles,
  Target,
  TimerReset,
  Trophy,
  UserRound,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';
import sprigReference from '@assets/Screenshot_2026-07-15_210525_1785173898823.png';

const queryClient = new QueryClient();

type View = 'home' | 'focus' | 'tasks' | 'review' | 'profile';
type Task = { id: number; title: string; subject: string; mins: number; xp: number; done: boolean; color: string };

const initialTasks: Task[] = [
  { id: 1, title: 'Read chapter 4 notes', subject: 'Biology', mins: 25, xp: 35, done: true, color: 'mint' },
  { id: 2, title: 'Practice derivatives', subject: 'Mathematics', mins: 35, xp: 45, done: false, color: 'gold' },
  { id: 3, title: 'Outline history essay', subject: 'World History', mins: 20, xp: 30, done: false, color: 'blue' },
  { id: 4, title: 'Review vocabulary set', subject: 'French', mins: 15, xp: 20, done: false, color: 'lavender' },
];

const navItems: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Today', icon: Home },
  { id: 'focus', label: 'Focus room', icon: Target },
  { id: 'tasks', label: 'Tasks', icon: Check },
  { id: 'review', label: 'Weekly review', icon: Activity },
  { id: 'profile', label: 'My growth', icon: UserRound },
];

function Sprig({ size = 'md', mood = 'happy' }: { size?: 'sm' | 'md' | 'lg'; mood?: 'happy' | 'focus' | 'celebrate' }) {
  const sizes = { sm: 'h-12 w-12', md: 'h-20 w-20', lg: 'h-28 w-28' };
  return (
    <div className={`sprig ${sizes[size]} sprig-${mood}`} aria-label="Sprig, your study companion" data-testid="img-sprig">
      <img className="sprig-art" src={sprigReference} alt="Sprig, a friendly green growth companion with a golden star" />
    </div>
  );
}

function IconButton({ label, children, onClick }: { label: string; children: ReactNode; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} data-testid={`button-${label.toLowerCase().replaceAll(' ', '-')}`} className="icon-btn">
      {children}
    </button>
  );
}

function Shell({ view, onView, children, onCoach }: { view: View; onView: (view: View) => void; children: ReactNode; onCoach: () => void }) {
  return (
    <div className="min-h-[100dvh] bg-[#071321] text-[#edf7f0]">
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-30 w-[238px] flex-col border-r border-[#193041] bg-[#081522]/95 px-5 py-6">
        <div className="flex items-center gap-3 px-2">
          <div className="brand-mark"><Leaf size={19} strokeWidth={2.4} /></div>
          <div><div className="font-display text-lg font-bold tracking-[-0.04em]">Study<span className="text-[#62e69b]">XP</span></div><div className="micro-label">grow daily</div></div>
        </div>
        <div className="mt-10 mb-3 px-2 micro-label">Your space</div>
        <nav className="space-y-1.5">
          {navItems.map(({ id, label, icon: NavIcon }) => (
            <button key={id} type="button" onClick={() => onView(id)} data-testid={`button-nav-${id}`} className={`side-nav ${view === id ? 'side-nav-active' : ''}`}>
              <NavIcon size={17} strokeWidth={2} /><span>{label}</span>{id === 'tasks' && <span className="side-count">3</span>}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-[#214b3d] bg-[#102e2a] p-4">
          <div className="mb-3 flex items-start justify-between"><Sprig size="sm" mood="happy" /><span className="rounded-full bg-[#b7f171]/10 px-2 py-1 text-[10px] font-bold text-[#b7f171]">LVL 07</span></div>
          <p className="font-display text-sm font-semibold">Your roots are strong.</p>
          <p className="mt-1 text-xs leading-relaxed text-[#96b6a8]">Keep showing up. Tiny steps become a life you’re proud of.</p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#214b3d]"><div className="h-full w-[68%] rounded-full bg-[#62e69b]" /></div>
          <p className="mt-2 text-[10px] text-[#96b6a8]">680 / 1,000 XP to level 8</p>
        </div>
        <button type="button" onClick={onCoach} data-testid="button-open-coach-sidebar" className="mt-4 flex items-center gap-2 px-2 text-xs font-semibold text-[#a9c8bb] transition hover:text-[#62e69b]"><MessageCircle size={15} /> Ask Sprig anything <ArrowRight size={13} className="ml-auto" /></button>
      </aside>

      <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#193041] bg-[#071321]/90 px-5 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2.5"><div className="brand-mark"><Leaf size={17} /></div><span className="font-display font-bold tracking-[-0.04em]">Study<span className="text-[#62e69b]">XP</span></span></div>
        <div className="flex items-center gap-2"><IconButton label="notifications"><Bell size={17} /></IconButton><button type="button" onClick={() => onView('profile')} data-testid="button-mobile-profile" className="avatar">AL</button><IconButton label="menu"><Menu size={17} /></IconButton></div>
      </header>
      <main className="mx-auto max-w-[1360px] px-5 pb-28 pt-7 sm:px-8 lg:ml-[238px] lg:px-12 lg:pb-16 lg:pt-12">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-[74px] items-center justify-around border-t border-[#193041] bg-[#081522]/95 px-2 backdrop-blur-xl lg:hidden">
        {navItems.slice(0, 4).map(({ id, label, icon: NavIcon }) => <button type="button" key={id} onClick={() => onView(id)} data-testid={`button-mobile-nav-${id}`} className={`mobile-nav ${view === id ? 'mobile-nav-active' : ''}`}><NavIcon size={18} /><span>{label === 'Weekly review' ? 'Review' : label.split(' ')[0]}</span></button>)}
        <button type="button" onClick={() => onView('profile')} data-testid="button-mobile-nav-profile" className={`mobile-nav ${view === 'profile' ? 'mobile-nav-active' : ''}`}><UserRound size={18} /><span>Growth</span></button>
      </nav>
    </div>
  );
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="eyebrow">{eyebrow}</div><h1 className="mt-2 font-display text-3xl font-bold tracking-[-0.055em] text-[#f1faF3] sm:text-4xl">{title}</h1>{description && <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#86a79a]">{description}</p>}</div>{action}</div>;
}

function StatPill({ icon, value, label, color = 'green' }: { icon: React.ReactNode; value: string; label: string; color?: string }) {
  return <div className={`stat-pill stat-${color}`}><div className="stat-icon">{icon}</div><div><div className="font-display text-sm font-bold">{value}</div><div className="text-[10px] text-[#86a79a]">{label}</div></div></div>;
}

function CoachCard({ onOpen, compact = false }: { onOpen: () => void; compact?: boolean }) {
  return <button type="button" onClick={onOpen} data-testid="button-open-coach" className={`coach-card group text-left ${compact ? 'coach-card-compact' : ''}`}><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="relative"><Sprig size={compact ? 'sm' : 'md'} mood="happy" /><span className="online-dot" /></div><div><p className="text-xs font-bold text-[#b7f171]">Sprig says</p><p className="mt-0.5 font-display text-base font-bold">You’re building momentum.</p></div></div><ChevronRight size={18} className="mt-2 text-[#62e69b] transition group-hover:translate-x-1" /></div><p className="mt-3 max-w-md text-xs leading-relaxed text-[#9cc0ae]">Three focused days in a row is no accident. What feels like a good next step right now?</p><div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-[#62e69b]"><MessageCircle size={13} /> Talk to Sprig</div></button>;
}

function HomeView({ tasks, onToggle, onView, onCoach, totalXp }: { tasks: Task[]; onToggle: (id: number) => void; onView: (v: View) => void; onCoach: () => void; totalXp: number }) {
  const completed = tasks.filter(t => t.done).length;
  return <div className="animate-page">
    <div className="mb-8 flex items-start justify-between"><div><div className="eyebrow">Tuesday, October 15</div><h1 className="mt-2 max-w-lg font-display text-3xl font-bold tracking-[-0.06em] sm:text-[42px]">Make today a little <span className="text-[#62e69b]">brighter.</span></h1><p className="mt-3 text-sm text-[#86a79a]">Good morning, Alex. Your future self is cheering you on.</p></div><div className="hidden sm:block"><IconButton label="notifications"><Bell size={18} /></IconButton></div></div>
    <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
      <section className="hero-card">
        <div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" />
        <div className="relative z-10 max-w-[420px]"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8ee891]/20 bg-[#b7f171]/10 px-3 py-1.5 text-[11px] font-bold text-[#b7f171]"><Flame size={13} /> 3 day growing streak</div><h2 className="font-display text-2xl font-bold leading-tight tracking-[-0.05em] sm:text-3xl">A little focus today.<br /><span className="text-[#b7f171]">A lot more you.</span></h2><p className="mt-3 max-w-[330px] text-sm leading-relaxed text-[#a5c5b7]">You have 3 tasks waiting. Start with a 25 minute focus session and let the rest follow.</p><button type="button" onClick={() => onView('focus')} data-testid="button-start-focus-hero" className="primary-btn mt-6"><Play size={15} fill="currentColor" /> Start a focus session</button></div>
        <div className="hero-sprig"><Sprig size="lg" mood="celebrate" /><div className="hero-leaf hero-leaf-one" /><div className="hero-leaf hero-leaf-two" /></div>
      </section>
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-1"><div className="panel flex min-h-[128px] flex-col justify-between"><div className="flex items-center justify-between"><span className="eyebrow">Today’s energy</span><Zap size={17} className="text-[#f2c66d]" /></div><div><span className="font-display text-3xl font-bold">72</span><span className="ml-1 text-sm text-[#86a79a]">/ 100</span><div className="mt-3 h-2 rounded-full bg-[#1e3441]"><div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#62e69b] to-[#f2c66d]" /></div></div></div><div className="panel flex min-h-[128px] flex-col justify-between"><div className="flex items-center justify-between"><span className="eyebrow">XP earned today</span><Trophy size={17} className="text-[#f2c66d]" /></div><div><span className="font-display text-3xl font-bold text-[#b7f171]" data-testid="text-xp-today">{totalXp}</span><span className="ml-1 text-sm text-[#86a79a]">XP</span><p className="mt-2 text-[11px] text-[#86a79a]">+35 from your morning win</p></div></div></div>
    </div>
    <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.75fr]">
      <section className="panel"><div className="mb-5 flex items-center justify-between"><div><div className="eyebrow">Your plan</div><h2 className="mt-1 font-display text-lg font-bold">Small wins, stacked</h2></div><button type="button" onClick={() => onView('tasks')} data-testid="button-view-all-tasks" className="text-xs font-bold text-[#62e69b]">View all <ArrowRight size={13} className="ml-1 inline" /></button></div><div className="space-y-2">{tasks.slice(0, 3).map(task => <TaskRow key={task.id} task={task} onToggle={onToggle} />)}</div><button type="button" onClick={() => onView('tasks')} data-testid="button-add-task" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#2b4752] py-3 text-xs font-bold text-[#86a79a] transition hover:border-[#62e69b] hover:text-[#62e69b]"><Plus size={15} /> Add a task</button></section>
      <div className="space-y-5"><CoachCard onOpen={onCoach} compact /><section className="panel"><div className="flex items-center justify-between"><div><div className="eyebrow">Weekly rhythm</div><h2 className="mt-1 font-display text-lg font-bold">{completed + 2} of 7 days growing</h2></div><button type="button" onClick={() => onView('review')} data-testid="button-view-review" className="round-arrow"><ArrowRight size={15} /></button></div><div className="mt-5 flex items-end justify-between gap-2">{['M','T','W','T','F','S','S'].map((day, i) => <div key={`${day}-${i}`} className="flex flex-1 flex-col items-center gap-2"><div className={`week-dot ${i < 3 ? 'week-dot-active' : i === 3 ? 'week-dot-today' : ''}`}><span>{i < 3 ? '✓' : ''}</span></div><span className={`text-[10px] ${i === 3 ? 'font-bold text-[#b7f171]' : 'text-[#6e9184]'}`}>{day}</span></div>)}</div></section></div>
    </div>
  </div>;
}

function TaskRow({ task, onToggle, large = false }: { task: Task; onToggle: (id: number) => void; large?: boolean }) {
  return <div className={`task-row group ${task.done ? 'task-row-done' : ''} ${large ? 'py-4' : ''}`}><button type="button" onClick={() => onToggle(task.id)} data-testid={`button-complete-task-${task.id}`} className={`task-check ${task.done ? 'task-check-done' : ''}`}>{task.done && <Check size={13} strokeWidth={3} />}</button><div className="min-w-0 flex-1"><p className={`truncate text-sm font-semibold ${task.done ? 'text-[#739789] line-through' : 'text-[#e2f0e7]'}`}>{task.title}</p><div className="mt-1 flex items-center gap-2 text-[10px] text-[#718f84]"><span className={`subject-dot subject-${task.color}`} />{task.subject}<span>·</span><Clock3 size={11} /> {task.mins} min</div></div><span className={`whitespace-nowrap text-[10px] font-bold ${task.done ? 'text-[#5f8977]' : 'text-[#b7f171]'}`}>+{task.xp} XP</span><button type="button" aria-label={`More options for ${task.title}`} data-testid={`button-task-more-${task.id}`} className="ml-2 text-[#55776c] opacity-0 transition group-hover:opacity-100"><MoreHorizontal size={16} /></button></div>;
}

function FocusView({ onXp }: { onXp: (n: number) => void }) {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(2);
  useEffect(() => { if (!running) return; const timer = window.setInterval(() => setSeconds(s => { if (s <= 1) { setRunning(false); setSessions(v => v + 1); onXp(25); return 25 * 60; } return s - 1; }), 1000); return () => window.clearInterval(timer); }, [running, onXp]);
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  const progress = ((25 * 60 - seconds) / (25 * 60)) * 100;
  return <div className="animate-page"><PageHeading eyebrow="Focus room" title="One thing at a time." description="A quiet little room for your attention. Pick a task, press start, and let the noise wait." action={<div className="flex items-center gap-2 rounded-full border border-[#274539] bg-[#102821] px-3 py-2 text-xs font-bold text-[#b7f171]"><Flame size={14} /> 3 day streak</div>} /><div className="grid gap-5 xl:grid-cols-[1fr_0.72fr]">
    <section className="focus-card"><div className="focus-glow" /><div className="relative z-10 flex flex-col items-center"><div className="mb-8 flex items-center gap-2 rounded-full bg-[#1d3f36] px-3 py-1.5 text-[11px] font-bold text-[#b7f171]"><Brain size={14} /> {running ? 'In the zone' : 'Ready when you are'}</div><div className="timer-ring" style={{ '--progress': `${progress * 3.6}deg` } as CSSProperties}><div className="timer-inner"><span className="font-mono text-5xl font-medium tracking-[-0.08em] text-[#effaf2] sm:text-6xl" data-testid="text-focus-timer">{mins}:{secs}</span><span className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#759a8b]">deep focus</span></div></div><p className="mt-7 text-sm text-[#99bbaa]">{running ? 'Your only job is to stay with it.' : 'Twenty-five minutes can change the shape of your day.'}</p><div className="mt-6 flex items-center gap-3"><button type="button" onClick={() => setRunning(v => !v)} data-testid="button-focus-toggle" className="primary-btn min-w-[122px] justify-center">{running ? <><Pause size={15} /> Pause</> : <><Play size={15} fill="currentColor" /> Start</>}</button><IconButton label="reset focus timer" onClick={() => { setRunning(false); setSeconds(25 * 60); }}><RotateCcw size={16} /></IconButton></div></div><div className="relative z-10 mt-10 flex items-center justify-between border-t border-[#2b4a43] pt-4 text-xs text-[#789b8c]"><span>Session 03 of your day</span><span className="font-bold text-[#b7f171]">+25 XP on finish</span></div></section>
    <div className="space-y-5"><section className="panel"><div className="flex items-center justify-between"><div><div className="eyebrow">Working on</div><h2 className="mt-1 font-display text-lg font-bold">Practice derivatives</h2><p className="mt-1 text-xs text-[#799b8d]">Mathematics · 35 minutes</p></div><div className="subject-icon subject-gold"><BookOpen size={17} /></div></div><div className="mt-5 rounded-xl border border-[#29413e] bg-[#0b2021] p-3 text-xs leading-relaxed text-[#8eafa0]">Tip from Sprig: start with the chain rule examples. You already know more than it feels like.</div><button type="button" data-testid="button-change-focus-task" className="mt-4 text-xs font-bold text-[#62e69b]">Change task <ArrowRight size={13} className="ml-1 inline" /></button></section><section className="panel"><div className="eyebrow">Your focus garden</div><div className="mt-3 flex items-end justify-between"><div><span className="font-display text-3xl font-bold text-[#b7f171]">{sessions}</span><span className="ml-2 text-xs text-[#86a79a]">sessions this week</span></div><Sprig size="sm" mood="focus" /></div><div className="mt-4 h-2 rounded-full bg-[#1e3441]"><div className="h-full w-[64%] rounded-full bg-[#62e69b]" /></div><p className="mt-2 text-[10px] text-[#779a8b]">One more session to beat last week.</p></section></div>
  </div></div>;
}

function TasksView({ tasks, onToggle, onAdd }: { tasks: Task[]; onToggle: (id: number) => void; onAdd: () => void }) {
  const done = tasks.filter(t => t.done).length;
  return <div className="animate-page"><PageHeading eyebrow="Your plan" title="Small wins, stacked." description="A flexible plan for today. Complete what matters, then leave room for being human." action={<button type="button" onClick={onAdd} data-testid="button-add-new-task" className="primary-btn"><Plus size={15} /> Add task</button>} /><div className="mb-5 grid grid-cols-3 gap-3"><StatPill icon={<Check size={15} />} value={`${done}/${tasks.length}`} label="complete" /><StatPill icon={<Clock3 size={15} />} value="95m" label="planned" color="gold" /><StatPill icon={<Zap size={15} />} value="130" label="XP available" color="blue" /></div><div className="grid gap-5 lg:grid-cols-[1fr_0.7fr]"><section className="panel"><div className="mb-4 flex items-center justify-between"><h2 className="font-display font-bold">Today, Oct 15</h2><span className="rounded-full bg-[#b7f171]/10 px-2.5 py-1 text-[10px] font-bold text-[#b7f171]">{done} done</span></div><div className="divide-y divide-[#1b3440]">{tasks.map(task => <TaskRow key={task.id} task={task} onToggle={onToggle} large />)}</div></section><CoachCard onOpen={() => {}} /></div></div>;
}

function ReviewView({ tasks }: { tasks: Task[] }) {
  const bars = [38, 72, 54, 86, 64, 28, 18];
  return <div className="animate-page"><PageHeading eyebrow="Look back, look forward" title="Your week in bloom." description="Progress is not a straight line. It is the quiet pattern of returning." action={<button type="button" data-testid="button-share-review" className="ghost-btn"><ArrowRight size={15} /> Share progress</button>} /><div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]"><section className="panel"><div className="flex items-start justify-between"><div><div className="eyebrow">Oct 9 — Oct 15</div><h2 className="mt-1 font-display text-2xl font-bold tracking-[-0.04em]">You kept showing up.</h2><p className="mt-2 text-xs text-[#86a79a]">That is the part that changes everything.</p></div><div className="rounded-xl bg-[#17362e] p-2.5 text-[#b7f171]"><TrendingUpIcon /></div></div><div className="mt-8 flex h-44 items-end gap-3 sm:gap-5">{bars.map((height, i) => <div key={i} className="flex flex-1 flex-col items-center gap-2"><div className={`w-full rounded-t-lg transition-all ${i === 3 ? 'bg-[#b7f171]' : 'bg-[#285b4a]'}`} style={{ height: `${height}%` }} /><span className={`text-[10px] ${i === 3 ? 'font-bold text-[#b7f171]' : 'text-[#6d8f81]'}`}>{['W','T','F','S','S','M','T'][i]}</span></div>)}</div><div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#1b3440] pt-5"><div><div className="font-display text-xl font-bold">4.2h</div><div className="mt-1 text-[10px] text-[#76998b]">deep focus</div></div><div><div className="font-display text-xl font-bold">12</div><div className="mt-1 text-[10px] text-[#76998b]">tasks done</div></div><div><div className="font-display text-xl font-bold text-[#b7f171]">+385</div><div className="mt-1 text-[10px] text-[#76998b]">XP earned</div></div></div></section><div className="space-y-5"><section className="panel"><div className="eyebrow">Sprig noticed</div><div className="mt-4 flex gap-3"><Sprig size="sm" mood="celebrate" /><p className="text-sm leading-relaxed text-[#a5c3b5]">You focus best in the late afternoon. Protect that window this week and see what happens.</p></div></section><section className="panel"><div className="eyebrow">Next week’s intention</div><h2 className="mt-2 font-display text-lg font-bold">Make space for curiosity.</h2><p className="mt-2 text-xs leading-relaxed text-[#86a79a]">Beyond the assignments, what is one thing you want to understand just because it is interesting?</p><button type="button" data-testid="button-set-intention" className="mt-4 flex items-center gap-2 text-xs font-bold text-[#62e69b]">Set an intention <ArrowRight size={13} /></button></section></div></div><section className="mt-5 panel"><div className="flex items-center justify-between mb-4"><div><div className="eyebrow">Recent wins</div><h2 className="mt-1 font-display text-lg font-bold">Proof you are growing</h2></div><Trophy size={18} className="text-[#f2c66d]" /></div><div className="grid gap-2 sm:grid-cols-3">{tasks.slice(0, 3).map((task, i) => <div key={task.id} className="rounded-xl border border-[#213b42] bg-[#0b1d29] p-3"><div className="flex items-center gap-2 text-[#b7f171]"><Award size={14} /><span className="text-[10px] font-bold">WIN 0{i + 1}</span></div><p className="mt-2 text-xs font-semibold text-[#cce0d5]">{task.done ? task.title : 'Returned to your plan'}</p></div>)}</div></section></div>;
}

function TrendingUpIcon() { return <Activity size={19} />; }

function ProfileView({ totalXp }: { totalXp: number }) {
  const [editing, setEditing] = useState(false);
  return <div className="animate-page"><PageHeading eyebrow="The person behind the progress" title="Your growth garden." description="Grades are one signal. Curiosity, courage, and consistency are the bigger picture." action={<button type="button" onClick={() => setEditing(v => !v)} data-testid="button-edit-profile" className="ghost-btn">{editing ? <X size={15} /> : <UserRound size={15} />} {editing ? 'Close' : 'Edit profile'}</button>} /><div className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]"><section className="profile-card"><div className="profile-avatar">AL</div><div className="mt-4 font-display text-2xl font-bold">Alex Lee</div><p className="mt-1 text-xs text-[#86a79a]">Curious mind · Level 7</p><div className="mt-7 flex items-center justify-center gap-8"><div className="text-center"><div className="font-display text-xl font-bold text-[#b7f171]">{totalXp}</div><div className="mt-1 text-[10px] text-[#78998d]">total XP</div></div><div className="h-8 w-px bg-[#29433f]" /><div className="text-center"><div className="font-display text-xl font-bold">14</div><div className="mt-1 text-[10px] text-[#78998d]">day streak</div></div><div className="h-8 w-px bg-[#29433f]" /><div className="text-center"><div className="font-display text-xl font-bold">26</div><div className="mt-1 text-[10px] text-[#78998d]">focus hrs</div></div></div>{editing && <div className="mt-7 border-t border-[#29433f] pt-5"><label className="eyebrow">Your name<input data-testid="input-profile-name" className="mt-2 field" defaultValue="Alex Lee" /></label><button type="button" onClick={() => setEditing(false)} data-testid="button-save-profile" className="primary-btn mt-4 w-full justify-center">Save changes</button></div>}</section><section className="panel"><div className="flex items-start justify-between"><div><div className="eyebrow">Level 07 · The explorer</div><h2 className="mt-1 font-display text-2xl font-bold">Keep putting down roots.</h2><p className="mt-2 text-xs text-[#86a79a]">680 of 1,000 XP to your next level</p></div><Sprig size="md" mood="happy" /></div><div className="mt-6 h-3 rounded-full bg-[#1d3741]"><div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#62e69b] to-[#b7f171]" /></div><div className="mt-7 grid gap-3 sm:grid-cols-2"><GrowthItem icon={<Brain size={17} />} title="Deep thinker" description="Completed 10 focused sessions" active /><GrowthItem icon={<Flame size={17} />} title="Keeps going" description="Built a 3 day streak" active /><GrowthItem icon={<Headphones size={17} />} title="Quiet power" description="Complete 5 more focus sessions" /><GrowthItem icon={<Sparkles size={17} />} title="Curious by nature" description="Log a learning outside class" /></div></section></div><section className="mt-5 panel"><div className="flex items-center justify-between"><div><div className="eyebrow">Your values in action</div><h2 className="mt-1 font-display text-lg font-bold">What you are growing</h2></div><button type="button" data-testid="button-add-value" className="round-arrow"><Plus size={15} /></button></div><div className="mt-5 flex flex-wrap gap-2">{['Consistency', 'Curiosity', 'Courage', 'Clear thinking'].map((value, i) => <span key={value} className={`value-chip value-chip-${i}`}>{value}</span>)}</div></section></div>;
}

function GrowthItem({ icon, title, description, active = false }: { icon: ReactNode; title: string; description: string; active?: boolean }) {
  return <div className={`flex items-center gap-3 rounded-xl border p-3 ${active ? 'border-[#285846] bg-[#122c28]' : 'border-[#263b43] bg-[#0d202b]'}`}><div className={`rounded-lg p-2 ${active ? 'bg-[#b7f171]/10 text-[#b7f171]' : 'bg-[#24333d] text-[#78958b]'}`}>{icon}</div><div><p className="text-xs font-bold">{title}</p><p className="mt-1 text-[10px] text-[#78998d]">{description}</p></div>{active && <Check size={14} className="ml-auto text-[#b7f171]" />}</div>;
}

function CoachPanel({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(['Hey Alex. I’m here. What feels a little tangled today?']);
  const send = () => { if (!message.trim()) return; setMessages(m => [...m, message.trim(), 'That makes sense. Let’s make the next step smaller than the worry.']); setMessage(''); };
  return <div className="fixed inset-0 z-50 flex items-end justify-end bg-[#031016]/60 p-0 backdrop-blur-sm sm:p-5"><section className="coach-panel flex h-[min(700px,93dvh)] w-full flex-col rounded-t-[26px] border border-[#31574a] bg-[#0b211f] shadow-2xl sm:max-w-[420px] sm:rounded-[26px]"><header className="flex items-center justify-between border-b border-[#24473f] px-5 py-4"><div className="flex items-center gap-3"><Sprig size="sm" mood="happy" /><div><p className="font-display font-bold">Sprig</p><p className="text-[10px] text-[#7da092]">Your tiny study companion</p></div></div><IconButton label="close coach" onClick={onClose}><X size={17} /></IconButton></header><div className="flex-1 space-y-3 overflow-y-auto p-5">{messages.map((msg, i) => <div key={`${msg}-${i}`} className={i % 2 === 0 ? 'coach-message' : 'coach-message coach-message-user'}>{msg}</div>)}</div><div className="border-t border-[#24473f] p-4"><div className="mb-3 flex flex-wrap gap-2">{['Help me start', 'I feel stuck', 'Celebrate a win'].map(text => <button type="button" key={text} onClick={() => setMessage(text)} data-testid={`button-coach-suggestion-${text.toLowerCase().replaceAll(' ', '-')}`} className="suggestion-btn">{text}</button>)}</div><div className="flex items-center gap-2 rounded-xl border border-[#34584c] bg-[#102c29] p-1.5"><input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send(); }} data-testid="input-coach-message" placeholder="Write to Sprig..." className="min-w-0 flex-1 bg-transparent px-2 text-sm text-[#e2f0e7] outline-none placeholder:text-[#63877b]" /><button type="button" onClick={send} data-testid="button-send-coach" className="send-btn"><Send size={15} /></button></div></div></section></div>;
}

function Dashboard() {
  const [view, setView] = useState<View>('home');
  const [tasks, setTasks] = useState(initialTasks);
  const [xp, setXp] = useState(35);
  const [coachOpen, setCoachOpen] = useState(false);
  const totalXp = useMemo(() => xp + tasks.filter(t => t.done && t.id !== 1).reduce((sum, t) => sum + t.xp, 0), [xp, tasks]);
  const toggleTask = (id: number) => setTasks(current => current.map(task => task.id === id ? { ...task, done: !task.done } : task));
  const addTask = () => setTasks(current => [...current, { id: Date.now(), title: 'New study intention', subject: 'Personal', mins: 20, xp: 25, done: false, color: 'mint' }]);
  return <Shell view={view} onView={setView} onCoach={() => setCoachOpen(true)}>{view === 'home' && <HomeView tasks={tasks} onToggle={toggleTask} onView={setView} onCoach={() => setCoachOpen(true)} totalXp={totalXp} />}{view === 'focus' && <FocusView onXp={n => setXp(x => x + n)} />}{view === 'tasks' && <TasksView tasks={tasks} onToggle={toggleTask} onAdd={addTask} />}{view === 'review' && <ReviewView tasks={tasks} />}{view === 'profile' && <ProfileView totalXp={totalXp} />}{coachOpen && <CoachPanel onClose={() => setCoachOpen(false)} />}</Shell>;
}

function Router() {
  return <Switch><Route path="/" component={Dashboard} /><Route component={NotFound} /></Switch>;
}

function App() {
  useEffect(() => { document.documentElement.classList.add('dark'); }, []);
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;