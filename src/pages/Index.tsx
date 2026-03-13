import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─── DATA ─── */

const REELS = [
  { id: 1, user: "kino.maxim", avatar: "КМ", likes: "14.2K", comments: "318", desc: "Момент из «Дюна 2» — это просто шедевр операторской работы 🎬✨", tag: "#кино", music: "Hans Zimmer — Arrakis", color: "from-blue-950 via-indigo-900 to-slate-900", emoji: "🎬" },
  { id: 2, user: "space.vibes", avatar: "СВ", likes: "8.7K", comments: "142", desc: "Космос такой близкий этой ночью 🌌 снято на телефон с горы", tag: "#космос", music: "Приятная — Ambient", color: "from-slate-900 via-blue-950 to-violet-950", emoji: "🌌" },
  { id: 3, user: "sonya.art", avatar: "СА", likes: "22.1K", comments: "567", desc: "Рисую ночной город за 60 секунд 🎨 timelapse", tag: "#арт", music: "Lofi Chill Beats", color: "from-indigo-950 via-blue-900 to-cyan-950", emoji: "🎨" },
  { id: 4, user: "oleg.bass", avatar: "ОБ", likes: "5.3K", comments: "89", desc: "Новый бас-риф — слушайте в наушниках 🎸🔊", tag: "#музыка", music: "Original sound", color: "from-blue-950 via-slate-900 to-indigo-950", emoji: "🎸" },
];

const STORIES = [
  { id: 0, name: "Моя", avatar: "ВЛ", isMe: true, seen: false },
  { id: 1, name: "Алина", avatar: "АМ", seen: false },
  { id: 2, name: "Макс", avatar: "МП", seen: false },
  { id: 3, name: "Соня", avatar: "СА", seen: true },
  { id: 4, name: "Кино-клуб", avatar: "КК", seen: true },
  { id: 5, name: "Артём", avatar: "АЗ", seen: true },
];

const CHATS_DATA = [
  { id: 1, name: "Алина Морозова", avatar: "АМ", msg: "Смотришь сегодня вечером? 🎬", time: "21:14", unread: 3, online: true, type: "chat" },
  { id: 2, name: "Кино-клуб 🎬", avatar: "КК", msg: "Дима: следующий — «Побег из Шоушенка»", time: "20:31", unread: 12, online: false, type: "channel", members: 47 },
  { id: 3, name: "Макс Проекций", avatar: "МП", msg: "Добавил новый трек в плейлист", time: "20:58", unread: 0, online: true, type: "chat" },
  { id: 4, name: "Рок по пятницам 🎸", avatar: "РП", msg: "Олег добавил: Radiohead — Exit Music", time: "18:44", unread: 0, online: false, type: "channel", members: 23 },
  { id: 5, name: "Соня Ветер", avatar: "СВ", msg: "голосовое сообщение · 0:42", time: "19:05", unread: 1, online: false, type: "chat" },
  { id: 6, name: "Артём Звук", avatar: "АЗ", msg: "Слушал новый альбом? Огонь 🔥", time: "17:22", unread: 0, online: true, type: "chat" },
];

const MESSAGES = [
  { id: 1, from: "in", name: "Алина", text: "Привет! Сегодня смотришь что-нибудь вечером?", time: "21:10" },
  { id: 2, from: "out", text: "Думаю! Есть идеи?", time: "21:11" },
  { id: 3, from: "in", name: "Алина", text: "Предлагаю «Дюну» — часть вторая. Запустим совместный просмотр?", time: "21:12" },
  { id: 4, from: "out", text: "Отлично! Давай в 22:00 🎬", time: "21:13" },
  { id: 5, from: "in", name: "Алина", text: "Жди приглашения в плеер! ✨", time: "21:14", invite: true },
];

