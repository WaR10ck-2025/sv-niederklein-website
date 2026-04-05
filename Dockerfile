# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

ENV NODE_OPTIONS="--max_old_space_size=512"

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Token wird zur Build-Zeit injiziert und von Vite ins JS-Bundle eingebettet
ARG VITE_FUSSBALL_API_TOKEN
ENV VITE_FUSSBALL_API_TOKEN=$VITE_FUSSBALL_API_TOKEN
ARG VITE_WEB3FORMS_KEY
ENV VITE_WEB3FORMS_KEY=$VITE_WEB3FORMS_KEY
RUN npx vite build

# ─── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:alpine AS runner

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/app.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
