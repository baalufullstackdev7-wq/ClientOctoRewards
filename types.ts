export interface User {
  id: string;
  name: string;
  memberId: string;
  points: number;
  gamesPlayed: number;
  wins: number;
  streak: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
}

export interface Game {
  id: string;
  title: string;
  type: 'spin' | 'slot' | 'scratch';
  description: string;
  playsLeft: number;
  maxPrize: number;
  cost: number | 'Free';
  isNew?: boolean;
  isPopular?: boolean;
  isLocked?: boolean;
  thumbnailColor: string; // Helper for UI visualization
  icon: string;
}

export interface Reward {
  id: string;
  title: string;
  value: string; // e.g., "₹100" or "500 pts"
  code?: string;
  expiry: string;
  type: 'voucher' | 'points';
  status: 'active' | 'used' | 'expired';
}

export interface Activity {
  id: string;
  gameId: string;
  gameTitle: string;
  timestamp: string;
  status: 'won' | 'loss';
  reward?: string;
}

export interface GameResult {
  won: boolean;
  prizeAmount: number;
  prizeType: 'points' | 'voucher' | 'none';
  prizeLabel: string;
  // Game specific configuration for animation
  config?: {
    segmentIndex?: number; // For Spin Wheel
    symbols?: string[];    // For Slots
  };
}
