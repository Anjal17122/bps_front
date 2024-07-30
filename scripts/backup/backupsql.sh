#!/bin/bash
PANAUTIDIR=/home/ubuntu/mysqlbackups/digi-panauti/
VILLANEPALDIR=/home/ubuntu/mysqlbackups/villanepal/
SAMADRISTIDIR=/home/ubuntu/mysqlbackups/samadristi/
BPSTESTDIR=/home/ubuntu/mysqlbackups/bpstest_db/
ALLDBSDIR=/home/ubuntu/mysqlbackups/all_dbs/
PASSWORD=#2121RootAddOnMyPaswrd

# create backups directory if it doesn't exist
[ -d $PANAUTIDIR ] || mkdir -p $PANAUTIDIR
[ -d $VILLANEPALDIR ] || mkdir -p $VILLANEPALDIR
[ -d $SAMADRISTIDIR ] || mkdir -p $SAMADRISTIDIR
[ -d $BPSTESTDIR ] || mkdir -p $BPSTESTDIR
[ -d $ALLDBSDIR ] || mkdir -p $ALLDBSDIR

# backup each database into it's own file to facilitate discrete restoration:

# for (( i=0; i<${#DBLIST[@]}; i++ ))
# do
    echo "starting dump of digi-panauti..."
    mysqldump -u root --password=$PASSWORD digitization_panauti_db > $PANAUTIDIR/$(date +%Y%m%d)digi_panauti.sql
    echo "done dumping digipanauti"

    echo "starting dump of villanepal rms_db..."
    mysqldump -u root --password=$PASSWORD rms_db > $VILLANEPALDIR/$(date +%Y%m%d)villanepal.sql
    echo "done dumping villanepal rms_db"

    echo "starting dump of samadristi samadristi_db..."
    mysqldump -u root --password=$PASSWORD samadristi_db > $SAMADRISTIDIR/$(date +%Y%m%d)samadristi.sql
    echo "done dumping samadristi samadristi_db"

    echo "starting dump of bpstest bpstest_db..."
    mysqldump -u root --password=$PASSWORD bpstest_db > $BPSTESTDIR/$(date +%Y%m%d)bpstest.sql
    echo "done dumping bpstest bpstest_db"

    echo "starting dump of bpstest alldbs..."
    mysqldump -u root --password=$PASSWORD --all-databases > $ALLDBSDIR/$(date +%Y%m%d)all_dbs.sql
    echo "completed all backups"

# gzip the sql files in-place to save space
# gzip -f $PANAUTIDIR/*.sql
# gzip -f $VILLANEPALDIR/*.sql
# gzip -f $SAMADRISTIDIR/*.sql
# gzip -f $BPSTESTDIR/*.sql
# gzip -f $ALLDBSDIR/*.sql
  
# echo "syncing backup to s3"
# sudo aws s3 sync /home/ubuntu/mysqlbackups s3://db-backup-addon/
# echo "syncing complete"

# done
# IFS=$SAVEIFS

# delete sql files older than 7 days

# find $PANAUTIDIR -type f -mtime +300 -name '*.gz' -execdir rm -- '{}' \;
# find $VILLANEPALDIR -type f -mtime +300 -name '*.gz' -execdir rm -- '{}' \;
# find $SAMADRISTIDIR -type f -mtime +300 -name '*.gz' -execdir rm -- '{}' \;
# find $PANAUTIDIR -type f -mtime +300 -name '*.gz' -execdir rm -- '{}' \;
# find $PANAUTIDIR -type f -mtime +300 -name '*.gz' -execdir rm -- '{}' \;

mysqldump -u root bps_gokarna_db > /root/$(date +%Y%m%d)bps_gokarna_db.sql