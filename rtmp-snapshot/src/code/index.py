# -*- coding: utf-8 -*-
import logging
import subprocess
import os
import oss2
import json

OSS_BUCKET_NAME = os.environ["OSS_BUCKET_NAME"]


def handler(event, context):
    logger = logging.getLogger()
    # clear /tmp
    os.system("cd /tmp && rm -rf *")
    evt = json.loads(event)
    # for example, input_path = "rtmp://101.200.48.101:1935/stream/example"
    input_path = evt["rtmp_url"]
    transcoded_filepath = "/tmp/%Y%m%d%H%M%S.jpg"
    cmd = [
        "/code/ffmpeg", "-y", "-i", input_path, "-f", "image2", "-r", "1",
        "-strftime", "1", transcoded_filepath
    ]
    try:
        subprocess.run(cmd,
                       stdout=subprocess.PIPE,
                       stderr=subprocess.PIPE,
                       check=True)
    except subprocess.CalledProcessError as exc:
        err_ret = {
            'request_id': context.request_id,
            'returncode': exc.returncode,
            'cmd': exc.cmd,
            'output': exc.output.decode(),
            'stderr': exc.stderr.decode(),
            'event': event,
        }
        print(json.dumps(err_ret))
        # if fail， send event to mns queue or insert in do db
        # ...
        raise Exception(context.request_id + " transcode failure")

    auth = oss2.Auth(os.environ['OSS_AK_ID'], os.environ['OSS_AK_SECRET'])
    bucket = oss2.Bucket(
        auth, 'http://oss-{}-internal.aliyuncs.com'.format(context.region),
        OSS_BUCKET_NAME)
    logger.info('upload pictures to OSS ...')
    for filename in os.listdir("/tmp"):  # /tmp 目录下面都是生成的 jpg 图片
        bucket.put_object_from_file("example/" + filename, "/tmp/" + filename)
    return 'ok'
