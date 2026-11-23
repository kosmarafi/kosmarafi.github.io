set +e
mkdir -p /tmp/o/hits && cd /tmp/o
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36"
for u in https://www.orca.so/ https://www.orca.so/portfolio; do curl -sL -A "$UA" "$u" >> page.html; done
grep -oE '/_next/static/[^"\\ ?]+\.js' page.html | sort -u > js.txt
i=0; while read p; do i=$((i+1)); curl -sL -A "$UA" "https://www.orca.so$p" -o f$i.js; done < js.txt
W=$(ls f*.js | xargs grep -l 'static/chunks/' | head -3); echo "runtime candidates $W"
# webpack runtime: find files with chunk map pattern
for f in f*.js; do if grep -q '"static/chunks/"' $f; then echo RUNTIME $f; cp $f hits/runtime.js; fi; done
for f in $(grep -l "wpAutoU2\|MinFeesOwedA" f*.js); do cp $f hits/; done
ls -la hits
