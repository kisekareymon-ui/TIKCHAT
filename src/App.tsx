import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, MessageCircle, Share2, Bookmark, Search, 
  Bell, User, Mic, Send, Play, Pause, Video, Phone, ArrowLeft 
} from 'lucide-react';

// --- DUMMY DATA ---
const POSTS = [
  { id: 1, user: 'cyber_vibe', desc: 'Late night coding sessions 💻', tags: '#react #coding', music: 'Lofi Girl - Night Drive', likes: '12.4k' },
  { id: 2, user: 'neon_rider', desc: 'Tokyo by night is something else.', tags: '#travel #neon', music: 'Synthwave 1984', likes: '89k' },
];

const MESSAGES = [
  { id: 1, name: 'Alex Rivera', lastMsg: '🎤 Voice note (0:12)', time: '2m', unread: 2, online: true },
  { id: 2, name: 'Sarah Chen', lastMsg: 'See you at the show!', time: '1h', unread: 0, online: false },
];

export default function VoxTok() {
  const [activeTab, setActiveTab] = useState('feed');
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);

  // --- RENDER HELPERS ---
  
  const RenderFeed = () => (
    <div className="h-full w-full snap-y snap-mandatory overflow-y-scroll bg-black no-scrollbar">
      {POSTS.map((post) => (
        <div key={post.id} className="h-screen w-full snap-start relative flex flex-col justify-end pb-24 p-4">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
          
          {/* Right Side Actions */}
          <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center z-10 text-white">
            <div className="flex flex-col items-center">
              <motion.div whileTap={{ scale: 1.5 }}><Heart size={32} fill="#6c63ff" color="#6c63ff" /></motion.div>
              <span className="text-xs mt-1 font-bold">{post.likes}</span>
            </div>
            <MessageCircle size={32} />
            <Bookmark size={32} />
            <Share2 size={32} />
          </div>

          {/* Info Area */}
          <div className="relative z-10 space-y-2 text-white">
            <h3 className="font-bold text-lg italic">@{post.user}</h3>
            <p className="text-sm opacity-90">{post.desc} <span className="font-bold text-[#6c63ff]">{post.tags}</span></p>
            <div className="flex items-center gap-2 text-xs overflow-hidden w-40">
              <div className="animate-marquee whitespace-nowrap">🎵 {post.music} — {post.music}</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="absolute bottom-16 left-0 h-1 bg-white/20 w-full">
            <div className="h-full bg-[#6c63ff] w-1/3 purple-glow" />
          </div>
        </div>
      ))}
    </div>
  );

  const RenderChat = ({ chat }: { chat: any }) => (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-[#08080f] flex flex-col text-white"
    >
      {/* Chat Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/10 glass-panel">
        <div className="flex items-center gap-3">
          <ArrowLeft className="cursor-pointer" onClick={() => setCurrentChat(null)} />
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
          </div>
          <div>
            <h4 className="font-bold">{chat.name}</h4>
            <p className="text-[10px] text-green-400">Online</p>
          </div>
        </div>
        <div className="flex gap-4 opacity-70">
          <Video size={20} /> <Phone size={20} />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
        <div className="flex justify-start">
          <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none max-w-[80%] text-sm">
            Hey! Did you see the new VoxTok update?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-gradient-to-r from-[#6c63ff] to-[#4b45b2] p-3 rounded-2xl rounded-br-none max-w-[80%]">
            <div className="flex items-center gap-3">
              <Play size={16} fill="white" />
              <div className="flex gap-1 items-center h-4">
                {[2, 4, 8, 5, 9, 3, 6].map((h, i) => (
                  <div key={i} className="w-1 bg-white/40 rounded-full" style={{ height: `${h*2}px` }} />
                ))}
              </div>
              <span className="text-[10px]">0:12</span>
            </div>
          </div>
        </div>
        <div className="text-right text-[10px] opacity-40">Seen 10:42 PM ✓✓</div>
      </div>

      {/* Input Bar */}
      <div className="p-4 glass-panel flex items-center gap-3">
        <div className="flex-1 bg-white/5 rounded-full px-4 py-2 flex items-center">
          <input className="bg-transparent border-none outline-none text-sm w-full text-white" placeholder="Type a message..." />
        </div>
        <motion.button 
          onPointerDown={() => setIsRecording(true)}
          onPointerUp={() => setIsRecording(false)}
          onMouseLeave={() => setIsRecording(false)}
          whileTap={{ scale: 1.2 }}
          className={`p-4 rounded-full ${isRecording ? 'bg-red-500' : 'bg-[#6c63ff]'} purple-glow text-white`}
        >
          {isRecording ? <div className="animate-ping"><Mic size={20} /></div> : <Mic size={20} />}
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-md mx-auto h-screen relative flex flex-col shadow-2xl overflow-hidden border-x border-white/10 bg-[#08080f] text-white">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative z-10">
        {activeTab === 'feed' && <RenderFeed />}
        {activeTab === 'messages' && (
          <div className="p-4 space-y-6 h-full overflow-y-auto no-scrollbar">
            <h2 className="text-2xl font-bold">Messages</h2>
            {/* Stories Row */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex-shrink-0 p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                  <div className="w-14 h-14 rounded-full bg-black border-2 border-black overflow-hidden">
                    <div className="w-full h-full bg-indigo-900" />
                  </div>
                </div>
              ))}
            </div>
            {/* Chat List */}
            <div className="space-y-4">
              {MESSAGES.map(chat => (
                <div key={chat.id} onClick={() => setCurrentChat(chat)} className="flex items-center gap-4 p-2 active:bg-white/5 transition rounded-xl cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-400">
                    {chat.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold">{chat.name}</h4>
                      <span className="text-[10px] opacity-40">{chat.time}</span>
                    </div>
                    <p className="text-sm opacity-60 line-clamp-1">{chat.lastMsg}</p>
                  </div>
                  {chat.unread > 0 && <div className="bg-[#6c63ff] text-white text-[10px] px-2 py-1 rounded-full flex-shrink-0">{chat.unread}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <div className="h-20 glass-panel border-t border-white/10 flex items-center justify-around px-2 z-40 relative">
        <NavIcon icon={<Play />} label="Feed" active={activeTab === 'feed'} onClick={() => setActiveTab('feed')} />
        <NavIcon icon={<Search />} label="Explore" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
        <NavIcon icon={<MessageCircle />} label="Chats" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
        <NavIcon icon={<Bell />} label="Alerts" active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} />
        <NavIcon icon={<User />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {currentChat && <RenderChat chat={currentChat} />}
      </AnimatePresence>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: { icon: React.ReactElement, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-[#6c63ff] scale-110' : 'text-white/40'}`}>
      {React.cloneElement(icon, { size: 24, fill: active ? '#6c63ff' : 'transparent' })}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
