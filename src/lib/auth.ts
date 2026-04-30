import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    /**
     * signIn callback: Se ejecuta al iniciar sesión.
     * Comunica con Strapi para registrar o autenticar al usuario.
     */
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        try {
          // 1. Intentar hacer login con el callback de Google en Strapi
          const strapiRes = await fetch(
            `${STRAPI_URL}/api/auth/google/callback?access_token=${account.access_token}`
          );

          if (strapiRes.ok) {
            return true;
          }

          // 2. Si el callback no funciona directamente, verificamos si el usuario existe
          //    y lo registramos si es la primera vez
          const checkUser = await fetch(
            `${STRAPI_URL}/api/users?filters[email][$eq]=${encodeURIComponent(profile.email)}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (checkUser.ok) {
            const users = await checkUser.json();
            if (users.length === 0) {
              // Registrar nuevo usuario en Strapi
              await fetch(`${STRAPI_URL}/api/auth/local/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: profile.email.split("@")[0],
                  email: profile.email,
                  password: `google_${account.providerAccountId}_${Date.now()}`,
                }),
              });
            }
          }

          return true;
        } catch (error) {
          console.error("Error comunicando con Strapi durante signIn:", error);
          // Permitir el login aunque Strapi falle — la sesión se mantiene en Next.js
          return true;
        }
      }
      return true;
    },

    /**
     * jwt callback: Enriquece el token JWT con el Strapi JWT y datos del usuario.
     */
    async jwt({ token, account, profile }) {
      // En el primer login, obtenemos el JWT de Strapi
      if (account?.provider === "google" && account.access_token) {
        try {
          const strapiRes = await fetch(
            `${STRAPI_URL}/api/auth/google/callback?access_token=${account.access_token}`
          );

          if (strapiRes.ok) {
            const data = await strapiRes.json();
            token.strapiToken = data.jwt;
            token.strapiUserId = data.user?.id;
          }
        } catch (error) {
          console.error("Error obteniendo JWT de Strapi:", error);
        }
      }

      // Guardar datos del perfil de Google
      if (profile) {
        token.name = profile.name;
        token.email = profile.email;
        token.picture = profile.picture as string;
      }

      return token;
    },

    /**
     * session callback: Expone datos en la sesión del cliente.
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.strapiUserId as string;
        session.user.image = token.picture as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }

      // Adjuntar el Strapi JWT a la sesión para usarlo en requests autenticados
      (session as any).strapiToken = token.strapiToken;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
