FROM node:8.7.0-alpine

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 80 for node, and 5858 or 9229 for debug
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT

# check every 30s to ensure this service returns HTTP 200
RUN apk add --update curl && \
    rm -rf /var/cache/apk/*
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD curl -f http://localhost:${PORT}/healthz || exit 

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /server
COPY . /server
RUN yarn install

# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
CMD [ "node", "index.js" ]