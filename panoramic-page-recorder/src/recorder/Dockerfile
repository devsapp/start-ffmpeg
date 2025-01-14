FROM ubuntu:18.04
# if in china, you can use:
# FROM docker.m.daocloud.io/ubuntu:18.04

RUN apt-get clean
RUN apt-get update -yq

# install ffmpeg and pulseaudio
RUN apt-get install -y pulseaudio alsa-utils ffmpeg

# install basic environment
# if there is too much installation at one time, there will be a chance of failure
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get install -yq tzdata \
  wget \
  git \
  xvfb \
  x11vnc \
  lsof \
  socat \
  curl \
  locales \
  libx11-xcb1 \
  libxrandr2 \
  libasound2 \
  libpangocairo-1.0-0 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libnss3 \
  libxss1 \
  ttf-wqy-microhei  \
  ttf-wqy-zenhei \
  --fix-missing

# install nodejs and chrome
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get update
RUN apt-get install -yq nodejs google-chrome-stable

# set time zone (current is Shanghai, China)
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

# set UTF-8 and Lang (current Lang is zh_CN)
RUN locale-gen zh_CN.UTF-8 && dpkg-reconfigure locales
ENV LANG zh_CN.UTF-8
ENV LANGUAGE zh_CN:zh
ENV LC_ALL zh_CN.UTF-8
# set Xvfb auth file
ENV XAUTHORITY=/tmp/Xauthority

WORKDIR /recorder

ENV PUPPETEER_SKIP_DOWNLOAD=true

COPY record.sh record.js server.js package.json package-lock.json ./
RUN npm install puppeteer-core \
  express \
  ali-oss \
  fs  \
  --registry https://registry.npmmirror.com

RUN mkdir -p /var/output

EXPOSE 9000

ENTRYPOINT ["node", "server.js"]