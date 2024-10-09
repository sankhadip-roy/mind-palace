### Application for storing notes

<div style="display: flex; align-items: center;">
  <img src="https://github.com/user-attachments/assets/334d6efe-1ea6-4406-a37b-738a54d67f3c" alt="mind-palace" width="200" style="margin-right: 20px;">
  <p>"mind-palace": This note-storing app serves as a database to store random thoughts, ideas, and information, ensuring nothing is forgotten and can be looked up in constant time. The name is inspired by Sherlock Holmes' mind palace technique.</p>
</div>
<br>
**Interested in contributing to this repository, here Contributing 101**

> To run properly locally

> > comment out this section of the code from lib/authOptions.ts after forking or cloning

```
 session: {
        strategy: "jwt", // JWT is the default, but you can explicitly declare it
    },
    cookies: {
        sessionToken: {
            name: `__Secure-next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: true,  // Set to true in production
            },
        },
    },
```

> > load .env file

```
# .env variables

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXTAUTH_URL
NEXTAUTH_SECRET
MONGO_URI

```

```
npm ci # install from package-lock.json
npm run dev -- --hostname 0.0.0.0  # to view the application ui in smaller screens over same network
ifconfig # get the ipv4
http://<ipv4>:3000 # view here in mobile, to enable login add this to google console's javascript origins & add http://<ipv4>:3000/api/auth/callback/google to authorized redirect URIs
```

> > before commiting any changes uncomment the above commented section from lib/authOptions.ts
