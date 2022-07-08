FROM aliyunfc/headless-ffmpeg:base

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

COPY ./record.sh ./record.sh
COPY ./record.js ./record.js
COPY ./server.js ./server.js
COPY ./agent.sh ./agent.sh

RUN mkdir -p /var/output

EXPOSE 9000

ENTRYPOINT ["/code/agent.sh"]