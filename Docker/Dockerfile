From node:14.21.3
RUN git clone https://github.com/hamzarauf360/npmcodecoveragetest.git
RUN cd npmcodecoveragetest && git checkout docker-ci
WORKDIR npmcodecoveragetest
RUN npm install
RUN npm run build
CMD ["node","lib/index.js"]
