import { makeAutoObservable, runInAction } from 'mobx';

class UserStore {
  user = null;
  isAuthenticated = false;
  isLoading = false;
  error = null;

  dropHistory = {
    totalDropsParticipated: 1,
    lastDropDate: null,
    missedLastDrop: false,
    totalRewardsEarned: 0,
    participatedDrops: [],
  };

  currentDrop = {
    phase: 'coming_soon',
    isParticipating: false,
    walletConnected: false,
    isVerified: false,
    hasClaimedReward: false,
    rewards: { trx: 10, percentage: 10 },
  };


  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
    this.loadUserDropData();
  }

  setLoading = (loading) => {
    this.isLoading = loading;
  };

  setError = (error) => {
    this.error = error;
  };

  setUser = (userData) => {
    this.user = userData;
    this.isAuthenticated = true;
    this.loadUserDropData();
  };

  login = async (email, password) => {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await fetch(`${this.API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Помилка входу');
      }

      const { access_token } = await response.json();
      localStorage.setItem('authToken', access_token);

      // Отримуємо дані користувача (можливо, вам потрібен додатковий запит до API)
      this.setUser({
        email,
        name: email.split('@')[0], // Моковане ім'я
        id: Date.now(), // Тимчасовий ID
      });

      return true;
    } catch (error) {
      this.setError(error.message);
      return false;
    } finally {
      this.setLoading(false);
    }
  };

  register = async (email, password) => {
    this.setLoading(true);
    try {
      const response = await fetch(`${this.API_BASE_URL}/create-reg`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) return true;
      throw new Error((await response.json()).message || 'Помилка реєстрації');
    } catch (error) {
      this.setError(error.message);
      return false;
    } finally {
      this.setLoading(false);
    }
  };

  verifyRegistration = async (email, code) => {
    this.setLoading(true);
    try {
      const response = await fetch(`${this.API_BASE_URL}/verif-reg`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (response.status === 204) return true;
      throw new Error((await response.json()).message || 'Помилка коду');
    } catch (error) {
      this.setError(error.message);
      return false;
    } finally {
      this.setLoading(false);
    }
  };

  logout = async () => {
    try {
      await fetch(`${this.API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Помилка виходу:', error);
    } finally {
      localStorage.removeItem('authToken');
      this.isAuthenticated = false;
      this.user = null;
    }
  };

  checkAuth = () => {
    const token = localStorage.getItem('authToken');
    this.isAuthenticated = !!token;
    return this.isAuthenticated;
  };

  loadUserDropData = () => {
    if (!this.user) return;
    const savedData = localStorage.getItem(`drop_data_${this.user.id}`);
    if (savedData) {
      const data = JSON.parse(savedData);
      this.dropHistory = { ...this.dropHistory, ...data.dropHistory };
      this.currentDrop = { ...this.currentDrop, ...data.currentDrop };
    }
  };

  saveUserDropData = () => {
    if (!this.user) return;
    localStorage.setItem(
      `drop_data_${this.user.id}`,
      JSON.stringify({
        dropHistory: this.dropHistory,
        currentDrop: this.currentDrop,
      })
    );
  };

  setDropPhase = (phase) => {
    runInAction(() => {
      this.currentDrop.phase = phase;
      this.saveUserDropData();
    });
  };

  setWalletConnected = (connected) => {
    runInAction(() => {
      this.currentDrop.walletConnected = connected;
      if (connected) this.currentDrop.isParticipating = true;
      this.saveUserDropData();
    });
  };

  setVerified(verified) {
    runInAction(() => {
      this.currentDrop.isVerified = verified;
      this.saveUserDropData();
    });
  }

  setRewards(trx, percentage) {
    runInAction(() => {
      this.currentDrop.rewards.trx = trx;
      this.currentDrop.rewards.percentage = percentage;
      this.saveUserDropData();
    });
  }

  claimReward() {
    runInAction(() => {
      this.currentDrop.hasClaimedReward = true;
      this.dropHistory.totalRewardsEarned += this.currentDrop.rewards.trx;
      this.saveUserDropData();
    });
  }

  // Додатковий метод для скидання стану отримання винагороди
  resetClaimedReward() {
    runInAction(() => {
      this.currentDrop.hasClaimedReward = false;
      this.saveUserDropData();
    });
  }

  // Для роботи з історією дропів
  addDropToHistory(dropData) {
    runInAction(() => {
      const newDrop = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        participated: dropData.participated || false,
        rewards: dropData.rewards || { trx: 0, percentage: 0 },
        phase: dropData.phase || 'complete'
      };

      this.dropHistory.participatedDrops.push(newDrop);

      if (newDrop.participated) {
        this.dropHistory.totalDropsParticipated++;
        this.dropHistory.lastDropDate = newDrop.date;
        this.dropHistory.missedLastDrop = false;
      } else {
        this.dropHistory.missedLastDrop = true;
      }

      this.saveUserDropData();
    });
  }

  completeDrop(participated = true) {
    const dropData = {
      participated,
      rewards: this.currentDrop.rewards,
      phase: 'complete'
    };

    this.addDropToHistory(dropData);

    runInAction(() => {
      // Позначаємо, що дроп завершено
      this.currentDrop.phase = 'complete';
      this.saveUserDropData();
    });
  }

  // Метод для початку нового дропа (Для тесту)
  startNewDrop() {
    runInAction(() => {
      this.currentDrop = {
        phase: 'coming_soon',
        isParticipating: false,
        walletConnected: false,
        isVerified: false,
        hasClaimedReward: false,
        rewards: { trx: 0, percentage: 0 }
      };
      this.saveUserDropData();
    });
  }


  // Геттери для зручного доступу до даних(не всі юзав)
  get userName() {
    return this.user?.name || '';
  }

  get userEmail() {
    return this.user?.email || '';
  }

  get hasParticipatedInDrops() {
    return this.dropHistory.totalDropsParticipated > 0;
  }

  get missedLastDrop() {
    return this.dropHistory.missedLastDrop;
  }

  get isFirstTimeDrop() {
    return this.dropHistory.totalDropsParticipated === 0;
  }

  get currentDropPhase() {
    return this.currentDrop.phase;
  }

  get isCurrentlyParticipating() {
    return this.currentDrop.isParticipating;
  }

  get totalEarnings() {
    return this.dropHistory.totalRewardsEarned;
  }

  get lastDropDate() {
    return this.dropHistory.lastDropDate;
  }

  // Геттер для визначення типу інтерфейсу(для тесту)
  get dropUIType() {
    if (this.isFirstTimeDrop) {
      return 'first_time'; // Перший раз
    } else if (this.missedLastDrop) {
      return 'missed_last'; // Пропустив останній
    } else {
      return 'regular'; // Звичайний учасник
    }
  }

  // Helper method to get current progress without auto-syncing
  getCurrentDropProgress() {
    if (this.currentDrop.hasClaimedReward) {
      return 'complete';
    } else if (this.currentDrop.isVerified) {
      return 'rewarding';
    } else if (this.currentDrop.walletConnected) {
      return 'verification';
    } else if (this.currentDrop.isParticipating) {
      return 'wallet_connection';
    } else {
      return 'coming_soon';
    }
  }
}

const userStore = new UserStore();
export default userStore;