#!/bin/sh

TARGET="HEIC"

while (( $# > 0 ))
do
  case $1 in
    -heic)
      TARGET="HEIC"
      ;;
    -png)
      TARGET="png"
      ;;
    -*)
      echo "invalid option"
      exit 1
      ;;
  esac
  shift
done

echo "target:" $TARGET

SCRIPT_DIR=$(dirname $0)
cd $SCRIPT_DIR

if [ $TARGET = "HEIC" ] ; then
  mogrify -format jpg +dither -quality 85 -resize 1200x *.HEIC
elif [ $TARGET = "png" ] ; then
  mogrify +dither -format jpg -quality 85 -resize 1200x *.png
else
  echo "ERROR : invalid target"
  exit 1
fi
exit

