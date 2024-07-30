#!/bin/bash
systemctl stop bps-backend.service
rm /root/bps/jars/bps-backend.jar
mv -i /root/bps/bps-backend.jar /root/bps/jars/bps-backend.jar
systemctl start bps-backend.service