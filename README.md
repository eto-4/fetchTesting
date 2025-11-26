# Llistat d'usuaris amb Fetch i Modal

## Descripció
Aquesta pàgina web mostra un llistat d'usuaris obtinguts de l'API de prova [ReqRes](https://reqres.in/api/users).  
Permet visualitzar informació detallada de cada usuari dins d'una targeta i, a més, mostrar tots els usuaris en un **modal** amb una taula resumida.

## Funcionalitats
- Obtenció dinàmica de tots els usuaris amb `fetch`.
- Visualització dels usuaris en targetes amb:
  - Foto de perfil (avatar)
  - Nom i cognom
  - Botó per veure informació detallada
- Modal amb taula completa amb:
  - ID
  - Avatar URL
  - Nom
  - Cognom
  - Email
- Indicadors de càrrega mentre s'obtenen les dades.
- Responsive: s’adapta a diferents mides de pantalla.

## Estructura de fitxers
project/
│
├─ index.html # Fitxer principal de la pàgina
├─ assets/
│ ├─ css/
│ │ └─ style.css # Estils CSS de la pàgina i modal
│ └─ js/
│ ├─ fetch.js # Funcions per obtenir dades de l'API
│ └─ main.js # Lògica de la pàgina, renderització i modal


## Com executar
1. Clona o descarrega el projecte.
2. Obre `index.html` en un navegador modern (Chrome, Firefox, Edge…).
3. La pàgina carregarà automàticament els usuaris i podràs interactuar amb les targetes i el modal.

## Notes
- L'API utilitza una **clau gratuïta** (`x-api-key: reqres-free-v1`) per accedir a les dades.
- El modal es pot tancar amb el botó "X" situat a la cantonada superior dreta.
- La pàgina és **responsive** i s’adapta a diferents amplades de pantalla.

## Tecnologia utilitzada
- HTML5
- CSS3 (flex, grid, scroll personalitzat, modal, responsive)
- JavaScript (ES6+, fetch, Promises)
