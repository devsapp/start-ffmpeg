#!/bin/bash
set -e

record_time=$1
buff=5
(( node_time_out=record_time+buff ))

# start pulseaudio service
# pulseaudio -D --exit-idle-time=-1
# pacmd load-module module-virtual-sink sink_name=v1
# pacmd set-default-sink v1
# pacmd set-default-source v1.monitor

# start xvfb screen
xvfb-run --listen-tcp --server-num=76 --server-arg="-screen 0 1080x720x24" --auth-file=$XAUTHORITY  nohup node record.js $node_time_out >/tmp/chrome.log $2 2>&1 &

echo "wait until xvfb success ...."
# wait until xvfb success
for i in {1..5}
do
  count=`ps -ef | grep xvfb |  grep -v "grep" | wc -l`
  if [ $count -gt 0 ]; then
    sleep 2
    echo  "xvfb is ready!"
    break
  else
    sleep 1
  fi
done

## ffmpeg 必须先于 xvfb 退出
echo  "ffmpeg start recording ..."
nohup ffmpeg -y -f x11grab  -video_size 1080x720 -i :76 -f alsa -ac 2 -i default  /var/output/test.mp4  > /tmp/ffmpeg.log 2>&1 &

sleep $record_time
echo  "record finished!!!"

# # 清理本次 shell 脚本启动的所有进程(包含 background)
ps -efww|grep -w 'ffmpeg'| grep -v grep | cut -c 9-15 | xargs kill -15
sleep 10
ps -efww|grep -w 'chrome'| grep -v grep | cut -c 9-15 | xargs kill -15
ps -efww|grep -w 'record.js'| grep -v grep | cut -c 9-15 | xargs kill -15
sleep 1
ps -efww|grep -w 'Xvfb'| grep -v grep | cut -c 9-15 | xargs kill -15
sleep 1
ps -efww|grep -w 'xvfb-run'| grep -v grep | cut -c 9-15 | xargs kill -15

# sleep 1
# trap "exit" INT TERM
# trap "kill 0" EXIT

sleep 3

# ps -efww|grep -w 'defunct'| grep -v grep | cut -c 9-15 | xargs kill -9

echo  "record worker exited!!!"
