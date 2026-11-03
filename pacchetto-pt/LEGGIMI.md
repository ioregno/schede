# App schede per personal trainer (versione offline)

Prodotto da vendere una tantum ai PT, ricavato dall'app di giulio (versione restyled).

- `app/`: la cartella da mettere online. `index.html` è l'app del cliente, `coach.html` la pagina dove il PT crea le schede, `config.js` l'unico file da personalizzare, `tema.css` la grafica (separata dalla logica: un altro tema si sostituisce senza toccare il resto), `foto/` le foto delle macchine, `sw.js` la copia offline.
- `GUIDA-PT.md`: guida da dare al PT (personalizzare, pubblicare gratis, creare e mandare le schede).
- `strumenti/crea_esempio.py`: rigenera la configurazione di esempio (`app/config.js` e `app/foto/`) dal catalogo macchine e dalla scheda di giulio in /mnt/project-files. Le foto dell'esempio sono di giulio e servono solo per la demo: un PT vero mette le sue.

Come viaggia la scheda: il PT la compone in `coach.html`, l'app la comprime (deflate) e la mette nel link dopo `#s=`. Il link non passa da nessun server (la parte dopo `#` non viene mai inviata). Il cliente la conferma e resta in localStorage; storico e pesi sono separati dalla scheda, quindi un link nuovo aggiorna la scheda senza perdere niente.

Provare in locale: `cd app && python3 -m http.server 8765`, poi http://localhost:8765/coach.html.
