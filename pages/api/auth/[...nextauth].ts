import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_SERVER_USER,
      async sendVerificationRequest(params) {
        const { identifier, url, provider, theme } = params;
        const { host } = new URL(url);
        // NOTE: You are not required to use `nodemailer`, use whatever you want.
        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Hi, we recieved for your request! Please verify yourself to continue single sign on`,
          text: text({ url, host }),
          html: html({ url, host, theme }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
    // ...add more providers here
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_PUBLIC_SECRET,
};

function html(params: { url: string; host: string; theme: any }) {
  const { url, host, theme } = params;

  // const escapedHost = host.replace(/\./g, "&#8203;.");

  // const brandColor = theme.brandColor || "#346df1";
  // const color = {
  //   background: "#f9f9f9",
  //   text: "#444",
  //   mainBackground: "#fff",
  //   buttonBackground: brandColor,
  //   buttonBorder: brandColor,
  //   buttonText: theme.buttonText || "#fff",
  // };

  //   return `
  // <body style="background: ${color.background};">
  //   <table width="100%" border="0" cellspacing="20" cellpadding="0"
  //     style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
  //     <tr>
  //       <td align="center"
  //         style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
  //         Sign in to <strong>${escapedHost}</strong>
  //       </td>
  //     </tr>
  //     <tr>
  //       <td align="center" style="padding: 20px 0;">
  //         <table border="0" cellspacing="0" cellpadding="0">
  //           <tr>
  //             <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
  //                 target="_blank"
  //                 style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
  //                 in</a></td>
  //           </tr>
  //         </table>
  //       </td>
  //     </tr>
  //     <tr>
  //       <td align="center"
  //         style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
  //         If you did not request this email you can safely ignore it.
  //       </td>
  //     </tr>
  //   </table>
  // </body>
  // `;

  return `
<body style="background: white;">
<table width="100%" border="0" cellspacing="20" cellpadding="0"
  style="max-width: 600px; margin: auto; border-radius: 10px;">
  <tr>
    <td align="center"
      style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif;">
      Sign in to Nomato
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px 0;">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="border-radius: 5px;" bgcolor="#952525"><a href="${url}"
              target="_blank"
              style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: white; text-decoration: none; border-radius: 5px; padding: 10px 20px; display: inline-block; font-weight: bold;">Masuk</a></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td align="center"
      style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif;">
      Jika ini bukan kamu, segera periksa keamanan emailmu!
    </td>
  </tr>
</table>
</body>
`;
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

export default NextAuth(authOptions);