const CONTACTS = [
  { id: 1, name: "Алина Морозова", status: "В сети", avatar: "АМ", online: true },
  { id: 2, name: "Артём Звук", status: "В сети", avatar: "АЗ", online: true },
  { id: 3, name: "Макс Проекций", status: "В сети", avatar: "МП", online: true },
  { id: 4, name: "Дима Фокус", status: "Был час назад", avatar: "ДФ", online: false },
  { id: 5, name: "Соня Ветер", status: "Была вчера", avatar: "СВ", online: false },
  { id: 6, name: "Олег Ритм", status: "Был 3 дня назад", avatar: "ОР", online: false },
];

const PHOTOS = [
  { id: 1, emoji: "🌌", label: "Ночное небо" },
  { id: 2, emoji: "🎬", label: "Дюна 2" },
  { id: 3, emoji: "🎸", label: "Концерт" },
  { id: 4, emoji: "🌊", label: "Океан" },
  { id: 5, emoji: "🎨", label: "Арт" },
  { id: 6, emoji: "🍃", label: "Природа" },
];

const SETTINGS_SECTIONS = [
  { icon: "User", label: "Аккаунт", desc: "Имя, фото, номер телефона", premium: false },
  { icon: "Bell", label: "Уведомления", desc: "Звуки, вибрация, приоритеты", premium: false },
  { icon: "Palette", label: "Тема и вид", desc: "Цвета, шрифты, анимации", premium: false },
  { icon: "Shield", label: "Конфиденциальность", desc: "Блокировка, видимость, история", premium: false },
  { icon: "PlayCircle", label: "Медиа и плеер", desc: "Качество, субтитры, синхронизация", premium: false },
  { icon: "HardDrive", label: "Хранилище", desc: "Кэш, файлы, облако", premium: false },
  { icon: "Crown", label: "Verdi Premium", desc: "4K видео, безлимитное облако, стикеры", premium: true },
  { icon: "HelpCircle", label: "Помощь", desc: "FAQ, обратная связь", premium: false },
];

type Tab = "video" | "messages" | "contacts" | "profile" | "settings";
type ChatItem = typeof CHATS_DATA[0];
type MsgTab = "chats" | "channels";

/* ─── COMPONENT ─── */

