set +e
mkdir -p /tmp/o && cd /tmp/o
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36"
for u in https://www.orca.so/ https://www.orca.so/portfolio; do curl -sL -A "$UA" "$u" >> page.html; done
grep -oE '/_next/static/[^"\\ ?]+\.js' page.html | sort -u > js.txt
i=0; while read p; do i=$((i+1)); curl -sL -A "$UA" "https://www.orca.so$p" -o f$i.js; done < js.txt
F=$(grep -l "MinFeesOwedA" f*.js | head -1); echo "FILE $F $(wc -c < $F)"
python3 - "$F" <<'PY'
import sys,re
s=open(sys.argv[1],encoding='utf-8',errors='ignore').read()
seen=set()
for pat in [r'getProgramDerivedAddress',r'"automation"',r'automation',r'[dD]elegate',r'approve',r'ApproveChecked',r'positionAuthority',r'seeds']:
    for m in re.finditer(pat,s):
        a=max(0,m.start()-500);
        if any(abs(a-x)<400 for x in seen): continue
        seen.add(a)
        print("\n#####",pat,m.start()); print(s[a:m.start()+700])
PY
