export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();
  const tokenCookie = useCookie('token');

  console.log('[Middleware] Token di cookie:', tokenCookie.value);
  console.log('[Middleware] Token di store:', auth.token);

  // Jika token ada di cookie dan tidak ada di store, login ulang menggunakan token cookie
  if (tokenCookie.value && !auth.token) {
    console.log('[Middleware] Token di cookie ditemukan, login ulang...');
    auth.login(tokenCookie.value);
  }

  // Jika token di store tidak ada, tetapi token cookie hilang, lakukan logout
  if (!tokenCookie.value && auth.token) {
    console.log('[Middleware] Token cookie hilang, logout...');
    auth.logout();
  }

  // Mengecek apakah token telah kadaluarsa
  if (auth.user?.exp && Date.now() / 1000 > auth.user.exp) {
    console.log('[Middleware] Token expired, logout...');
    auth.logout();
  }

  const isLoggedIn = !!auth.token;
  const publicRoutes = ['/auth', '/auth/callback', '/auth/forgot-password', '/api/auth/callback','/api/auth/google']

  // Jika user sudah login dan mencoba mengakses halaman login, redirect ke dashboard
  if (to.path === '/auth' && isLoggedIn) {
    console.log('[Middleware] Sudah login, redirect ke dashboard');
    return navigateTo('/dashboard');
  }

  // Jika mencoba mengakses halaman yang memerlukan login tapi belum login, redirect ke halaman login
  if (!publicRoutes.includes(to.path) && !isLoggedIn) {
    console.log('[Middleware] Belum login, redirect ke login');
    return navigateTo('/auth');
  }
});
