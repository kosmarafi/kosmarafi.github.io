set +e
mkdir -p /tmp/o && cd /tmp/o
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36"
for u in https://www.orca.so/ https://www.orca.so/portfolio; do curl -sL -A "$UA" "$u" >> page.html; done
grep -oE '/_next/static/[^"\\ ?]+\.js' page.html | sort -u > js.txt
i=0; while read p; do i=$((i+1)); curl -sL -A "$UA" "https://www.orca.so$p" -o f$i.js; done < js.txt
python3 - <<'PY'
import re,glob
for f in glob.glob('f*.js'):
    s=open(f,encoding='utf-8',errors='ignore').read()
    for pat in [r'MinFeesOwedA',r'NextValidExecution',r'conditions',r'crankReward',r'MinFees',r'Usd',r'minimumUsd',r'threshold']:
        for m in list(re.finditer(pat,s))[:6]:
            if pat in('Usd','threshold','conditions') and 'utomation' not in s[max(0,m.start()-3000):m.start()+3000]: continue
            print("\n#####",f,pat,m.start()); print(s[max(0,m.start()-400):m.start()+500])
PY
