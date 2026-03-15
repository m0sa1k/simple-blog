export {auth as proxy} from '@/auth';

export const config = {
  matcher: ["/blog/create", "/blog/:path/edit"],
};
// matcher: [
//   "/((?!api|_next/static|_next/image|favicon.ico).*)",
// ],