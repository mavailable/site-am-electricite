# Polices à télécharger

Les polices doivent être placées dans `public/fonts/` au format `.woff2`.

## Option rapide — google-webfonts-helper

1. Aller sur https://gwfh.mranftl.com/fonts
2. Chercher **Space Grotesk** → cocher **500, 600, 700** → "Modern Browsers" → Download
3. Chercher **DM Sans** → cocher **400, 500, 700** → "Modern Browsers" → Download
4. Extraire les .woff2 et renommer :

```
public/fonts/
├── space-grotesk-500.woff2
├── space-grotesk-600.woff2
├── space-grotesk-700.woff2
├── dm-sans-400.woff2
├── dm-sans-500.woff2
└── dm-sans-700.woff2
```

## Option alternative — Script local

Exécuter dans le dossier `site/` :

```bash
python3 -c "
import urllib.request, json, os
os.makedirs('public/fonts', exist_ok=True)
for fid, variants in [('space-grotesk',['500','600','700']),('dm-sans',['regular','500','700'])]:
    data = json.loads(urllib.request.urlopen(f'https://gwfh.mranftl.com/api/fonts/{fid}?subsets=latin').read())
    for v in data['variants']:
        if v['id'] in variants:
            w = '400' if v['id']=='regular' else v['id']
            fn = f'public/fonts/{fid}-{w}.woff2'
            urllib.request.urlretrieve(v['woff2'], fn)
            print(f'✅ {fn} ({os.path.getsize(fn)//1024} Ko)')
"
```

## Vérification

Chaque fichier .woff2 doit faire > 10 Ko. Si un fichier fait quelques octets, il est corrompu.
