import { useAuthStore } from '~/store/auth';
import { removeLastSlash } from '~/utils/strings';

interface ProtectedRouteInterface {
  path?: string;
  regex?: RegExp;
  redirect: string;
}

const protectedRoutes: Array<ProtectedRouteInterface> = [
  // { path: '/portal', redirect: '/' },
  // { path: '/planet/introdus', redirect: '/' },
  // { path: '/planet/amalin', redirect: '/' },
  // { path: '/planet/trios', redirect: '/' },
  // { path: '/planet/opushop', redirect: '/' },
];

/**
 * Redirect user to landing page if not logged in and trying to access protected routes
 */
export default defineNuxtRouteMiddleware(to => {
  const { ENV } = useRuntimeConfig();
  if (ENV === 'development') {
    return;
  }

  const authStore = useAuthStore();
  const decodedUrl = removeLastSlash(decodeURI(to.path));

  for (const protectedRoute of protectedRoutes) {
    if ((!protectedRoute.path && !protectedRoute.regex) || !protectedRoute.redirect) {
      continue;
    }

    if (
      ((protectedRoute.regex && protectedRoute.regex.test(decodedUrl)) ||
        decodedUrl === protectedRoute.path) &&
      !authStore.allowedEntry
    ) {
      return navigateTo('/', { redirectCode: 301 });
    }
  }
});
