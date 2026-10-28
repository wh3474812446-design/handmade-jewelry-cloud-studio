#!/bin/sh
# 把 src/ 下的小文件合并成单文件原型
cd "$(dirname "$0")"
out=云工作室原型.html
{
  echo '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
  echo '<title>云工作室 · 原型</title>'
  echo '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
  echo '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">'
  echo '<style>'; cat src/*.css; echo '</style></head><body>'
  echo '<div id="app"></div><div id="layer"></div>'
  echo '<script>'
  for f in data draw-piece draw-scene app home flow flow2 studio studio2 assets agent demo; do [ -f src/$f.js ] && cat src/$f.js && echo; done
  echo '</script></body></html>'
} > "$out"
echo "built $out ($(wc -c < "$out") bytes)"
