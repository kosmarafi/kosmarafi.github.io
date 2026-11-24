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
    if 'MinFeesOwedA' not in s: continue
    for pat in [r'[Kk]eeper',r'[Uu]nauthori[sz]ed',r'[Cc]ranker',r'[Oo]perator',r'InvalidSigner',r'ERROR__']:
        ms=list(re.finditer(pat,s))
        print("\n#####",f,pat,len(ms))
        for m in ms[:4]: print("  ..",s[max(0,m.start()-250):m.start()+250].replace("\n"," "))
PY
