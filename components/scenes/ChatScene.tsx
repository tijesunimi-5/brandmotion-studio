import { gsap } from 'gsap';
import { ChatSceneConfig } from '@/types/scene';

// Timing constants — tweak these to speed up/slow down the whole chat feel
const TYPING_DURATION = 0.7;   // how long the "..." dots show before a message appears
const REVEAL_DURATION = 0.3;   // how long the message bubble takes to fade/slide in
const GAP = 0.3;                // pause after a message before the next typing starts
const BUBBLE_GAP = 10;          // px spacing between bubbles

// Since chat scene duration depends on message count, use this helper when
// building a project so the master timeline stays accurate.
// e.g. duration: computeChatSceneDuration(myMessages.length)
export function computeChatSceneDuration(messageCount: number) {
  return +(messageCount * (TYPING_DURATION + REVEAL_DURATION + GAP) + 0.6).toFixed(2);
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />;
}

export function ChatScene({ config }: { config: ChatSceneConfig }) {
  const isWhatsApp = config.platform === 'whatsapp';

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div
        data-anim="chat-frame"
        className={`relative w-full max-w-[300px] overflow-hidden rounded-2xl border ${
          isWhatsApp ? 'border-neutral-300 bg-[#ECE5DD]' : 'border-neutral-800 bg-[#1A1A1A]'
        }`}
        style={{ height: '78%' }}
      >
        {/* header bar */}
        <div
          className={`flex items-center gap-2 px-3 py-2 text-xs font-medium ${
            isWhatsApp
              ? 'bg-[#075E54] text-white'
              : 'border-b border-neutral-800 bg-black text-white'
          }`}
        >
          <div className="h-6 w-6 rounded-full bg-white/30" />
          {config.contactName ?? (isWhatsApp ? 'WhatsApp Chat' : 'Instagram DM')}
        </div>

        {/* scrollable track — this whole div gets translated up by GSAP as messages fill the frame */}
        <div
          data-anim="chat-track"
          className="absolute left-0 right-0 px-3 pt-3"
          style={{ top: 36, position: 'absolute' }}
        >
          {config.messages.map((m, i) => (
            <div
              key={i}
              data-anim="msg-wrapper"
              style={{ height: 0, overflow: 'hidden', marginBottom: BUBBLE_GAP }}
            >
              <div
                data-anim="msg-bubble"
                className={`inline-block max-w-[75%] rounded-2xl px-3 py-2 text-[13px] leading-snug opacity-0 ${
                  m.sender === 'me'
                    ? isWhatsApp
                      ? 'ml-auto bg-[#DCF8C6] text-neutral-900'
                      : 'ml-auto bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                    : isWhatsApp
                    ? 'mr-auto bg-white text-neutral-900'
                    : 'mr-auto bg-neutral-800 text-white'
                }`}
                style={{ width: 'fit-content' }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* two reusable typing indicators — we move whichever one is needed to the right spot */}
          <div
            data-anim="typing-them"
            className={`absolute left-0 flex items-center gap-1 rounded-2xl px-3 py-2 opacity-0 ${
              isWhatsApp ? 'bg-white' : 'bg-neutral-800'
            }`}
          >
            <Dot /><Dot /><Dot />
          </div>
          <div
            data-anim="typing-me"
            className={`absolute right-0 flex items-center gap-1 rounded-2xl px-3 py-2 opacity-0 ${
              isWhatsApp ? 'bg-[#DCF8C6]' : 'bg-purple-500'
            }`}
          >
            <Dot /><Dot /><Dot />
          </div>
        </div>
      </div>
    </div>
  );
}

export function animateInChat(
  container: HTMLElement,
  tl: gsap.core.Timeline,
  startTime: number,
  config: ChatSceneConfig
) {
  const frame = container.querySelector('[data-anim="chat-frame"]') as HTMLElement | null;
  const track = container.querySelector('[data-anim="chat-track"]') as HTMLElement | null;
  const wrappers = Array.from(
    container.querySelectorAll('[data-anim="msg-wrapper"]')
  ) as HTMLElement[];
  const typingThem = container.querySelector('[data-anim="typing-them"]') as HTMLElement | null;
  const typingMe = container.querySelector('[data-anim="typing-me"]') as HTMLElement | null;

  if (!frame || !track || wrappers.length === 0 || !typingThem || !typingMe) return;

  const frameHeight = frame.clientHeight;
  let cumulative = 0;
  let t = startTime;

  config.messages.forEach((msg, i) => {
    const wrapper = wrappers[i];
    const bubble = wrapper.firstElementChild as HTMLElement;
    if (!bubble) return;

    // Measure the bubble's real height (it's already rendered, just visually hidden)
    const bubbleHeight = bubble.scrollHeight;

    const typingEl = msg.sender === 'me' ? typingMe : typingThem;
    const otherTyping = msg.sender === 'me' ? typingThem : typingMe;

    // Position + show the correct typing indicator where this message will land
    tl.set(typingEl, { top: cumulative }, t);
    tl.set(otherTyping, { opacity: 0 }, t);
    tl.to(typingEl, { opacity: 1, duration: 0.15 }, t);

    // Auto-scroll if the typing indicator itself would overflow the frame
    const approxTypingBottom = cumulative + 34;
    if (approxTypingBottom > frameHeight) {
      tl.to(
        track,
        { y: -(approxTypingBottom - frameHeight), duration: 0.4, ease: 'power2.out' },
        t
      );
    }

    // Swap typing indicator for the real message
    const revealTime = t + TYPING_DURATION;
    tl.to(typingEl, { opacity: 0, duration: 0.1 }, revealTime);
    tl.set(wrapper, { height: bubbleHeight }, revealTime);
    tl.fromTo(
      bubble,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: REVEAL_DURATION },
      revealTime
    );

    cumulative += bubbleHeight + BUBBLE_GAP;

    // Auto-scroll again in case the real bubble is taller than the typing dots were
    if (cumulative > frameHeight) {
      tl.to(track, { y: -(cumulative - frameHeight), duration: 0.4, ease: 'power2.out' }, revealTime);
    }

    t += TYPING_DURATION + REVEAL_DURATION + GAP;
  });
}
