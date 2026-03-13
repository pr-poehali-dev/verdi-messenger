import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const CHATS = [
  { id: 1, name: "Алина Морозова", avatar: "АМ", msg: "Смотришь сегодня вечером? 🎬", time: "21:14", unread: 3, online: true, watching: true },
  { id: 2, name: "Макс Проекций", avatar: "МП", msg: "Добавил новый трек в плейлист", time: "20:58", unread: 0, online: true, watching: false },
  { id: 3, name: "Кино-клуб 🎥", avatar: "КК", msg: "Дима: следующий — «Побег из Шоушенка»", time: "20:31", unread: 12, online: false, watching: false },
  { id: 4, name: "Соня Ветер", avatar: "СВ", msg: "голосовое сообщение · 0:42", time: "19:05", unread: 1, online: false, watching: false },
  { id: 5, name: "Рок по пятницам 🎸", avatar: "РП", msg: "Олег добавил: Radiohead — Exit Music", time: "18:44", unread: 0, online: false, watching: false },
  { id: 6, name: "Артём Звук", avatar: "АЗ", msg: "Слушал новый альбом? Огонь 🔥", time: "17:22", unread: 0, online: true, watching: false },
];

const MESSAGES = [
  { id: 1, from: "in", name: "Алина", text: "Привет! Сегодня смотришь что-нибудь вечером?", time: "21:10" },
  { id: 2, from: "out", text: "Думаю! Есть идеи?", time: "21:11" },
  { id: 3, from: "in", name: "Алина", text: "Предлагаю «Дюну» — часть вторая. Запустим совместный просмотр?", time: "21:12" },
  { id: 4, from: "out", text: "Отлично! Давай в 22:00 🎬", time: "21:13" },
  { id: 5, from: "in", name: "Алина", text: "Смотришь сегодня вечером? 🎬", time: "21:14", media: true },
];

const CONTACTS = [
  { id: 1, name: "Алина Морозова", status: "В сети", avatar: "АМ", online: true },
  { id: 2, name: "Артём Звук", status: "В сети", avatar: "АЗ", online: true },
  { id: 3, name: "Макс Проекций", status: "В сети", avatar: "МП", online: true },
  { id: 4, name: "Дима Фокус", status: "Был час назад", avatar: "ДФ", online: false },
  { id: 5, name: "Соня Ветер", status: "Была вчера", avatar: "СВ", online: false },
  { id: 6, name: "Олег Ритм", status: "Был 3 дня назад", avatar: "ОР", online: false },
  { id: 7, name: "Катя Кадр", status: "Была 5 дней назад", avatar: "КК", online: false },
];

