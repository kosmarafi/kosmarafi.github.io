set +e
mkdir -p /tmp/o && cd /tmp/o
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36"
for u in https://www.orca.so/ https://www.orca.so/portfolio https://www.orca.so/pools; do curl -sL -A "$UA" "$u" >> page.html; done
wc -c page.html
grep -oE '(src|href)="[^"]+\.js[^"]*"' page.html | sed -E 's/^(src|href)="//;s/"$//' | sort -u > js.txt
grep -oE '/_next/static/[^"\\ ]+\.js' page.html | sort -u >> js.txt
grep -oE '/assets/[^"\\ ]+\.js' page.html | sort -u >> js.txt
sort -u js.txt -o js.txt; wc -l js.txt; head -5 js.txt
i=0; while read p; do case "$p" in http*) url="$p";; //*) url="https:$p";; *) url="https://www.orca.so$p";; esac; i=$((i+1)); curl -sL -A "$UA" "$url" -o f$i.js; done < js.txt
# second level: chunk names referenced inside js
grep -ohE '"static/chunks/[^"]+\.js"' f*.js | tr -d '"' | sort -u > more.txt; wc -l more.txt
grep -ohE 'assets/[A-Za-z0-9_.-]+\.js' f*.js | sort -u >> more.txt
j=1000; while read p; do j=$((j+1)); curl -sL -A "$UA" "https://www.orca.so/${p#/}" -o f$j.js; [ -s f$j.js ] || curl -sL -A "$UA" "https://www.orca.so/_next/$p" -o f$j.js; done < more.txt
ls | wc -l; du -sh .
grep -l "wpAutoU2" f*.js
for f in $(grep -l "wpAutoU2" f*.js); do echo "=== $f"; grep -oE '.{0,1500}wpAutoU2.{0,1500}' $f | head -3; done
for f in $(grep -lE 'automation' f*.js | head -20); do echo "=== AUTO $f"; grep -oE '.{0,300}"automation".{0,300}' $f | head -5; done
