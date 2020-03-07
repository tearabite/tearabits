FROM node:10

# Copy source
COPY . /tearabits/

# Expose port 3000
EXPOSE 8080

WORKDIR /tearabits
RUN npm i

CMD cd /tearabits && npm start