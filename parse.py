import json
import os
import re

content_file = r'e:\GCC Startup\Claude\gccstartup-cms\multilingual_content.txt'
out_dir = r'e:\GCC Startup\Claude\gccstartup-cms\translations'

os.makedirs(out_dir, exist_ok=True)

with open(content_file, 'r', encoding='utf-8') as f:
    lines = [line.strip() for line in f.read().split('\n')]

langs = [
    {"code": "en", "name": "English", "header": "English", "dir": "ltr", "flag": "🇬🇧"},
    {"code": "ar", "name": "العربية", "header": "Arabic / العربية", "dir": "rtl", "flag": "🇸🇦"},
    {"code": "zh", "name": "简体中文", "header": "Chinese Simplified / 简体中文", "dir": "ltr", "flag": "🇨🇳"},
    {"code": "de", "name": "Deutsch", "header": "German / Deutsch", "dir": "ltr", "flag": "🇩🇪"},
    {"code": "fr", "name": "Français", "header": "French / Français", "dir": "ltr", "flag": "🇫🇷"},
    {"code": "nl", "name": "Nederlands", "header": "Dutch / Nederlands", "dir": "ltr", "flag": "🇳🇱"},
    {"code": "es", "name": "Español", "header": "Spanish / Español", "dir": "ltr", "flag": "🇪🇸"},
    {"code": "it", "name": "Italiano", "header": "Italian / Italiano", "dir": "ltr", "flag": "🇮🇹"}
]

index_data = {
    "languages": [
        {"code": l["code"], "name": l["name"], "dir": l["dir"], "flag": l["flag"]} for l in langs
    ]
}
with open(os.path.join(out_dir, 'index.json'), 'w', encoding='utf-8') as f:
    json.dump(index_data, f, indent=2, ensure_ascii=False)

# find start index (line 19, which is the 2nd 'English')
start_idx = 0
english_count = 0
for i, line in enumerate(lines):
    if line == "English":
        english_count += 1
        if english_count == 2:
            start_idx = i
            break

lines = lines[start_idx:]

blocks = {}
current_lang = None
current_block = []

for line in lines:
    is_header = False
    for l in langs:
        if line == l["header"]:
            if current_lang:
                blocks[current_lang] = current_block
            current_lang = l["code"]
            current_block = []
            is_header = True
            break
    
    if not is_header and current_lang and line:
        current_block.append(line)
if current_lang:
    blocks[current_lang] = current_block

country_keys = ["uae", "bahrain", "hongkong", "singapore", "ireland"]

for l in langs:
    code = l["code"]
    block = blocks.get(code, [])
    if not block:
        continue
    
    # block structure:
    # 0: headline
    # 1: subtitle
    # 2: CTA: ...
    # 3: tone note
    # Then 5 countries. Each country has:
    # 0: Country Name
    # 1: description
    # 2: Tax baseline (label)
    # 3: tax value
    # 4: Setup timeline (label)
    # 5: timeline value
    # 6: Starting structural fee (label)
    # 7: fee value
    # 8: Company Registration & Setup (title)
    # 9: description
    # 10: Typical requirements: ...
    # 11: Global & Local Bank Account Setup (title)
    # 12: description
    # 13: Typical requirements: ...
    # 14: Nominee UBO - Tier 02 Privacy Package (title)
    # 15: description
    # 16: Typical requirements: ...
    # 17: Personal Tax Residency & Visas (title)
    # 18: description
    # 19: Typical requirements: ...
    # 20: CTA: ...
    
    data = {
        "lang": code,
        "dir": l["dir"],
        "name": l["name"],
        "hero": {
            "headline": block[0],
            "subtitle": block[1],
            "cta": block[2].replace("CTA: ", "").strip()
        },
        "tone_note": block[3],
        "countries": {}
    }
    
    idx = 4
    for c_key in country_keys:
        if idx >= len(block): break
        
        c_name = block[idx]
        c_desc = block[idx+1]
        
        # sometimes labels can vary by language, so we just take the lines
        tb_label = block[idx+2]
        tb_val = block[idx+3]
        
        st_label = block[idx+4]
        st_val = block[idx+5]
        
        sf_label = block[idx+6]
        sf_val = block[idx+7]
        
        cr_title = block[idx+8]
        cr_desc = block[idx+9]
        cr_req = block[idx+10]
        
        ba_title = block[idx+11]
        ba_desc = block[idx+12]
        ba_req = block[idx+13]
        
        nu_title = block[idx+14]
        nu_desc = block[idx+15]
        nu_req = block[idx+16]
        
        tr_title = block[idx+17]
        tr_desc = block[idx+18]
        tr_req = block[idx+19]
        
        cta = block[idx+20].replace("CTA: ", "").strip()
        
        data["countries"][c_key] = {
            "name": c_name,
            "description": c_desc,
            "tax_baseline": { "label": tb_label, "value": tb_val },
            "setup_timeline": { "label": st_label, "value": st_val },
            "starting_fee": { "label": sf_label, "value": sf_val },
            "services": {
                "company_registration": { "title": cr_title, "description": cr_desc, "requirements": cr_req },
                "bank_account": { "title": ba_title, "description": ba_desc, "requirements": ba_req },
                "nominee_ubo": { "title": nu_title, "description": nu_desc, "requirements": nu_req },
                "tax_residency": { "title": tr_title, "description": tr_desc, "requirements": tr_req }
            },
            "cta": cta
        }
        idx += 21
        
    with open(os.path.join(out_dir, f"{code}.json"), 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

print("Done")
