<h1 align="center">Tempat</h1>

This website is not just a pretty face, it is a technological marvel, built using NextJS, that leverages its pre-built functions such as server-side rendering and API routes, to make it a speed demon. The design is not just pleasing to the eye, it is a work of art, styled with TailwindCSS, that makes it the envy of all other websites.

For the deployment, I host it on a DigitalOcean's virtual private server, Droplet, and implemented an NGINX reverse proxy to redirect users when accessing the site from port 80/443 to 3000, where the application runs. This ensures a seamless and secure user experience, that is second to none.

Security-wise I applied an SSL certificate with NGINX that has been issued by Cloudflare, providing an extra layer of security for the users. And let's not forget the integration of a Continuous Deployment pipeline using Github Action, that will automatically push the latest changes in the main branch and trigger the build on the VPS, making the deployment process faster and more efficient.

# Features

#### 1. Home page with search bar

- The searchbar will query to the DB onChange and debounced for 500ms

#### 2. Login

- Login with your own email or through google account

#### 3. Restaurant detail

#### 4. Restaurant Search

#### 5. Rate the Restaurant with Image Upload

#### 6. Bookmark your favorite Restaurant

<br/>
