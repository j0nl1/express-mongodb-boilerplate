#  -------- Builder --------
# Use 'alpine' variant due to its reduced size
FROM node:10-alpine as builder

# Install dependencies
WORKDIR /builder-folder
COPY package*.json /builder-folder/
RUN npm install

# Copy project
COPY . /builder-folder
RUN npm run build

# -------- END builder --------
# Use 'alpine' variant due to its reduced size
FROM node:10-alpine

# Copy files
WORKDIR /express-boilerplate
COPY --from=builder /builder-folder/dist /express-boilerplate
COPY --from=builder /builder-folder/package*.json /express-boilerplate/

# Dependencies
ENV NODE_ENV=production
RUN npm install

# Execute
CMD npm run start:prod

# Port exposing
EXPOSE 3000
