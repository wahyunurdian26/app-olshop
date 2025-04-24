import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { email: string; exp?: number },
    token: null as string | null
  }),

  actions: {
    login(token: string) {
      const router = useRouter();
      try {
        console.log('[AuthStore] Login dengan token:', token);
      
        const decoded = jwtDecode(token) as any;
        console.log('[AuthStore] JWT decoded:', decoded);
    
        // Periksa apakah 'exp' ada dalam token dan valid
        const now = Date.now() / 1000;  // Waktu saat ini dalam detik
        if (decoded.exp && decoded.exp < now) {
          console.log('[AuthStore] Token expired, logging out...');
          this.logout();
          return;
        }
      
        this.user = {
          email: decoded.email,
          exp: decoded.exp
        };
        this.token = token;
        console.log('[AuthStore] Token setelah login:', token);
        // Simpan token di cookie
        const tokenCookie = useCookie('token', {
          maxAge: 60 * 60 * 24 * 7, // 7 hari
          secure: process.env.NODE_ENV === 'production', // Hanya untuk produksi
          sameSite: 'strict',
        });
        tokenCookie.value = token; // Menyimpan token di cookie
      
        // Redirect ke dashboard setelah login berhasil
        router.push('/dashboard');
      } catch (error) {
        console.error('[AuthStore] Gagal decode JWT:', error);
      }
    }
,    

    logout() {
      this.user = null;
      this.token = null;

      // Hapus cookie token
      const tokenCookie = useCookie('token');
      tokenCookie.value = null;

      // Arahkan ke halaman login setelah logout
      const router = useRouter();
      router.push('/auth');
    }
  },

  persist: true,  // Menyimpan state di localStorage atau sessionStorage
});
