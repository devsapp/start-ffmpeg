# -*- coding: utf-8 -*-
import logging
import subprocess
import os
import oss2
import json


def handler(event, context):
    logger = logging.getLogger()
    # clear /tmp
    os.system("cd /tmp && rm -rf *")
    evt = json.loads(event)
    # for example, input_path = "rtmp://101.200.48.101:1935/stream/example"
    input_path = evt["rtmp_url"]
    transcoded_filepath = "/tmp/%Y%m%d%H%M%S.jpg"
    cmd = [
        "ffmpeg", "-y", "-i", input_path, "-f", "image2", "-r", "1",
        "-strftime", "1", transcoded_filepath
    ]
    try:
        subprocess.run(cmd,
                       stdout=subprocess.PIPE,
                       stderr=subprocess.PIPE,
                       check=True)
    except subprocess.CalledProcessError as exc:
        raise Exception(context.request_id +
                        " rtmp snapshot failure, detail: " + str(exc))

    bucketName = evt['bucket']
    region = evt.get('region', context.region)
    endpoint = 'http://oss-{}.aliyuncs.com'.format(region)
    if region == context.region:
        endpoint = 'http://oss-{}-internal.aliyuncs.com'.format(region)
    creds = context.credentials
    auth = oss2.StsAuth(creds.access_key_id,
                        creds.access_key_secret, creds.security_token)
    bucket = oss2.Bucket(auth, endpoint, bucketName)

    logger.info('upload pictures to OSS ...')
    dst = evt.get('dst', '')
    for filename in os.listdir("/tmp"):  # /tmp 目录下面都是生成的 jpg 图片
        bucket.put_object_from_file(os.path.join(
            dst, filename),  "/tmp/{}".format(filename))

    return 'SUCC'
