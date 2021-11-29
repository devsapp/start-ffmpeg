FROM ubuntu:18.04

# set sources
RUN sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list
RUN apt-get clean
RUN apt-get update -yq

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
  --fix-missing

# install nodejs and chrome
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get update
RUN apt-get install -yq nodejs google-chrome-stable

# set UTF-8 and Lang (current Lang is zh_CN)
RUN apt-get install -yq ttf-wqy-microhei ttf-wqy-zenhei
RUN locale-gen zh_CN.UTF-8 \
  && dpkg-reconfigure locales
RUN locale-gen zh_CN.UTF-8

# install ffmpeg and pulseaudio
RUN apt-get install -y pulseaudio alsa-utils ffmpeg

WORKDIR /code

RUN export PUPPETEER_SKIP_DOWNLOAD='true'
RUN npm install puppeteer-core \
  express \
  ali-oss \
  --registry http://registry.npm.taobao.org

# set time zone (current is Shanghai, China)
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

ENV LANG zh_CN.UTF-8
ENV LANGUAGE zh_CN:zh
ENV LC_ALL zh_CN.UTF-8

# set Xvfb auth file
ENV XAUTHORITY=/tmp/Xauthority

WORKDIR /code

COPY ./kill_zoombie.sh ./kill_zoombie.sh
COPY ./record.sh ./record.sh
COPY ./record.js ./record.js
COPY ./server.js ./server.js
COPY ./agent.sh ./agent.sh

RUN mkdir -p /var/output

# ENTRYPOINT ["/code/start.sh"]

EXPOSE 9000

ENTRYPOINT ["/code/agent.sh"]