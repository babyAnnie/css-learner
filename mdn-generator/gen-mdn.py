from urllib import request
import os
import re
import json
from pathlib import Path
from bs4 import BeautifulSoup

url_prefix = "https://developer.mozilla.org"
partern = re.compile("<.+?>")
ptBlank = re.compile("\s{2,}")
ptTrueBlank = re.compile(" {2,}")
os.mkdir("temp")


def fetchResources(url, v):
    p = Path("temp/%s.html" % v)
    if p.exists():
        return p.read_text()

    print("downloading " + p.name)
    url = url_prefix + url
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:101.0) Gecko/20100101 Firefox/101.0"
    }
    req = request.Request(url=url, headers=headers)
    res = request.urlopen(req)
    html = res.read().decode("utf-8")
    p.write_text(html)
    return html


def analyse_content(html):
    s = BeautifulSoup(html, "html.parser")
    s = s.find_all("li", class_="toggle")
    ctn = s[0]
    out = [
        each
        for each in s
        if len(each.find_all("summary")) != 0
        and each.find_all("summary")[0].text == "Properties"
    ]
    s = out[0].find_all("a")
    urls = {each.get("href"): each.text for each in s if each}
    return urls


def remove_all_blank(text):
    return " ".join(ptBlank.split(text)).replace("\n", "").strip()


def find_first_value_by_key(content, key):
    content = " ".join(ptTrueBlank.split(content))
    ss = re.findall("%s<.+?>([\\w\\s]+)" % key, content)
    return "" if len(ss) == 0 else ss[0]


def analyse_li(html, v):
    s = BeautifulSoup(html, "html.parser").find_all("div", class_="section-content")

    dom = {}
    dom["desc"] = remove_all_blank(s[0].text)
    dom["grammar"] = s[2].text

    for e in s:
        bu = e.find_all("table", class_="properties")
        if len(bu) != 0:
            break
    if len(bu) == 0:
        print("tbody read fail! break. key = " + v)
        return dom

    bu = bu[0].find_all("td")
    dom["initial value"] = bu[0].text
    dom["inherit"] = bu[2].text
    dom["applicable elements"] = bu[1].text
    return dom


lang = input("input your language code (default: zh-CN): ").strip()
lang = lang if len(lang) == 0 else "zh-CN"
ss = fetchResources("/zh-CN/docs/Web/CSS", "root")
ss = analyse_content(ss)

o = Path("mdn.json")
result = {}
if o.exists():
    result = json.loads(o.read_bytes())

for k in ss:
    v = ss[k]
    v = remove_all_blank(v)
    if v in result:
        continue

    ctn = fetchResources(k, v)
    out = analyse_li(ctn, v)
    out["name"] = v
    result[v] = out
    pass

o.write_text(json.dumps(result, ensure_ascii=False))
