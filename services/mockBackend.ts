import { User, Game, Reward, Activity, GameResult } from '../types';

// Mock Data
const MOCK_USER: User = {
  id: 'u1',
  name: 'Rajesh Kumar',
  memberId: 'ACME-1234',
  points: 1250,
  gamesPlayed: 15,
  wins: 8,
  streak: 5,
  tier: 'Gold',
};

const MOCK_GAMES: Game[] = [
  {
    id: 'g1',
    title: 'Lucky Spin Wheel',
    type: 'spin',
    description: 'Spin the wheel of fortune and win amazing prizes!',
    playsLeft: 3,
    maxPrize: 500,
    cost: 'Free',
    isNew: true,
    isPopular: true,
    thumbnailColor: 'bg-purple-500',
    icon: 'wheel'
  },
  {
    id: 'g2',
    title: 'Mega Slots',
    type: 'slot',
    description: 'Match symbols to win big rewards.',
    playsLeft: 5,
    maxPrize: 1000,
    cost: 50,
    thumbnailColor: 'bg-pink-500',
    icon: 'slot'
  },
  {
    id: 'g3',
    title: 'Scratch & Win',
    type: 'scratch',
    description: 'Reveal your hidden prize instantly.',
    playsLeft: 2,
    maxPrize: 100,
    cost: 'Free',
    thumbnailColor: 'bg-yellow-400',
    icon: 'ticket'
  }
];

const MOCK_REWARDS: Reward[] = [
  { id: 'r1', title: 'Amazon Gift Card', value: '₹100', code: 'AMZN-XK9P-2LQ4', expiry: 'Dec 31, 2025', type: 'voucher', status: 'active' },
  { id: 'r2', title: '500 Reward Points', value: '500 pts', expiry: 'No expiration', type: 'points', status: 'active' },
  { id: 'r3', title: 'Flipkart Voucher', value: '₹500', code: 'FLIP-9922-XKLL', expiry: 'Nov 20, 2024', type: 'voucher', status: 'used' },
];

const MOCK_ACTIVITY: Activity[] = [
  { id: 'a1', gameId: 'g1', gameTitle: 'Lucky Spin Wheel', timestamp: '2:30 PM', status: 'won', reward: '+500 points' },
  { id: 'a2', gameId: 'g2', gameTitle: 'Mega Slots', timestamp: '1:15 PM', status: 'loss' },
  { id: 'a3', gameId: 'g3', gameTitle: 'Scratch & Win', timestamp: '10:45 AM', status: 'won', reward: '₹100 Voucher' },
];

// Service Functions
export const BackendService = {
  getUserProfile: async (): Promise<User> => {
    return new Promise((resolve) => setTimeout(() => resolve({ ...MOCK_USER }), 500));
  },

  getGames: async (): Promise<Game[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...MOCK_GAMES]), 500));
  },

  getRewards: async (): Promise<Reward[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...MOCK_REWARDS]), 500));
  },

  getActivityHistory: async (): Promise<Activity[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...MOCK_ACTIVITY]), 500));
  },

  /**
   * Simulates playing a game.
   * In a real app, this would send a POST request to the server.
   * The server calculates the result securely and returns it.
   */
  playGame: async (gameId: string): Promise<GameResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isWin = Math.random() > 0.5; // 50% chance to win for demo
        
        if (!isWin) {
            // Loss Scenario
            let loseConfig = {};
            if (gameId === 'g1') loseConfig = { segmentIndex: 5 }; // 'Better Luck' segment
            if (gameId === 'g2') loseConfig = { symbols: ['🍒', '🍋', '🍇'] }; // Mismatched

            resolve({
                won: false,
                prizeAmount: 0,
                prizeType: 'none',
                prizeLabel: 'Better Luck Next Time',
                config: loseConfig
            });
        } else {
            // Win Scenario
            let winConfig = {};
            let prize = 0;
            let label = '';

            if (gameId === 'g1') {
                // Spin Wheel logic (Mock)
                // Segments: 0: 500pts, 1: Voucher, 2: 250pts, 3: Better Luck, 4: 250pts, 5: 500pts ... 
                // Let's say index 0 is the big win
                winConfig = { segmentIndex: 0 }; 
                prize = 500;
                label = '500 Points';
            } else if (gameId === 'g2') {
                // Slots logic
                winConfig = { symbols: ['💎', '💎', '💎'] };
                prize = 1000;
                label = '1000 Points';
            } else {
                // Scratch logic
                prize = 100;
                label = '₹100 Voucher';
            }

            resolve({
                won: true,
                prizeAmount: prize,
                prizeType: prize > 0 ? 'points' : 'voucher', // Simplified
                prizeLabel: label,
                config: winConfig
            });
        }
      }, 1000); // Network delay
    });
  }
};
