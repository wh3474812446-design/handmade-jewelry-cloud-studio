# 由 云工作室原型.html 生成适合 claude.ai Artifact 的版本：去掉外部字体、压缩空白与注释
import re, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
h = open('云工作室原型.html').read()
h = re.sub(r'<link rel="preconnect"[^>]*>', '', h); h = re.sub(r'<link href="https://fonts.googleapis.com[^>]*>', '', h)
css = h[h.index('<style>') + 7:h.index('</style>')]
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S); css = re.sub(r'\s*\n\s*', '\n', css); css = re.sub(r'\s*([{};,])\s*', r'\1', css).replace('\n', '')
js = h[h.index('<script>') + 8:h.rindex('</script>')]
js = '\n'.join(s.strip() for s in js.split('\n') if s.strip() and not s.strip().startswith('//'))
out = h[:h.index('<style>') + 7] + css + h[h.index('</style>'):h.index('<script>') + 8] + js + h[h.rindex('</script>'):]
os.makedirs('artifact', exist_ok=True)
open('artifact/云工作室原型-artifact.html', 'w').write(out)
print('artifact/云工作室原型-artifact.html', len(out.encode()), 'bytes')
