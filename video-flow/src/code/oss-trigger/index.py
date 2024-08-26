# -*- coding: utf-8 -*-
import os
import json
import re
import logging
import oss2

from aliyunsdkcore.client import AcsClient
from aliyunsdkfnf.request.v20190315 import StartExecutionRequest
from aliyunsdkcore.acs_exception.exceptions import ServerException
from aliyunsdkcore.auth.credentials import StsTokenCredential

LOGGER = logging.getLogger()

OUTPUT_DST = os.environ["OUTPUT_DST"]
FLOW_NAME = os.environ["FLOW_NAME"]
SEG_INTERVAL = os.environ["SEG_INTERVAL"]
DST_FORMATS = os.environ["DST_FORMATS"]

def check_video_key(object_key, oss_bucket_name, context):
    if object_key.endswith('/'):
        LOGGER.info("object_key {} is a directory".format(object_key))
        return False
    
    creds = context.credentials
    auth = oss2.StsAuth(creds.accessKeyId, creds.accessKeySecret, creds.securityToken)
    oss_client = oss2.Bucket(auth, 'oss-%s-internal.aliyuncs.com' % context.region, oss_bucket_name)
    exist = oss_client.object_exists(object_key)
    if not exist:
        LOGGER.info("object_key {} does not exist".format(object_key))
        return False
    return True

def handler(event, context):
    evt = json.loads(event)
    evt = evt["events"]
    oss_bucket_name = evt[0]["oss"]["bucket"]["name"]
    object_key = evt[0]["oss"]["object"]["key"]
    creds = context.credentials

    if not check_video_key(object_key, oss_bucket_name, context):
        return 
    
    sts_token_credential = StsTokenCredential(creds.access_key_id, creds.access_key_secret, creds.security_token)
    client = AcsClient(region_id=context.region, credential=sts_token_credential)
    
    dst_formats = DST_FORMATS.split(",")
    dst_formats = [i.strip() for i in dst_formats]

    input = {
        "oss_bucket_name": oss_bucket_name,
        "video_key": object_key,
        "output_prefix": OUTPUT_DST,
        "segment_time_seconds": int(SEG_INTERVAL),
        "dst_formats": dst_formats
    }
    
    try:
        request = StartExecutionRequest.StartExecutionRequest()
        request.set_FlowName(FLOW_NAME)
        request.set_Input(json.dumps(input))
        execution_name = re.sub(
            r"[^a-zA-Z0-9-_]", "_", object_key) + "-" + context.request_id
        request.set_ExecutionName(execution_name)
        return client.do_action_with_exception(request)
    except ServerException as e:
        LOGGER.info(e.get_request_id())
    
    return "ok"
