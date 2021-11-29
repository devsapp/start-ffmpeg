#!/bin/bash
zombie_check=`ps -A -o stat,ppid,pid,cmd | grep -e '^[Zz]'`

if [ -n "$zombie_check" ];
 then
 echo "Start to handle the z0mbie!!!!!"
 for i in `ps aux |grep -w Z |grep -v grep |awk '{print $2}'`
 do
 `ps -ef |grep $i |grep defunct|awk '{print "kill -9 " $2 " "$3}'`
 done
else
 echo "There is no zombie !!!!!"
fi