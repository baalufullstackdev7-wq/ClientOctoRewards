import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { BackendService } from './services/mockBackend';
import { User, Game, Reward, Activity, GameResult } from './types';
import SpinWheel from './components/SpinWheel';
import SlotMachine from './components/SlotMachine';
import ScratchCard from './components/ScratchCard';

// Icons
import { ChevronLeft, Info, Wallet, Trophy, Clock, CheckCircle, Lock, PlayCircle, Star, Coins, Gift, Gamepad2, User as UserIcon } from 'lucide-react';

// Views
const HomeView = ({ user, games, onViewChange }: any) => {
  const activeCampaign = "Diwali Festival Fest";

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-b-[2.5rem] text-white shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-start mb-6 z-10 relative">
           <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                  <Star className="text-yellow-300 fill-current" size={24} />
              </div>
              <div>
                  <h1 className="text-lg font-bold">ACME Rewards</h1>
                  <p className="text-xs text-blue-100">Welcome back, {user?.name.split(' ')[0]}</p>
              </div>
           </div>
           <div className="bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center space-x-2">
              <Coins size={16} className="text-yellow-300" />
              <span className="font-bold">{user?.points.toLocaleString()}</span>
           </div>
        </div>

        {/* Campaign Banner */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-md relative z-10">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-blue-200 uppercase tracking-wider mb-1">Active Campaign</p>
                    <h2 className="text-xl font-bold mb-1">{activeCampaign}</h2>
                    <p className="text-sm text-blue-100">Play daily for bonus rewards</p>
                </div>
            </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-20 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
      </div>

      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg">Play & Win</h3>
            <button onClick={() => onViewChange('games')} className="text-blue-600 text-sm font-medium flex items-center">
                View All <ChevronLeft size={16} className="rotate-180 ml-1" />
            </button>
        </div>
        
        <div className="space-y-4">
            {games.slice(0, 3).map((game: Game) => (
                <div key={game.id} onClick={() => onViewChange('game-detail', game.id)} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 active:scale-95 transition-transform cursor-pointer">
                    <div className={`w-16 h-16 rounded-xl ${game.thumbnailColor} flex items-center justify-center text-white shadow-inner`}>
                         {/* Simple Icon placeholder */}
                         {game.icon === 'wheel' && <span className="text-2xl">🎡</span>}
                         {game.icon === 'slot' && <span className="text-2xl">🎰</span>}
                         {game.icon === 'ticket' && <span className="text-2xl">🎫</span>}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-gray-800">{game.title}</h4>
                            {game.isNew && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{game.description}</p>
                        <div className="flex items-center mt-2 space-x-3">
                            <span className="text-green-600 text-xs font-semibold flex items-center">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                {game.playsLeft} plays left
                            </span>
                            {typeof game.maxPrize === 'number' && (
                                <span className="text-amber-600 text-xs font-medium flex items-center">
                                    <Trophy size={10} className="mr-1" /> Up to {game.maxPrize} pts
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="text-gray-300">
                        <ChevronLeft size={20} className="rotate-180" />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const GamesView = ({ games, onViewChange }: any) => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Games</h1>
            <div className="flex space-x-2 overflow-x-auto pb-4 no-scrollbar">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md whitespace-nowrap">All Games</button>
                <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">Available</button>
                <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">Locked</button>
            </div>

            <div className="mt-2 space-y-4">
                 <h2 className="flex items-center text-sm font-bold text-gray-700">
                    <span className="text-lg mr-2">🎯</span> Available Now
                 </h2>
                 <div className="grid grid-cols-1 gap-4">
                     {games.map((game: Game) => (
                         <div key={game.id} className="bg-white rounded-2xl p-0 overflow-hidden shadow-md border border-gray-100" onClick={() => onViewChange('game-detail', game.id)}>
                             <div className={`h-32 ${game.thumbnailColor} bg-opacity-90 flex items-center justify-center relative`}>
                                 <div className="absolute top-4 left-4 flex space-x-2">
                                     {game.isNew && <span className="bg-white text-blue-600 text-[10px] font-bold px-2 py-1 rounded shadow-sm">NEW</span>}
                                     {game.isPopular && <span className="bg-white text-purple-600 text-[10px] font-bold px-2 py-1 rounded shadow-sm">POPULAR</span>}
                                 </div>
                                 <span className="text-5xl drop-shadow-md">
                                     {game.icon === 'wheel' ? '🎡' : game.icon === 'slot' ? '🎰' : '🎫'}
                                 </span>
                             </div>
                             <div className="p-4">
                                 <h3 className="text-lg font-bold text-gray-900">{game.title}</h3>
                                 <p className="text-sm text-gray-500 mt-1 mb-3">{game.description}</p>
                                 <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                                     <div className="text-center">
                                         <p className="font-bold text-gray-900">{game.playsLeft}</p>
                                         <p className="text-[10px] text-gray-400 uppercase">Plays Left</p>
                                     </div>
                                     <div className="text-center border-l border-r border-gray-100 px-4">
                                         <p className="font-bold text-gray-900">{game.maxPrize}</p>
                                         <p className="text-[10px] text-gray-400 uppercase">Max Prize</p>
                                     </div>
                                     <div className="text-center">
                                         <p className="font-bold text-gray-900">{game.cost}</p>
                                         <p className="text-[10px] text-gray-400 uppercase">Cost</p>
                                     </div>
                                 </div>
                                 <div className="mt-4 flex justify-between items-center">
                                     <span className="text-green-600 text-sm font-medium flex items-center">
                                         <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                         Ready to play
                                     </span>
                                     <button className="bg-blue-600 text-white text-sm font-bold px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition">
                                         PLAY NOW
                                     </button>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
}

const GameDetailView = ({ gameId, games, onBack, onPlay }: any) => {
    const game = games.find((g: Game) => g.id === gameId);
    if (!game) return null;

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-4 flex items-center sticky top-0 bg-white z-10">
                <button onClick={onBack} className="bg-gray-100 p-2 rounded-lg mr-4">
                    <ChevronLeft className="text-gray-700" size={20} />
                </button>
                <h1 className="text-lg font-bold text-gray-900">{game.title}</h1>
            </div>

            <div className={`h-64 ${game.thumbnailColor} flex items-center justify-center relative shrink-0`}>
                 <div className="absolute top-4 left-4 flex space-x-2">
                     {game.isNew && <span className="bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded">NEW</span>}
                     {game.isPopular && <span className="bg-white text-purple-600 text-xs font-bold px-3 py-1 rounded">POPULAR</span>}
                 </div>
                 <span className="text-8xl drop-shadow-2xl animate-pulse">
                     {game.icon === 'wheel' ? '🎡' : game.icon === 'slot' ? '🎰' : '🎫'}
                 </span>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <h3 className="flex items-center text-gray-900 font-bold mb-2">
                        <Info size={18} className="text-blue-500 mr-2" /> How It Works
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {game.description} Each game gives you a chance to win points, vouchers, or special rewards. 
                        Outcomes are determined randomly.
                    </p>
                </div>

                <div>
                    <h3 className="flex items-center text-gray-900 font-bold mb-3">
                        <Gift size={18} className="text-pink-500 mr-2" /> Possible Rewards
                    </h3>
                    <div className="space-y-3">
                        <div className="border border-gray-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
                            <div className="flex items-center space-x-3">
                                <div className="bg-yellow-100 p-2 rounded-full"><Coins size={16} className="text-yellow-600"/></div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">250 Points</p>
                                    <p className="text-xs text-gray-500">Instant credit</p>
                                </div>
                            </div>
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">40%</span>
                        </div>
                        <div className="border border-gray-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
                             <div className="flex items-center space-x-3">
                                <div className="bg-blue-100 p-2 rounded-full"><Trophy size={16} className="text-blue-600"/></div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">500 Points</p>
                                    <p className="text-xs text-gray-500">Double reward</p>
                                </div>
                            </div>
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">25%</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="flex items-center text-gray-900 font-bold mb-3">
                        <CheckCircle size={18} className="text-green-500 mr-2" /> Your Status
                    </h3>
                     <div className="space-y-3">
                         <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center">
                             <div className="bg-white p-1 rounded-md mr-3 text-green-600"><CheckCircle size={16}/></div>
                             <p className="text-green-800 text-sm font-medium">You're eligible to play this game</p>
                         </div>
                         <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center">
                             <div className="bg-white p-1 rounded-md mr-3 text-purple-600"><Gamepad2 size={16}/></div>
                             <p className="text-green-800 text-sm font-medium">{game.playsLeft} plays remaining today</p>
                         </div>
                     </div>
                </div>

                 <div>
                    <h3 className="flex items-center text-gray-900 font-bold mb-3">
                        <Info size={18} className="text-blue-500 mr-2" /> Game Limits
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="border border-gray-200 rounded-lg p-3 text-center">
                            <p className="text-blue-600 font-bold text-lg">3</p>
                            <p className="text-[10px] text-gray-500 uppercase">Plays Per Day</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3 text-center">
                            <p className="text-blue-600 font-bold text-lg">{game.cost}</p>
                            <p className="text-[10px] text-gray-500 uppercase">Cost to Play</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3 text-center">
                            <p className="text-blue-600 font-bold text-lg">{game.maxPrize}</p>
                            <p className="text-[10px] text-gray-500 uppercase">Max Prize</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3 text-center">
                            <p className="text-blue-600 font-bold text-lg">All</p>
                            <p className="text-[10px] text-gray-500 uppercase">Tier Required</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0">
                <button onClick={() => onPlay(gameId)} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-all text-lg uppercase tracking-wide">
                    Start Playing
                </button>
            </div>
        </div>
    );
}

const PlayGameView = ({ gameId, games, onBack, onComplete, user }: any) => {
    const game = games.find((g: Game) => g.id === gameId);
    const [isPlaying, setIsPlaying] = useState(false);
    const [result, setResult] = useState<GameResult | null>(null);

    const handlePlay = async () => {
        if (isPlaying || result) return;
        setIsPlaying(true);
        
        // Fetch Result from Mock Backend
        const res = await BackendService.playGame(gameId);
        setResult(res);
    };

    const handleAnimationComplete = () => {
        setIsPlaying(false);
        setTimeout(() => {
            if (result) onComplete(result);
        }, 1000);
    };

    if (!game) return null;

    return (
        <div className="flex flex-col h-screen bg-blue-500 text-white">
            <div className="p-4 flex items-center justify-between">
                <button onClick={onBack} className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                     <ChevronLeft size={20} />
                </button>
                <h1 className="font-bold text-lg">{game.title}</h1>
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                   🎮 {game.playsLeft} plays left
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Game Components */}
                {game.type === 'spin' && (
                    <SpinWheel 
                        isSpinning={isPlaying} 
                        result={result} 
                        onSpinComplete={handleAnimationComplete} 
                    />
                )}
                
                {game.type === 'slot' && (
                    <SlotMachine
                        isSpinning={isPlaying}
                        result={result}
                        onSpinComplete={handleAnimationComplete}
                    />
                )}

                {game.type === 'scratch' && (
                    <ScratchCard
                        isPlaying={isPlaying}
                        result={result}
                        onRevealComplete={handleAnimationComplete}
                    />
                )}

                {/* Controls */}
                <div className="mt-8 w-full max-w-xs px-4 relative z-10">
                    <button 
                        onClick={handlePlay}
                        disabled={isPlaying || result !== null}
                        className={`w-full bg-white text-blue-600 font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition-all ${isPlaying || result !== null ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                    >
                         {isPlaying ? (
                             <span>Playing...</span>
                         ) : (
                             <>
                                {game.type === 'spin' && <PlayCircle size={24} />}
                                <span>{game.type === 'spin' ? 'SPIN THE WHEEL' : game.type === 'slot' ? 'SPIN SLOTS' : 'START SCRATCHING'}</span>
                             </>
                         )}
                    </button>
                    <p className="text-center text-blue-100 text-sm mt-4">
                        Tap the button to {game.type === 'scratch' ? 'start' : 'spin'} and win amazing prizes!
                    </p>
                </div>
            </div>
            
            {/* Recent Winners Ticker (Static Mock) */}
            <div className="bg-black/20 p-2 text-xs text-white/80 whitespace-nowrap overflow-hidden">
                <div className="animate-marquee inline-block">
                   🏆 @user123 won 500 points &nbsp;&bull;&nbsp; 🏆 @player456 won ₹100 Voucher &nbsp;&bull;&nbsp; 🏆 @winner99 won 250 points
                </div>
            </div>
        </div>
    );
};

const ResultModal = ({ result, onPlayAgain, onHome }: any) => {
    if (!result) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className={`w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl transform transition-all scale-100 ${result.won ? 'bg-white' : 'bg-white'}`}>
                
                {result.won ? (
                    <>
                        <div className="bg-green-400 h-32 absolute top-0 left-0 right-0 rounded-t-3xl -z-10 overflow-hidden">
                            {/* Confetti CSS would go here, simplified with simple elements */}
                            <div className="absolute top-4 left-10 w-2 h-2 bg-yellow-300 rounded-full"></div>
                            <div className="absolute top-10 right-20 w-3 h-3 bg-blue-300 rotate-45"></div>
                             <div className="flex justify-center mt-4">
                                <span className="bg-white/90 text-green-700 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">🎉 Winner!</span>
                            </div>
                        </div>
                        
                        <div className="mt-12 mb-4 relative">
                             <div className="w-24 h-24 bg-yellow-400 mx-auto rounded-lg shadow-lg flex items-center justify-center text-5xl relative z-10">
                                🎁
                                {/* Ribbon CSS simulation */}
                                <div className="absolute inset-0 border-4 border-red-500/20 rounded-lg"></div>
                                <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-red-500 -translate-x-1/2"></div>
                                <div className="absolute left-0 right-0 top-1/2 h-4 bg-red-500 -translate-y-1/2"></div>
                             </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900">Congratulations!</h2>
                        <h1 className="text-4xl font-black text-green-500 my-2 uppercase">YOU WON</h1>
                        <p className="text-gray-500 text-sm px-4 mb-6">Amazing! Your spin was lucky. The {result.prizeType} has been added to your account.</p>

                        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-6">
                             <div className="flex flex-col items-center">
                                 <div className="bg-yellow-400 p-2 rounded-full mb-2 shadow-sm">
                                    <Coins className="text-white" />
                                 </div>
                                 <p className="text-sm font-bold text-green-800">Reward Earned</p>
                                 <p className="text-4xl font-bold text-green-600 my-1">{result.prizeAmount}</p>
                                 <p className="text-xs text-green-600">{result.prizeType === 'points' ? 'Bonus Points' : 'Voucher Value'}</p>
                             </div>
                        </div>
                        
                        <button className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-green-700 mb-3" onClick={onHome}>
                            CLAIM REWARD
                        </button>
                        <button className="w-full bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-200 mb-4" onClick={onPlayAgain}>
                            PLAY AGAIN (2 LEFT)
                        </button>
                    </>
                ) : (
                    <>
                         <div className="bg-orange-500 h-32 absolute top-0 left-0 right-0 rounded-t-3xl -z-10 overflow-hidden">
                             <div className="flex justify-center mt-6">
                                <span className="bg-white/90 text-orange-700 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Try Again</span>
                            </div>
                             {/* Decorative circles */}
                             <div className="absolute top-2 left-4 w-16 h-16 bg-white/10 rounded-full"></div>
                             <div className="absolute bottom-4 right-10 w-20 h-20 bg-white/10 rounded-full"></div>
                        </div>

                        <div className="mt-12 mb-4 relative">
                             <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 mx-auto rounded-full shadow-lg flex items-center justify-center text-5xl relative z-10 border-4 border-white">
                                🥲
                             </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-6">Better Luck Next Time!</h2>
                        <p className="text-gray-500 text-sm px-4 my-4">Don't worry! You still have more chances to play. Keep spinning and your luck will turn around!</p>

                        <div className="bg-yellow-50 border border-yellow-200 border-dashed rounded-xl p-4 mb-6">
                            <p className="text-yellow-800 text-xs font-semibold">💡 Tip: Come back tomorrow for fresh chances and explore other games!</p>
                        </div>
                        
                        <div className="flex space-x-3 mb-6">
                            <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100">
                                <p className="text-blue-600 font-bold text-xl">2</p>
                                <p className="text-[10px] text-gray-400">Plays Left Today</p>
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100">
                                <p className="text-blue-600 font-bold text-xl">5</p>
                                <p className="text-[10px] text-gray-400">Other Games</p>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-blue-700 mb-3" onClick={onPlayAgain}>
                            TRY AGAIN
                        </button>
                        <button className="w-full bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-200" onClick={onHome}>
                            EXPLORE OTHER GAMES
                        </button>
                    </>
                )}
                 <button onClick={onHome} className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600">
                    Back to Games
                 </button>
            </div>
        </div>
    );
};

const RewardsView = ({ rewards }: any) => {
    return (
        <div className="p-6">
             <h1 className="text-2xl font-bold text-gray-900 mb-4">My Rewards</h1>
             
             <div className="flex border-b border-gray-200 mb-6">
                 <button className="flex-1 py-2 text-blue-600 border-b-2 border-blue-600 font-bold text-sm">Active</button>
                 <button className="flex-1 py-2 text-gray-400 font-medium text-sm">Used</button>
                 <button className="flex-1 py-2 text-gray-400 font-medium text-sm">Expired</button>
             </div>

             {/* Summary Card */}
             <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl mb-6">
                 <p className="text-blue-100 text-sm font-medium">Total Active Value</p>
                 <h2 className="text-4xl font-bold mt-1 mb-4">₹650</h2>
                 <div className="h-px bg-white/20 mb-4"></div>
                 <div className="flex justify-between text-center">
                     <div>
                         <p className="text-xl font-bold">3</p>
                         <p className="text-[10px] text-blue-100">Active Rewards</p>
                     </div>
                     <div>
                         <p className="text-xl font-bold">1,750</p>
                         <p className="text-[10px] text-blue-100">Points Balance</p>
                     </div>
                     <div>
                         <p className="text-xl font-bold">8</p>
                         <p className="text-[10px] text-blue-100">Total Earned</p>
                     </div>
                 </div>
             </div>

             <div className="space-y-4">
                 {rewards.map((reward: Reward) => (
                     <div key={reward.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                         <div className="flex items-start space-x-4">
                             <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${reward.type === 'points' ? 'bg-blue-100' : 'bg-orange-100'}`}>
                                 {reward.type === 'points' ? <Coins className="text-blue-600" /> : <Gift className="text-orange-600" />}
                             </div>
                             <div className="flex-1">
                                 <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">{reward.type === 'points' ? 'Bonus Points' : 'Gift Voucher'}</p>
                                 <h3 className="font-bold text-gray-900 text-lg">{reward.title}</h3>
                                 <p className="text-gray-500 text-sm">{reward.value} value</p>
                                 
                                 {reward.code && (
                                     <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-2 mt-3 flex justify-between items-center">
                                         <code className="text-gray-800 font-mono text-sm font-bold">{reward.code}</code>
                                         <span className="text-xs text-gray-400">📋</span>
                                     </div>
                                 )}
                             </div>
                         </div>
                         <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                             <div className="flex items-center text-xs text-gray-400">
                                 <Clock size={12} className="mr-1" /> Expires {reward.expiry}
                             </div>
                             {reward.type === 'voucher' ? (
                                 <button className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700">Use Now</button>
                             ) : (
                                 <button className="bg-gray-100 text-gray-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-200">View Details</button>
                             )}
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
};

const ActivityView = ({ activity }: any) => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Activity</h1>
            
            <div className="space-y-8">
                {/* Today Group */}
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Today, Nov 24</h3>
                    <div className="space-y-4">
                        {activity.map((item: Activity) => (
                             <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-lg ${item.status === 'won' ? 'bg-green-100' : 'bg-red-100'}`}>
                                            {item.gameTitle.includes('Spin') && <span className="text-xl">🎡</span>}
                                            {item.gameTitle.includes('Slot') && <span className="text-xl">🎰</span>}
                                            {item.gameTitle.includes('Scratch') && <span className="text-xl">🎫</span>}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{item.gameTitle}</h4>
                                            <div className="flex items-center space-x-2">
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.status === 'won' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {item.status === 'won' ? 'Won' : 'No Win'}
                                                </span>
                                                <span className="text-xs text-gray-400">{item.timestamp}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {item.status === 'won' && (
                                    <div className="border-t border-gray-50 pt-2 flex items-center text-green-600 font-bold text-sm">
                                        {item.reward?.includes('points') ? <Coins size={14} className="mr-1"/> : <Gift size={14} className="mr-1"/>}
                                        {item.reward}
                                    </div>
                                )}
                                {item.status === 'loss' && (
                                    <div className="border-t border-gray-50 pt-2 flex items-center text-gray-400 text-sm">
                                        <span className="mr-1">💔</span> Better luck next time
                                    </div>
                                )}
                                <div className="mt-2 text-right">
                                     <button className="text-blue-500 text-xs font-bold">Details &rarr;</button>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileView = ({ user }: any) => {
    return (
        <div className="bg-gray-50 min-h-full pb-10">
            <div className="bg-gradient-to-b from-blue-500 to-indigo-600 pt-10 pb-20 px-6 text-center text-white rounded-b-[3rem] relative shadow-lg">
                 <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full mx-auto flex items-center justify-center mb-4 border-4 border-white/30">
                     <UserIcon size={48} className="text-white" />
                 </div>
                 <h1 className="text-2xl font-bold">{user.name}</h1>
                 <p className="text-blue-200 text-sm mb-4">Member ID: {user.memberId}</p>
                 <div className="inline-flex items-center bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                     <Star size={12} className="mr-1 fill-current"/> GOLD MEMBER
                 </div>
            </div>

            <div className="px-6 -mt-12">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center mb-6">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Points Balance</p>
                    <h2 className="text-5xl font-black text-indigo-600 mb-6">{user.points.toLocaleString()}</h2>
                    
                    <div className="flex justify-between border-t border-gray-100 pt-4">
                        <div>
                            <p className="font-bold text-gray-900 text-lg">{user.gamesPlayed}</p>
                            <p className="text-[10px] text-gray-500">Games Played</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-lg">{user.wins}</p>
                            <p className="text-[10px] text-gray-500">Wins</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-lg">{user.streak}</p>
                            <p className="text-[10px] text-gray-500">Rewards</p>
                        </div>
                    </div>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Trophy size={18} className="text-amber-500 mr-2"/> Achievements
                </h3>
                <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar mb-6">
                    <div className="bg-white p-4 rounded-xl min-w-[120px] text-center border border-gray-100 shadow-sm">
                        <div className="text-2xl mb-2">🎯</div>
                        <p className="font-bold text-gray-900">10</p>
                        <p className="text-xs text-gray-500">Games Played</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl min-w-[120px] text-center border border-gray-100 shadow-sm">
                        <div className="text-2xl mb-2">🔥</div>
                        <p className="font-bold text-gray-900">5</p>
                        <p className="text-xs text-gray-500">Day Streak</p>
                    </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <UserIcon size={18} className="text-gray-500 mr-2"/> Account
                </h3>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                     <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
                         <div className="flex items-center space-x-3">
                             <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><UserIcon size={18}/></div>
                             <div className="text-left">
                                 <p className="font-bold text-gray-900 text-sm">Edit Profile</p>
                                 <p className="text-xs text-gray-500">Update your information</p>
                             </div>
                         </div>
                         <ChevronLeft size={16} className="rotate-180 text-gray-300"/>
                     </button>
                     <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
                         <div className="flex items-center space-x-3">
                             <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><Star size={18}/></div>
                             <div className="text-left">
                                 <p className="font-bold text-gray-900 text-sm">Notifications</p>
                                 <p className="text-xs text-gray-500">Manage preferences</p>
                             </div>
                         </div>
                         <ChevronLeft size={16} className="rotate-180 text-gray-300"/>
                     </button>
                </div>
            </div>
        </div>
    );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [viewState, setViewState] = useState('list'); // list, detail, play
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  
  // Data State
  const [user, setUser] = useState<User | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  
  // Game Play State
  const [lastGameResult, setLastGameResult] = useState<GameResult | null>(null);

  useEffect(() => {
    // Initial Data Fetch
    const fetchData = async () => {
        const u = await BackendService.getUserProfile();
        const g = await BackendService.getGames();
        const r = await BackendService.getRewards();
        const a = await BackendService.getActivityHistory();
        
        setUser(u);
        setGames(g);
        setRewards(r);
        setActivity(a);
    };
    fetchData();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setViewState('list');
    setSelectedGameId(null);
  };

  const handleGameViewChange = (view: string, gameId?: string) => {
      if (view === 'games') {
          setActiveTab('games');
          setViewState('list');
      } else if (view === 'game-detail' && gameId) {
          setSelectedGameId(gameId);
          setViewState('detail');
          setActiveTab('games'); // Ensure bottom nav highlights games
      }
  };

  const handleStartPlaying = (gameId: string) => {
      setViewState('play');
  };

  const handleGameComplete = (result: GameResult) => {
      setLastGameResult(result);
      // Here you would refresh user balance in background
  };

  const handleCloseResult = () => {
      setLastGameResult(null);
      setViewState('list'); // Go back to games list
  };
  
  const handlePlayAgain = () => {
      setLastGameResult(null);
      // ViewState stays 'play' but the PlayGameView component needs to reset
      // To force reset, we can toggle view or pass a key, simplified here:
      const currentGame = selectedGameId;
      setViewState('detail');
      setTimeout(() => {
         setViewState('play');
      }, 50);
  };

  if (!user) return <div className="flex h-screen items-center justify-center text-blue-600"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>;

  return (
    <>
        {/* Full Screen Play View Overlay */}
        {viewState === 'play' && selectedGameId && (
            <div className="fixed inset-0 z-50 bg-white">
                <PlayGameView 
                    gameId={selectedGameId} 
                    games={games} 
                    user={user}
                    onBack={() => setViewState('detail')} 
                    onComplete={handleGameComplete}
                />
            </div>
        )}

        {/* Result Modal Overlay */}
        {lastGameResult && (
            <ResultModal 
                result={lastGameResult} 
                onHome={handleCloseResult}
                onPlayAgain={handlePlayAgain}
            />
        )}

        {/* Main Layout */}
        <Layout activeTab={activeTab} onTabChange={handleTabChange}>
            {activeTab === 'home' && <HomeView user={user} games={games} onViewChange={handleGameViewChange} />}
            
            {activeTab === 'games' && (
                viewState === 'list' ? (
                    <GamesView games={games} onViewChange={handleGameViewChange} />
                ) : viewState === 'detail' ? (
                    <GameDetailView 
                        gameId={selectedGameId} 
                        games={games} 
                        onBack={() => setViewState('list')} 
                        onPlay={handleStartPlaying}
                    />
                ) : null
            )}

            {activeTab === 'rewards' && <RewardsView rewards={rewards} />}
            {activeTab === 'activity' && <ActivityView activity={activity} />}
            {activeTab === 'profile' && <ProfileView user={user} />}
        </Layout>
    </>
  );
}