const CHANNELS = [
  { id: 1, name: "Verdi Кино", desc: "Совместные просмотры каждую пятницу", subs: "14.2K", avatar: "🎬", isNew: true },
  { id: 2, name: "Indie Треки", desc: "Лучшая инди-музыка без рекламы", subs: "8.7K", avatar: "🎵", isNew: true },
  { id: 3, name: "Сериал-клуб", desc: "Обсуждения, рейтинги, анонсы", subs: "31K", avatar: "📺", isNew: false },
  { id: 4, name: "Ambient Space", desc: "Фоновая музыка для работы и сна", subs: "5.1K", avatar: "🌌", isNew: false },
  { id: 5, name: "Документалки", desc: "Лучшие документальные фильмы", subs: "9.3K", avatar: "🔍", isNew: false },
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

type Tab = "chats" | "channels" | "contacts" | "profile" | "settings";
type Chat = typeof CHATS[0];

const Index = () => {
  const [tab, setTab] = useState<Tab>("chats");
  const [openChat, setOpenChat] = useState<Chat | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playerType, setPlayerType] = useState<"video" | "music">("video");
  const [playing, setPlaying] = useState(false);
  const [msgInput, setMsgInput] = useState("");
  const [progress, setProgress] = useState(38);
  const inputRef = useRef<HTMLInputElement>(null);

  const TABS: { key: Tab; icon: string; label: string }[] = [
    { key: "chats", icon: "MessageCircle", label: "Чаты" },
    { key: "channels", icon: "Radio", label: "Каналы" },
    { key: "contacts", icon: "Users", label: "Контакты" },
    { key: "profile", icon: "User", label: "Профиль" },
    { key: "settings", icon: "Settings2", label: "Параметры" },
  ];

  return (
    <div className="flex flex-col h-dvh bg-background max-w-md mx-auto relative overflow-hidden">

      {/* Header */}
      <header className="glass border-b border-border px-4 pt-10 pb-3 flex items-center justify-between z-20 shrink-0">
        {openChat ? (
          <div className="flex items-center gap-3 w-full">
            <button onClick={() => { setOpenChat(null); setShowPlayer(false); }} className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="ChevronLeft" size={22} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon to-green-700 flex items-center justify-center text-xs font-bold text-background shrink-0">
              {openChat.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">{openChat.name}</p>
              <p className="text-xs" style={{ color: openChat.online ? "hsl(var(--neon))" : "hsl(var(--text-muted))" }}>
                {openChat.online ? "в сети" : "не в сети"}
              </p>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <button onClick={() => { setShowPlayer(true); setPlayerType("video"); }} className="hover:text-neon transition-colors">
                <Icon name="Film" size={18} />
              </button>
              <button onClick={() => { setShowPlayer(true); setPlayerType("music"); }} className="hover:text-neon transition-colors">
                <Icon name="Music2" size={18} />
              </button>
              <button className="hover:text-neon transition-colors">
                <Icon name="Phone" size={18} />
              </button>
              <button className="hover:text-neon transition-colors">
                <Icon name="MoreVertical" size={18} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl tracking-tight neon-text">Verdi</span>
              <span className="text-xs text-muted-foreground font-light mt-0.5">β</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <button className="hover:text-neon transition-colors"><Icon name="Search" size={19} /></button>
              <button className="hover:text-neon transition-colors"><Icon name="Edit" size={19} /></button>
            </div>
          </>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">

        {/* CHATS LIST */}
        {tab === "chats" && !openChat && (
          <div className="animate-fade-in">
            <div
              className="mx-3 mt-3 rounded-2xl p-3 flex items-center gap-3 cursor-pointer"
              style={{ background: "linear-gradient(135deg, hsl(145 40% 10%), hsl(145 35% 8%))", border: "1px solid hsl(145 40% 18%)" }}
              onClick={() => { setOpenChat(CHATS[0]); setShowPlayer(true); setPlayerType("music"); }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 animate-pulse-glow"
                style={{ background: "hsl(145 50% 15%)" }}>
                <Icon name="Music2" size={16} className="text-neon" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold" style={{ color: "hsl(var(--neon))" }}>Сейчас играет в чате</p>
                <p className="text-sm text-foreground truncate">Radiohead — Karma Police</p>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="wave-bar w-0.5 h-4 rounded-full bg-neon" />
                ))}
              </div>
            </div>
            <div className="mt-2">
              {CHATS.map((chat, i) => (
                <button
                  key={chat.id}
                  onClick={() => setOpenChat(chat)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-hover transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon to-green-800 flex items-center justify-center text-sm font-bold text-background">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background"
                        style={{ background: "hsl(var(--online))" }} />
                    )}
                    {chat.watching && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-background flex items-center justify-center">
                        <Icon name="Film" size={10} className="text-neon" />
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
                    <span className="shrink-0 min-w-5 h-5 rounded-full bg-neon text-background text-xs font-bold flex items-center justify-center px-1">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* OPEN CHAT */}
        {tab === "chats" && openChat && (
          <div className="flex flex-col h-full">
            {showPlayer && (
              <div className="animate-slide-up shrink-0 mx-3 mt-3 rounded-2xl overflow-hidden"
                style={{ border: "1px solid hsl(145 40% 18%)", background: "hsl(160 20% 5%)" }}>
                {playerType === "video" ? (
                  <div>
                    <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 border border-neon/30">
                          <Icon name="Film" size={28} className="text-neon" />
                        </div>
                        <p className="text-sm text-muted-foreground">Дюна: Часть вторая</p>
                        <p className="text-xs mt-0.5" style={{ color: "hsl(var(--neon))" }}>● Совместный просмотр · 2 участника</p>
                      </div>
                      <button
                        className="absolute inset-0 flex items-center justify-center"
                        onClick={() => setPlaying(!playing)}
                      />
                    </div>
                    <div className="px-3 py-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground">1:12:44</span>
                        <div className="flex-1 relative h-1.5 rounded-full cursor-pointer"
                          style={{ background: "hsl(var(--border))" }}
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
                          }}>
                          <div className="h-full rounded-full transition-all"
                            style={{ width: `${progress}%`, background: "hsl(var(--neon))" }} />
                        </div>
                        <span className="text-xs text-muted-foreground">2:46:00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button onClick={() => setPlaying(!playing)} className="text-foreground hover:text-neon transition-colors">
                            <Icon name={playing ? "Pause" : "Play"} size={20} />
                          </button>
                          <button className="text-muted-foreground hover:text-neon transition-colors">
                            <Icon name="Volume2" size={16} />
                          </button>
                          <button className="text-muted-foreground hover:text-neon transition-colors">
                            <Icon name="FileText" size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: "hsl(145 50% 12%)", color: "hsl(var(--neon))", border: "1px solid hsl(145 40% 20%)" }}>
                            4K
                          </span>
                          <button className="text-muted-foreground hover:text-neon transition-colors">
                            <Icon name="Maximize2" size={14} />
                          </button>
                          <button onClick={() => setShowPlayer(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                            <Icon name="X" size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 animate-spin-slow"
                        style={{ background: "linear-gradient(135deg, hsl(145 50% 20%), hsl(145 35% 12%))", border: "1px solid hsl(145 40% 25%)" }}>
                        <Icon name="Disc3" size={20} className="text-neon" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">Radiohead — Karma Police</p>
                        <p className="text-xs text-muted-foreground">OK Computer · 1997</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="wave-bar w-0.5 h-4 rounded-full bg-neon" />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">2:31</span>
                      <div className="flex-1 relative h-1 rounded-full cursor-pointer"
                        style={{ background: "hsl(var(--border))" }}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
                        }}>
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${progress}%`, background: "hsl(var(--neon))" }} />
                      </div>
                      <span className="text-xs text-muted-foreground">4:21</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <button className="text-muted-foreground hover:text-neon transition-colors">
                        <Icon name="Shuffle" size={15} />
                      </button>
                      <div className="flex items-center gap-4">
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <Icon name="SkipBack" size={18} />
                        </button>
                        <button
                          onClick={() => setPlaying(!playing)}
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-all neon-glow"
                          style={{ background: "hsl(var(--neon))" }}
                        >
                          <Icon name={playing ? "Pause" : "Play"} size={16} className="text-background" />
                        </button>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <Icon name="SkipForward" size={18} />
                        </button>
                      </div>
                      <button onClick={() => setShowPlayer(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                        <Icon name="X" size={15} />
                      </button>
                    </div>
                    <div className="mt-2 pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1">Плейлист группы · 6 треков</p>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: "hsl(145 50% 15%)" }}>
                          <Icon name="Plus" size={10} className="text-neon" />
                        </div>
                        <span className="text-xs" style={{ color: "hsl(var(--neon))" }}>Добавить трек</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-3 space-y-2">
              {MESSAGES.map((msg, i) => (
                <div key={msg.id}
                  className={`flex animate-fade-in ${msg.from === "out" ? "justify-end" : "justify-start"}`}
                  style={{ animationDelay: `${i * 50}ms` }}>
                  <div className={`max-w-[78%] px-3 py-2 rounded-2xl ${msg.from === "out" ? "msg-bubble-out rounded-br-sm" : "msg-bubble-in rounded-bl-sm"}`}>
                    {msg.from === "in" && (
                      <p className="text-xs font-semibold mb-0.5" style={{ color: "hsl(var(--neon))" }}>{msg.name}</p>
                    )}
                    {"media" in msg && msg.media && (
                      <div className="mb-2 p-2 rounded-xl flex items-center gap-2"
                        style={{ background: "hsl(145 40% 10%)", border: "1px solid hsl(145 40% 18%)" }}>
                        <Icon name="Film" size={14} className="text-neon" />
                        <span className="text-xs text-neon">Совместный просмотр</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className="text-xs text-muted-foreground mt-1 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass border-t border-border px-3 py-3 pb-5 shrink-0">
              <div className="flex items-center gap-2">
                <button className="text-muted-foreground hover:text-neon transition-colors shrink-0">
                  <Icon name="Paperclip" size={20} />
                </button>
                <div className="flex-1 flex items-center gap-2 rounded-2xl px-3 py-2"
                  style={{ background: "hsl(var(--surface-raised))", border: "1px solid hsl(var(--border))" }}>
                  <input
                    ref={inputRef}
                    value={msgInput}
                    onChange={e => setMsgInput(e.target.value)}
                    placeholder="Сообщение..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <button className="text-muted-foreground hover:text-neon transition-colors">
                    <Icon name="Smile" size={18} />
                  </button>
                </div>
                <button
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all"
                  style={{
                    background: msgInput ? "hsl(var(--neon))" : "hsl(var(--surface-raised))",
                    border: "1px solid hsl(var(--border))"
                  }}
                >
                  {msgInput
                    ? <Icon name="Send" size={16} className="text-background" />
                    : <Icon name="Mic" size={16} className="text-muted-foreground" />
                  }
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CHANNELS */}
        {tab === "channels" && (
          <div className="animate-fade-in p-3 space-y-2">
            <div className="flex items-center gap-2 px-1 mb-3">
              <div className="flex-1 flex items-center gap-2 rounded-2xl px-3 py-2"
                style={{ background: "hsl(var(--surface-raised))", border: "1px solid hsl(var(--border))" }}>
                <Icon name="Search" size={15} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Поиск каналов...</span>
              </div>
            </div>
            {CHANNELS.map((ch, i) => (
              <div key={ch.id}
                className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors animate-fade-in"
                style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", animationDelay: `${i * 50}ms` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: "hsl(var(--surface-raised))" }}>
                  {ch.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold">{ch.name}</span>
                    {ch.isNew && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                        style={{ background: "hsl(145 50% 12%)", color: "hsl(var(--neon))" }}>new</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{ch.desc}</p>
                  <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>{ch.subs} подписчиков</p>
                </div>
                <button className="text-muted-foreground hover:text-neon transition-colors shrink-0">
                  <Icon name="Plus" size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CONTACTS */}
        {tab === "contacts" && (
          <div className="animate-fade-in">
            <div className="px-4 pt-3 pb-2">
              <div className="flex items-center gap-2 rounded-2xl px-3 py-2.5"
                style={{ background: "hsl(var(--surface-raised))", border: "1px solid hsl(var(--border))" }}>
                <Icon name="Search" size={15} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Поиск контактов...</span>
              </div>
            </div>
            <div className="px-4 py-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">В сети — 3</p>
              {CONTACTS.filter(c => c.online).map((c, i) => (
                <div key={c.id} className="flex items-center gap-3 py-2.5 animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon to-green-800 flex items-center justify-center text-xs font-bold text-background">
                      {c.avatar}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background"
                      style={{ background: "hsl(var(--online))" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs" style={{ color: "hsl(var(--neon))" }}>{c.status}</p>
                  </div>
                  <button className="text-muted-foreground hover:text-neon transition-colors">
                    <Icon name="MessageCircle" size={17} />
                  </button>
                </div>
              ))}
            </div>
            <div className="px-4 py-1 mt-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Не в сети</p>
              {CONTACTS.filter(c => !c.online).map((c, i) => (
                <div key={c.id} className="flex items-center gap-3 py-2.5 animate-fade-in" style={{ animationDelay: `${(i + 3) * 40}ms` }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: "hsl(var(--surface-raised))", color: "hsl(var(--text-secondary))" }}>
                    {c.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{c.name}</p>
                    <p className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>{c.status}</p>
                  </div>
                  <button className="text-muted-foreground hover:text-neon transition-colors">
                    <Icon name="MessageCircle" size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {tab === "profile" && (
          <div className="animate-fade-in">
            <div className="relative h-32"
              style={{ background: "linear-gradient(135deg, hsl(145 40% 10%), hsl(160 30% 7%))" }}>
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(145 60% 40%) 0%, transparent 60%)" }} />
              <button className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
                <Icon name="Camera" size={18} />
              </button>
            </div>
            <div className="px-4 -mt-10 mb-4 flex items-end justify-between">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-background bg-gradient-to-br from-neon to-green-700 flex items-center justify-center text-2xl font-bold text-background">
                  ВЛ
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-background"
                  style={{ background: "hsl(var(--online))" }} />
              </div>
              <button className="px-4 py-1.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: "hsl(var(--surface-raised))", border: "1px solid hsl(var(--border))" }}>
                Изменить
              </button>
            </div>
            <div className="px-4 mb-4">
              <h2 className="text-xl font-bold font-display">Владимир Лунный</h2>
              <p className="text-sm text-muted-foreground mt-0.5">@vladimir_lunar</p>
              <p className="text-sm mt-2 leading-relaxed">Люблю кино, музыку и ночные просмотры с друзьями 🎬🎵</p>
            </div>
            <div className="mx-4 mb-4 grid grid-cols-3 gap-2">
              {[
                { label: "Чатов", val: "47" },
                { label: "Просмотрено", val: "183" },
                { label: "Треков", val: "1.2K" },
              ].map(s => (
                <div key={s.label} className="rounded-2xl p-3 text-center"
                  style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                  <p className="text-lg font-bold font-display neon-text">{s.val}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mx-4 p-3 rounded-2xl flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, hsl(40 80% 10%), hsl(40 60% 8%))", border: "1px solid hsl(40 60% 20%)" }}>
              <Icon name="Crown" size={20} style={{ color: "hsl(40 90% 60%)" }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: "hsl(40 90% 65%)" }}>Verdi Premium</p>
                <p className="text-xs text-muted-foreground">4K видео · Безлимитное облако · Эксклюзивные стикеры</p>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab === "settings" && (
          <div className="animate-fade-in p-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl mb-4"
              style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon to-green-700 flex items-center justify-center text-base font-bold text-background shrink-0">
                ВЛ
              </div>
              <div>
                <p className="font-semibold">Владимир Лунный</p>
                <p className="text-xs text-muted-foreground">@vladimir_lunar · Premium</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {SETTINGS_SECTIONS.map((s, i) => (
                <button
                  key={s.label}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl transition-colors animate-fade-in text-left"
                  style={{
                    background: "hsl(var(--surface))",
                    border: s.premium ? "1px solid hsl(40 60% 20%)" : "1px solid hsl(var(--border))",
                    animationDelay: `${i * 35}ms`
                  }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: s.premium ? "hsl(40 60% 12%)" : "hsl(var(--surface-raised))" }}>
                    <Icon name={s.icon} size={17}
                      style={{ color: s.premium ? "hsl(40 90% 60%)" : "hsl(var(--neon))" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: s.premium ? "hsl(40 90% 65%)" : undefined }}>
                      {s.label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{s.desc}</p>
                  </div>
                  <Icon name="ChevronRight" size={15} className="text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4 pb-2">Verdi v1.0.0 β · 2026</p>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="glass border-t border-border shrink-0 pb-6 pt-2 px-2 z-20">
        <div className="flex items-center justify-around">
          {TABS.map(t => {
            const active = tab === t.key && !openChat;
            return (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setOpenChat(null); setShowPlayer(false); }}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${active ? "tab-active" : "text-muted-foreground"}`}
              >
                <div className="relative">
                  <Icon name={t.icon} size={22} />
                  {t.key === "chats" && !active && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-neon" />
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