const Index = () => {
  const [tab, setTab] = useState<Tab>("video");
  const [openChat, setOpenChat] = useState<ChatItem | null>(null);
  const [msgInput, setMsgInput] = useState("");
  const [reelIdx, setReelIdx] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [msgTab, setMsgTab] = useState<MsgTab>("chats");
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(38);
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const TABS: { key: Tab; icon: string; label: string }[] = [
    { key: "video", icon: "Play", label: "Видео" },
    { key: "messages", icon: "MessageCircle", label: "Чаты" },
    { key: "contacts", icon: "Users", label: "Контакты" },
    { key: "profile", icon: "User", label: "Профиль" },
    { key: "settings", icon: "Settings2", label: "Параметры" },
  ];

  const filteredMessages = CHATS_DATA.filter(c =>
    msgTab === "chats" ? c.type === "chat" : c.type === "channel"
  );

  const currentReel = REELS[reelIdx];

  return (
    <div className="flex flex-col h-dvh bg-background max-w-md mx-auto relative overflow-hidden">

      {/* STORY VIEWER overlay */}
      {activeStory !== null && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center"
          onClick={() => setActiveStory(null)}>
          <div className="w-full h-full flex flex-col"
            style={{ background: "linear-gradient(160deg, hsl(225 60% 12%) 0%, hsl(240 50% 8%) 100%)" }}>
            <div className="absolute top-0 left-0 right-0 flex gap-1 p-3 pt-12">
              {[0, 1, 2].map(i => (
                <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.25)" }}>
                  <div className="h-full rounded-full" style={{
                    background: "white",
                    width: i === 0 ? "60%" : i === 1 ? "0%" : "0%"
                  }} />
                </div>
              ))}
            </div>
            <div className="absolute top-12 left-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "linear-gradient(135deg, #4fc3f7, #7c4dff)" }}>
                {STORIES[activeStory]?.avatar}
              </div>
              <span className="text-white text-sm font-semibold">{STORIES[activeStory]?.name}</span>
              <span className="text-white/50 text-xs">2 мин назад</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="text-8xl animate-float">{["🌌", "🎬", "🎵", "✨", "🌊", "🎨"][activeStory % 6]}</div>
            </div>
            <p className="text-center text-white/70 pb-16 text-sm px-8">История от {STORIES[activeStory]?.name} · Нажми чтобы закрыть</p>
          </div>
        </div>
      )}

      {/* CREATE CHANNEL MODAL */}
      {showCreateChannel && (
        <div className="absolute inset-0 z-40 flex items-end" style={{ background: "rgba(4,8,28,0.75)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowCreateChannel(false)}>
          <div className="w-full glass-strong rounded-t-3xl p-6 pb-10 animate-slide-up"
            onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5" />
            <h3 className="font-display font-bold text-lg mb-4">Создать канал</h3>
            <div className="space-y-3 mb-5">
              <div className="rounded-2xl px-4 py-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(140,200,255,0.14)" }}>
                <p className="text-xs text-muted-foreground mb-1">Название канала</p>
                <input className="w-full bg-transparent text-sm outline-none" placeholder="Мой крутой канал..." />
              </div>
              <div className="rounded-2xl px-4 py-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(140,200,255,0.14)" }}>
                <p className="text-xs text-muted-foreground mb-1">Описание</p>
                <input className="w-full bg-transparent text-sm outline-none" placeholder="О чём этот канал..." />
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Пригласить из контактов</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {CONTACTS.map(c => (
                  <div key={c.id} className="flex flex-col items-center gap-1 shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: "linear-gradient(135deg, hsl(210 80% 25%), hsl(230 60% 18%))", border: "1px solid rgba(100,170,255,0.25)" }}>
                      {c.avatar}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{c.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="w-full py-3 rounded-2xl font-semibold text-background blue-glow"
              style={{ background: "hsl(var(--blue-neon))" }}
              onClick={() => setShowCreateChannel(false)}>
              Создать канал
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="glass border-b border-border px-4 pt-10 pb-3 flex items-center justify-between z-20 shrink-0">
        {openChat ? (
          <div className="flex items-center gap-3 w-full">
            <button onClick={() => { setOpenChat(null); setShowPlayer(false); }} className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="ChevronLeft" size={22} />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(210 80% 30%), hsl(230 60% 22%))" }}>
              {openChat.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">{openChat.name}</p>
              <p className="text-xs" style={{ color: openChat.type === "channel" ? "hsl(var(--cyan-glow))" : openChat.online ? "hsl(var(--online))" : "hsl(var(--muted-foreground))" }}>
                {openChat.type === "channel" ? `${openChat.members} участников` : openChat.online ? "в сети" : "не в сети"}
              </p>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <button onClick={() => setShowPlayer(true)} className="hover:text-neon transition-colors"><Icon name="Film" size={18} /></button>
              <button className="hover:text-neon transition-colors"><Icon name="Phone" size={18} /></button>
              <button className="hover:text-neon transition-colors"><Icon name="MoreVertical" size={18} /></button>
            </div>
          </div>
        ) : tab === "video" ? (
          <>
            <span className="font-display font-bold text-xl tracking-tight neon-text">Verdi</span>
            <div className="flex items-center gap-3 text-muted-foreground">
              <button className="hover:text-neon transition-colors"><Icon name="Search" size={19} /></button>
              <button className="hover:text-neon transition-colors"><Icon name="Bell" size={19} /></button>
            </div>
          </>
        ) : (
          <>
            <span className="font-display font-bold text-xl tracking-tight neon-text">Verdi</span>
            <div className="flex items-center gap-3 text-muted-foreground">
              <button className="hover:text-neon transition-colors"><Icon name="Search" size={19} /></button>
              <button className="hover:text-neon transition-colors"><Icon name="Edit" size={19} /></button>
            </div>
          </>
        )}
      </header>

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto scrollbar-hide relative">

        {/* ── VIDEO / REELS TAB ── */}
        {tab === "video" && (
          <div className="h-full flex flex-col">
            <div
              key={reelIdx}
              className={`flex-1 relative flex flex-col justify-end bg-gradient-to-b ${currentReel.color} animate-reel-in`}
            >
              {/* Big emoji visual */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-[120px] opacity-25 animate-float select-none">{currentReel.emoji}</div>
              </div>
              {/* Cosmic overlay dots */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="absolute w-1 h-1 rounded-full bg-white/20"
                    style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${i * 0.3}s` }} />
                ))}
              </div>

              {/* Right side actions */}
              <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5">
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => setLiked(prev => {
                      const next = new Set(prev);
                      if (next.has(currentReel.id)) { next.delete(currentReel.id); } else { next.add(currentReel.id); }
                      return next;
                    })}
                    className="w-11 h-11 rounded-full glass-card flex items-center justify-center transition-all active:scale-90"
                    style={{ border: liked.has(currentReel.id) ? "1px solid rgba(239,68,68,0.5)" : undefined }}
                  >
                    <Icon name="Heart" size={22} style={{ color: liked.has(currentReel.id) ? "#ef4444" : "white" }} />
                  </button>
                  <span className="text-white/80 text-xs">{liked.has(currentReel.id)
                    ? (parseInt(currentReel.likes) + 1).toLocaleString()
                    : currentReel.likes}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button className="w-11 h-11 rounded-full glass-card flex items-center justify-center">
                    <Icon name="MessageCircle" size={21} className="text-white" />
                  </button>
                  <span className="text-white/80 text-xs">{currentReel.comments}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button className="w-11 h-11 rounded-full glass-card flex items-center justify-center">
                    <Icon name="Share2" size={19} className="text-white" />
                  </button>
                  <span className="text-white/80 text-xs">Поделиться</span>
                </div>
                <button className="w-11 h-11 rounded-full glass-card flex items-center justify-center">
                  <Icon name="Bookmark" size={19} className="text-white" />
                </button>
              </div>

              {/* Bottom info overlay */}
              <div className="reels-overlay px-4 pt-10 pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #4fc3f7, #7c4dff)" }}>
                    {currentReel.avatar}
                  </div>
                  <span className="text-white font-semibold text-sm">@{currentReel.user}</span>
                  <button className="ml-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-white/40 text-white">
                    + Подписаться
                  </button>
                </div>
                <p className="text-white/90 text-sm mb-1 leading-relaxed">{currentReel.desc}</p>
                <p className="text-white/60 text-xs mb-3">{currentReel.tag}</p>
                <div className="flex items-center gap-2">
                  <Icon name="Music2" size={13} className="text-white/70" />
                  <p className="text-white/70 text-xs">{currentReel.music}</p>
                </div>
              </div>

              {/* Swipe controls */}
              <div className="absolute left-0 top-0 w-1/2 h-full" onClick={() => setReelIdx(i => Math.max(0, i - 1))} />
              <div className="absolute right-12 top-0 w-[calc(50%-3rem)] h-full" onClick={() => setReelIdx(i => Math.min(REELS.length - 1, i + 1))} />
            </div>

            {/* Reel dots */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-20 flex gap-1.5">
              {REELS.map((_, i) => (
                <div key={i} className="rounded-full transition-all cursor-pointer"
                  style={{
                    width: i === reelIdx ? "16px" : "6px",
                    height: "6px",
                    background: i === reelIdx ? "hsl(var(--blue-neon))" : "rgba(255,255,255,0.3)"
                  }}
                  onClick={() => setReelIdx(i)} />
              ))}
            </div>
          </div>
        )}

        {/* ── MESSAGES TAB ── */}
        {tab === "messages" && !openChat && (
          <div className="animate-fade-in">
            {/* Tabs */}
            <div className="flex items-center gap-0 px-4 pt-3 pb-2">
              {(["chats", "channels"] as MsgTab[]).map(t => (
                <button
                  key={t}
                  onClick={() => setMsgTab(t)}
                  className="flex-1 py-2 text-sm font-semibold transition-all rounded-xl"
                  style={{
                    background: msgTab === t ? "rgba(120,180,255,0.12)" : "transparent",
                    color: msgTab === t ? "hsl(var(--blue-neon))" : "hsl(var(--muted-foreground))",
                    border: msgTab === t ? "1px solid rgba(100,180,255,0.22)" : "1px solid transparent"
                  }}>
                  {t === "chats" ? "Чаты" : "Каналы"}
                </button>
              ))}
            </div>

            {/* Stories row (only in chats) */}
            {msgTab === "chats" && (
              <div className="px-4 mb-2">
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                  {STORIES.map((s, i) => (
                    <button key={s.id} onClick={() => !s.isMe && setActiveStory(i)}
                      className="flex flex-col items-center gap-1.5 shrink-0">
                      <div className={`${!s.seen && !s.isMe ? "story-ring animate-story-pulse" : ""}`}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{
                            background: s.isMe
                              ? "rgba(100,170,255,0.12)"
                              : s.seen
                                ? "rgba(255,255,255,0.07)"
                                : "linear-gradient(135deg, hsl(210 80% 20%), hsl(255 50% 20%))",
                            border: s.seen ? "2px solid rgba(255,255,255,0.12)" : s.isMe ? "2px dashed rgba(100,170,255,0.4)" : "none",
                            color: "white"
                          }}>
                          {s.isMe
                            ? <Icon name="Plus" size={20} style={{ color: "hsl(var(--blue-neon))" }} />
                            : s.avatar}
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Channel create button */}
            {msgTab === "channels" && (
              <div className="px-4 mb-2">
                <button
                  onClick={() => setShowCreateChannel(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all"
                  style={{ background: "rgba(100,170,255,0.08)", border: "1px dashed rgba(100,180,255,0.3)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(100,170,255,0.12)" }}>
                    <Icon name="Plus" size={18} style={{ color: "hsl(var(--blue-neon))" }} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold" style={{ color: "hsl(var(--blue-neon))" }}>Создать канал</p>
                    <p className="text-xs text-muted-foreground">Пригласи друзей из контактов</p>
                  </div>
                </button>
              </div>
            )}

            {/* List */}
            <div>
              {filteredMessages.map((chat, i) => (
                <button key={chat.id} onClick={() => setOpenChat(chat)}
                  className="w-full flex items-center gap-3 px-4 py-3 transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 35}ms` }}>
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: chat.type === "channel"
                        ? "linear-gradient(135deg, hsl(190 70% 25%), hsl(210 70% 20%))"
                        : "linear-gradient(135deg, hsl(210 80% 28%), hsl(240 60% 20%))" }}>
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background"
                        style={{ background: "hsl(var(--online))" }} />
                    )}
                    {chat.type === "channel" && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: "hsl(var(--cyan-glow))", border: "2px solid hsl(var(--background))" }}>
                        <Icon name="Radio" size={8} className="text-background" />
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-semibold truncate">{chat.name}</span>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.msg}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="shrink-0 min-w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center px-1"
                      style={{ background: "hsl(var(--blue-neon))", color: "hsl(var(--background))" }}>
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── OPEN CHAT ── */}
        {tab === "messages" && openChat && (
          <div className="flex flex-col h-full">
            {/* Mini player */}
            {showPlayer && (
              <div className="mx-3 mt-3 rounded-2xl overflow-hidden animate-slide-up shrink-0"
                style={{ border: "1px solid rgba(100,170,255,0.22)", background: "rgba(10,20,50,0.8)" }}>
                <div className="relative w-full aspect-video flex items-center justify-center"
                  style={{ background: "linear-gradient(160deg, hsl(225 60% 8%), hsl(240 50% 5%))" }}>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 blue-glow"
                      style={{ background: "rgba(100,170,255,0.12)", border: "1px solid rgba(100,170,255,0.3)" }}>
                      <Icon name="Film" size={26} style={{ color: "hsl(var(--blue-neon))" }} />
                    </div>
                    <p className="text-sm text-white/70">Дюна: Часть вторая</p>
                    <p className="text-xs mt-0.5" style={{ color: "hsl(var(--cyan-glow))" }}>● Совместный просмотр · 2 участника</p>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs text-muted-foreground">1:12:44</span>
                    <div className="flex-1 h-1.5 rounded-full cursor-pointer"
                      style={{ background: "rgba(255,255,255,0.1)" }}
                      onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setProgress(Math.round(((e.clientX - r.left) / r.width) * 100)); }}>
                      <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "hsl(var(--blue-neon))" }} />
                    </div>
                    <span className="text-xs text-muted-foreground">2:46:00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setPlaying(!playing)} className="text-white hover:text-neon transition-colors">
                        <Icon name={playing ? "Pause" : "Play"} size={20} />
                      </button>
                      <button className="text-muted-foreground hover:text-neon transition-colors"><Icon name="Volume2" size={15} /></button>
                      <button className="text-muted-foreground hover:text-neon transition-colors"><Icon name="FileText" size={15} /></button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: "rgba(100,170,255,0.15)", color: "hsl(var(--blue-neon))", border: "1px solid rgba(100,180,255,0.25)" }}>4K</span>
                      <button onClick={() => setShowPlayer(false)} className="text-muted-foreground hover:text-foreground"><Icon name="X" size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-3 space-y-2">
              {MESSAGES.map((msg, i) => (
                <div key={msg.id}
                  className={`flex animate-fade-in ${msg.from === "out" ? "justify-end" : "justify-start"}`}
                  style={{ animationDelay: `${i * 45}ms` }}>
                  <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl ${msg.from === "out" ? "msg-bubble-out rounded-br-sm" : "msg-bubble-in rounded-bl-sm"}`}>
                    {msg.from === "in" && (
                      <p className="text-xs font-semibold mb-1" style={{ color: "hsl(var(--cyan-glow))" }}>{msg.name}</p>
                    )}
                    {"invite" in msg && msg.invite && (
                      <div className="mb-2 px-3 py-2 rounded-xl flex items-center gap-2"
                        style={{ background: "rgba(100,170,255,0.12)", border: "1px solid rgba(100,180,255,0.22)" }}>
                        <Icon name="Film" size={14} style={{ color: "hsl(var(--blue-neon))" }} />
                        <span className="text-xs" style={{ color: "hsl(var(--blue-neon))" }}>Приглашение в совместный просмотр</span>
                        <button onClick={() => setShowPlayer(true)}
                          className="ml-auto text-xs px-2 py-0.5 rounded-lg font-semibold"
                          style={{ background: "hsl(var(--blue-neon))", color: "hsl(var(--background))" }}>Войти</button>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed text-white/90">{msg.text}</p>
                    <p className="text-xs text-muted-foreground mt-1 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="glass border-t border-border px-3 py-3 pb-5 shrink-0">
              <div className="flex items-center gap-2">
                <button className="text-muted-foreground hover:text-neon transition-colors shrink-0"><Icon name="Paperclip" size={20} /></button>
                <div className="flex-1 flex items-center gap-2 rounded-2xl px-3 py-2.5"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(140,200,255,0.14)" }}>
                  <input ref={inputRef} value={msgInput} onChange={e => setMsgInput(e.target.value)}
                    placeholder="Сообщение..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-white/90" />
                  <button className="text-muted-foreground hover:text-neon transition-colors"><Icon name="Smile" size={18} /></button>
                </div>
                <button className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all"
                  style={{ background: msgInput ? "hsl(var(--blue-neon))" : "rgba(255,255,255,0.07)", border: "1px solid rgba(140,200,255,0.18)" }}>
                  {msgInput ? <Icon name="Send" size={16} className="text-background" /> : <Icon name="Mic" size={16} className="text-muted-foreground" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── CONTACTS ── */}
        {tab === "contacts" && (
          <div className="animate-fade-in">
            <div className="px-4 pt-3 pb-2">
              <div className="flex items-center gap-2 rounded-2xl px-3 py-2.5"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(140,200,255,0.14)" }}>
                <Icon name="Search" size={15} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Поиск контактов...</span>
              </div>
            </div>
            <div className="px-4 py-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">В сети — 3</p>
              {CONTACTS.filter(c => c.online).map((c, i) => (
                <div key={c.id} className="flex items-center gap-3 py-2.5 animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg, hsl(210 80% 28%), hsl(255 60% 22%))" }}>
                      {c.avatar}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background"
                      style={{ background: "hsl(var(--online))" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs" style={{ color: "hsl(var(--online))" }}>{c.status}</p>
                  </div>
                  <button className="text-muted-foreground hover:text-neon transition-colors"><Icon name="MessageCircle" size={17} /></button>
                </div>
              ))}
            </div>
            <div className="px-4 py-1 mt-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Не в сети</p>
              {CONTACTS.filter(c => !c.online).map((c, i) => (
                <div key={c.id} className="flex items-center gap-3 py-2.5 animate-fade-in" style={{ animationDelay: `${(i + 3) * 40}ms` }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}>
                    {c.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground/60">{c.status}</p>
                  </div>
                  <button className="text-muted-foreground hover:text-neon transition-colors"><Icon name="MessageCircle" size={17} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PROFILE ── */}
        {tab === "profile" && (
          <div className="animate-fade-in pb-4">
            {/* Cover */}
            <div className="relative h-36"
              style={{ background: "linear-gradient(160deg, hsl(225 60% 12%) 0%, hsl(250 50% 10%) 50%, hsl(210 50% 8%) 100%)" }}>
              <div className="absolute inset-0"
                style={{ backgroundImage: "radial-gradient(ellipse 70% 60% at 25% 60%, rgba(60,120,230,0.25) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 75% 40%, rgba(120,60,230,0.18) 0%, transparent 55%)" }} />
              <div className="absolute top-3 right-3 text-white/40 hover:text-white/80 transition-colors">
                <Icon name="Camera" size={18} />
              </div>
            </div>

            <div className="px-4 -mt-12 mb-4 flex items-end justify-between">
              <div className="relative">
                <div className="story-ring animate-story-pulse">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white m-0.5"
                    style={{ background: "linear-gradient(135deg, hsl(215 70% 20%), hsl(250 60% 18%))" }}>
                    ВЛ
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-background"
                  style={{ background: "hsl(var(--online))" }} />
              </div>
              <button className="px-4 py-1.5 rounded-xl text-sm font-medium glass-card">Изменить</button>
            </div>

            <div className="px-4 mb-4">
              <h2 className="text-xl font-bold font-display">Владимир Лунный</h2>
              <p className="text-sm text-muted-foreground mt-0.5">@vladimir_lunar</p>
              <p className="text-sm mt-2 leading-relaxed text-white/75">Люблю кино, музыку и ночные просмотры с друзьями 🎬🎵</p>
            </div>

            {/* Stats */}
            <div className="mx-4 mb-4 grid grid-cols-4 gap-2">
              {[
                { label: "Друзья", val: "128" },
                { label: "Подписки", val: "43" },
                { label: "Фильмов", val: "183" },
                { label: "Треков", val: "1.2K" },
              ].map(s => (
                <div key={s.label} className="glass-card rounded-2xl p-2.5 text-center">
                  <p className="text-base font-bold font-display neon-text">{s.val}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Stories */}
            <div className="px-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">Истории</p>
                <button className="text-xs" style={{ color: "hsl(var(--blue-neon))" }}>Добавить</button>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                <button className="shrink-0 flex flex-col items-center gap-1">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(100,170,255,0.08)", border: "2px dashed rgba(100,180,255,0.3)" }}>
                    <Icon name="Plus" size={22} style={{ color: "hsl(var(--blue-neon))" }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">Новая</span>
                </button>
                {["🌌", "🎬", "🎸", "🌊"].map((e, i) => (
                  <button key={i} onClick={() => setActiveStory(i + 1)} className="shrink-0 flex flex-col items-center gap-1">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ background: "linear-gradient(135deg, hsl(215 50% 15%), hsl(250 40% 12%))", border: "1px solid rgba(100,180,255,0.2)" }}>
                      {e}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{["Космос", "Кино", "Музыка", "Океан"][i]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Photo grid */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">Фото</p>
                <button className="text-xs" style={{ color: "hsl(var(--blue-neon))" }}>Добавить фото</button>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {PHOTOS.map(p => (
                  <div key={p.id} className="aspect-square rounded-xl flex items-center justify-center text-4xl"
                    style={{ background: "linear-gradient(160deg, hsl(215 50% 12%), hsl(250 40% 10%))", border: "1px solid rgba(100,180,255,0.14)" }}>
                    {p.emoji}
                  </div>
                ))}
                <div className="aspect-square rounded-xl flex items-center justify-center cursor-pointer"
                  style={{ background: "rgba(100,170,255,0.06)", border: "2px dashed rgba(100,180,255,0.25)" }}>
                  <Icon name="Plus" size={22} style={{ color: "hsl(var(--blue-neon))" }} />
                </div>
              </div>
            </div>

            {/* Premium */}
            <div className="mx-4 mt-4 p-3 rounded-2xl flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, rgba(180,120,20,0.15), rgba(160,100,10,0.1))", border: "1px solid rgba(200,160,40,0.25)" }}>
              <Icon name="Crown" size={20} style={{ color: "hsl(40 90% 60%)" }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: "hsl(40 90% 65%)" }}>Verdi Premium</p>
                <p className="text-xs text-muted-foreground">4K · Безлимитное облако · Стикеры</p>
              </div>
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {tab === "settings" && (
          <div className="animate-fade-in p-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl mb-4 glass-card">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white shrink-0"
                style={{ background: "linear-gradient(135deg, hsl(215 70% 22%), hsl(250 60% 18%))" }}>
                ВЛ
              </div>
              <div>
                <p className="font-semibold">Владимир Лунный</p>
                <p className="text-xs text-muted-foreground">@vladimir_lunar · Premium</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {SETTINGS_SECTIONS.map((s, i) => (
                <button key={s.label}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl transition-colors animate-fade-in text-left glass-card"
                  style={{
                    border: s.premium ? "1px solid rgba(200,160,40,0.25)" : "1px solid rgba(140,200,255,0.12)",
                    animationDelay: `${i * 35}ms`
                  }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: s.premium ? "rgba(180,120,20,0.15)" : "rgba(100,170,255,0.1)" }}>
                    <Icon name={s.icon} size={17} style={{ color: s.premium ? "hsl(40 90% 60%)" : "hsl(var(--blue-neon))" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: s.premium ? "hsl(40 90% 65%)" : undefined }}>{s.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{s.desc}</p>
                  </div>
                  <Icon name="ChevronRight" size={15} className="text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4 pb-2">Verdi v1.1.0 β · 2026</p>
          </div>
        )}
      </main>

      {/* BOTTOM NAV */}
      <nav className="glass border-t border-border shrink-0 pb-6 pt-2 px-2 z-20">
        <div className="flex items-center justify-around">
          {TABS.map(t => {
            const active = tab === t.key && !openChat;
            return (
              <button key={t.key}
                onClick={() => { setTab(t.key); setOpenChat(null); setShowPlayer(false); }}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${active ? "tab-active" : "text-muted-foreground"}`}>
                <div className="relative">
                  <Icon name={t.icon} size={22} />
                  {t.key === "messages" && !active && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                      style={{ background: "hsl(var(--blue-neon))" }} />
                  )}
                </div>
                <span className="text-[10px] font-medium">{t.label}</span>
                {active && <div className="tab-dot w-1 h-1 rounded-full" />}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Index;