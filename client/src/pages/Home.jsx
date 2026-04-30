import { Link } from 'react-router-dom'
import {
  Brain, Activity, PhoneCall, ChevronRight, Shield,
  Clock, Users, Zap, Star, ArrowRight, CheckCircle2, Send,
} from 'lucide-react'

/* ── Mini chat preview (hero right side) ─────────── */
function ChatPreview() {
  return (
    <div className="relative w-full max-w-sm mx-auto lg:mx-0">
      {/* Glow blob */}
      <div className="absolute -inset-4 bg-vital/10 rounded-3xl blur-2xl" />

      {/* Card */}
      <div className="relative bg-white rounded-3xl shadow-card-hover p-5 border border-sage">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-sage">
          <div className="w-9 h-9 rounded-full bg-sage flex items-center justify-center text-lg">🌿</div>
          <div>
            <p className="text-sm font-semibold text-charcoal">CueHealth AI</p>
            <p className="text-xs text-gray-400">Always available</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Online
          </span>
        </div>

        {/* Conversation */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-end">
            <div className="bg-sage text-charcoal text-xs rounded-2xl rounded-br-sm px-3.5 py-2.5 max-w-[85%] leading-relaxed">
              I've had a headache for 2 days with a mild fever
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <div className="w-7 h-7 rounded-full bg-sage flex items-center justify-center text-sm shrink-0">🌿</div>
            <div className="bg-ivory border border-sage text-charcoal text-xs rounded-2xl rounded-bl-sm px-3.5 py-2.5 max-w-[85%] leading-relaxed">
              <p className="font-semibold text-forest mb-1">Possible Causes:</p>
              <p>• Tension headache</p>
              <p>• Viral infection</p>
              <p>• Dehydration</p>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 bg-ivory rounded-xl px-3.5 py-2.5 border border-sage">
          <span className="text-xs text-gray-400 flex-1">Describe your symptoms…</span>
          <div className="w-6 h-6 bg-forest rounded-full flex items-center justify-center">
            <Send size={10} color="white" />
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-3 -right-3 bg-vital text-white text-xs px-3 py-1.5 rounded-full shadow-btn font-semibold">
        AI Powered ✨
      </div>
      <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card px-4 py-3 border border-sage">
        <p className="text-xl font-bold text-forest">50K+</p>
        <p className="text-xs text-gray-400">Users helped</p>
      </div>
    </div>
  )
}

/* ── Feature card ─────────────────────────────────── */
function FeatureCard({ icon: Icon, title, desc, accent }) {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-sage/60">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${accent}`}>
        <Icon size={22} className="text-white" />
      </div>
      <h3 className="text-base font-semibold text-charcoal mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}

/* ── Step ─────────────────────────────────────────── */
function Step({ num, title, desc }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="w-10 h-10 rounded-full bg-vital/20 text-forest font-bold text-sm flex items-center justify-center shrink-0 border-2 border-vital/40">
        {num}
      </div>
      <div>
        <h3 className="font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

/* ── Testimonial card ─────────────────────────────── */
function Testimonial({ quote, name, role, rating }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-sage/60">
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-vital text-vital" />
        ))}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-5 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-sage flex items-center justify-center text-sm font-bold text-forest">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-charcoal">{name}</p>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Home page ────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-ivory">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sage/40 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-vital/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-sage text-forest text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-sage-dark">
                <span className="text-sm">🌿</span>
                AI-Powered Health Assistant
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-charcoal leading-tight mb-5">
                Your Cue to a{' '}
                <span className="text-forest relative">
                  Healthier
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6 Q 100 1 198 6" stroke="#8BCF21" strokeWidth="3" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>{' '}
                Life
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                Describe your symptoms and get instant AI-powered insights — possible causes,
                practical advice, and guidance on when to see a doctor.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/chat"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest text-white font-semibold rounded-xl
                             hover:bg-forest-dark transition-all duration-200 shadow-btn hover:shadow-card-hover"
                >
                  Start Chat Free
                  <ChevronRight size={16} />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-forest text-forest font-semibold
                             rounded-xl hover:bg-forest hover:text-white transition-all duration-200"
                >
                  View Plans
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-5 text-sm text-gray-500">
                {[
                  { icon: Shield, label: 'Private & Secure' },
                  { icon: Clock,  label: 'Available 24/7'   },
                  { icon: Zap,    label: '<5s Response'      },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5">
                    <Icon size={14} className="text-forest" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="flex justify-center lg:justify-end animate-fade-in">
              <ChatPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────── */}
      <section className="bg-sage/60 border-y border-sage-dark py-10">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+',  label: 'Users helped'     },
              { value: '98%',   label: 'Satisfaction rate' },
              { value: '24/7',  label: 'AI availability'   },
              { value: '<5s',   label: 'Avg response time' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-extrabold text-forest">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────── */}
      <section className="py-20 bg-ivory">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold text-vital bg-vital/10 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-4">
              Everything you need for smarter health decisions
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              CueHealth combines advanced AI with a calm, friendly interface to guide you through your health questions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Brain}
              accent="bg-forest"
              title="AI Symptom Analysis"
              desc="Describe your symptoms in plain language. Our AI instantly identifies possible causes with clear explanations."
            />
            <FeatureCard
              icon={Activity}
              accent="bg-vital"
              title="Smart Health Guidance"
              desc="Get practical, evidence-based advice on what you can do at home and when professional care is needed."
            />
            <FeatureCard
              icon={PhoneCall}
              accent="bg-forest-light"
              title="Doctor Connection"
              desc="Request a real doctor callback directly from the app. Premium members get priority scheduling."
            />
          </div>

          {/* Extra features row */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              { icon: Shield, title: 'Private & Secure',     desc: 'Your health data is never stored or shared. Every conversation is private.' },
              { icon: Clock,  title: 'Available 24/7',       desc: 'Get health guidance at any time — no waiting rooms, no appointments needed.' },
              { icon: Users,  title: 'Trusted by Thousands', desc: 'Joined by 50,000+ users who use CueHealth to navigate everyday health questions.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 bg-white rounded-2xl p-5 shadow-card border border-sage/60 hover:shadow-card-hover transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-forest" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-charcoal mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────── */}
      <section className="py-20 bg-forest">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold text-vital bg-vital/20 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Three simple steps
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Get from symptoms to clarity in under a minute.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Step
              num="1"
              title="Describe your symptoms"
              desc="Type your symptoms in plain language — no medical jargon needed. Be as specific as you'd like."
            />
            <Step
              num="2"
              title="Get AI analysis"
              desc="Our AI instantly returns a structured response: summary, possible causes, and practical advice."
            />
            <Step
              num="3"
              title="Take informed action"
              desc="Follow the guidance, monitor your symptoms, or request a doctor callback directly from the app."
            />
          </div>

          <div className="text-center mt-12">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-vital text-charcoal font-bold
                         rounded-xl hover:bg-vital-dark hover:text-white transition-all duration-200 shadow-btn"
            >
              Try it now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────── */}
      <section className="py-20 bg-ivory">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold text-vital bg-vital/10 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal">
              What our users say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Testimonial
              rating={5}
              quote="CueHealth helped me stay calm during a health scare at 2am. The AI was clear, reassuring, and told me exactly when to go to the ER."
              name="Sarah M."
              role="Teacher, New York"
            />
            <Testimonial
              rating={5}
              quote="The doctor callback feature saved me hours of waiting. I described my symptoms and had a doctor call within 90 minutes."
              name="James K."
              role="Engineer, Austin"
            />
            <Testimonial
              rating={5}
              quote="Finally an app that explains symptoms without scaring you. It's like having a calm, knowledgeable friend available 24/7."
              name="Priya R."
              role="Designer, London"
            />
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────── */}
      <section className="py-20 bg-sage/60 border-y border-sage-dark">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-5">
            Start your health journey today
          </h2>
          <p className="text-gray-500 mb-8 text-lg">
            Free forever. No credit card required. Upgrade anytime for premium features.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest text-white font-semibold
                         rounded-xl hover:bg-forest-dark transition-all duration-200 shadow-btn"
            >
              Start Chatting Free <ChevronRight size={16} />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-forest text-forest
                         font-semibold rounded-xl hover:bg-forest hover:text-white transition-all duration-200"
            >
              Get Subscription
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-400 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-forest" /> No credit card</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-forest" /> Free plan forever</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-forest" /> Cancel anytime</span>
          </p>
        </div>
      </section>
    </main>
  )
}
