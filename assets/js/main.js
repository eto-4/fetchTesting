// ---------------------------------
// Aquest fitxer s'encarrega de renderitzar els usuaris obtinguts
// de l'API https://reqres.in i mostrar el perfil seleccionat.
// Inclou gestió de càrrega i errors.
// ---------------------------------

import { fetchAllPages, fetchUser } from './fetch.js';

/**
 * renderUsuaris
 * -------------
 * Funció que obté tots els usuaris de l'API i els mostra com a targetes
 * dins del contenidor #usuarisContainer.
 * Gestiona la visualització de missatges de càrrega i errors.
 */
function renderUsuaris() {

    // Element de missatge de càrrega
    const loading = document.getElementById('loadingUsers');
    loading.style.display = 'block';

    // Element per mostrar errors o cap usuari
    const UsersNullData = document.getElementById('UsersNullData');
    UsersNullData.style.display = 'none';

    // Contenidor on s'inseriran les targetes d'usuaris
    const usersContainer = document.getElementById('usuarisContainer');

    // Obtenim les dades de l'API
    fetchAllPages().then(data => {

        const noHiHaDades = !data || data.length === 0;

        if (noHiHaDades) {
            // Si no hi ha dades, ocultem el loading i mostrem missatge
            loading.style.display = 'none';
            UsersNullData.style.display = 'block';
            UsersNullData.textContent = "No s'han trobat usuaris i/o hi ha hagut un error.";
            return;
        }

        // Iterem cada usuari i creem la targeta corresponent
        data.forEach(obj => {

            // Crear container principal de la targeta
            const tarjeta = document.createElement('div');
            tarjeta.className = `targetaUser${obj.id}`;

            // Crear elements interns
            const nom = document.createElement('h3');
            nom.className = `nom`;

            const img = document.createElement('img');
            img.className = 'pfp';

            const id = document.createElement('id');
            id.className = 'id';

            // Assignació de valors
            nom.textContent = obj.first_name;
            img.src = obj.avatar;
            id.textContent = obj.id;

            // Botó "Veure Perfil"
            const veureButton = document.createElement('button');
            veureButton.className = 'veureButton';
            veureButton.textContent = 'Veure Perfil';
            veureButton.addEventListener('click', () => veureUser(obj.id));

            // Afegir elements al contenidor de la targeta
            tarjeta.appendChild(id);
            tarjeta.appendChild(img);
            tarjeta.appendChild(nom);
            tarjeta.appendChild(veureButton);

            // Afegir la targeta al contenidor principal
            usersContainer.appendChild(tarjeta);
        });

        // Amaguem el missatge de càrrega
        loading.style.display = 'none';
    });
}

// /**
//  * veureUser
//  * ----------
//  * Funció que mostra la informació detallada d'un usuari seleccionat.
//  * Genera dinàmicament la targeta amb avatar i informació.
//  * Gestiona errors i elimina la targeta anterior si existeix.
//  *
//  * @param {Object} obj - Objecte amb la informació de l'usuari
//  */
let primeraVegada = true;
function veureUser(objID) {
    const loadingUser = document.getElementById('loadingUser');
    const UserNullData = document.getElementById('UserNullData');
    const userContainer = document.getElementById('usuariContainer');

    // Evitar fetch nomes carregar la pàgina
    if (primeraVegada) {
        primeraVegada = false;
        loadingUser.style.display = 'none';
        UserNullData.textContent = "Sel·lecciona 'Veure Perfil' de l'usuari que vulguis per inspeccionar."
        return;
    }

    fetchUser(objID).then(obj => {
        if (!obj) {
            UserNullData.textContent = "Error carregant usuari.";
            return;
        }

        console.log(obj)
        console.log(`Hola ${obj.first_name || 'usuari desconegut'}!`);

        loadingUser.style.display = 'block';
    
        UserNullData.style.display = 'none';
    
    
        const noHiHaDades = !obj || Object.keys(obj).length === 0;
    
        if (noHiHaDades) {
            // Si no hi ha dades, mostrem missatge d'error
            loadingUser.style.display = 'none';
            UserNullData.style.display = 'block';
            UserNullData.textContent = "No s'han sel·leccionar cap usuari i/o hi ha hagut un error.";
            return;
        }
    
        // Eliminar targeta anterior si existeix
        const targetaExistent = userContainer.querySelector('.targetaUser');
        if (targetaExistent) {
            userContainer.removeChild(targetaExistent);
        }
    
        const titleUser = document.getElementById('usuariEscollit');
        titleUser.textContent = obj.first_name;
    
        // Crear targeta del nou usuari
        const tarjeta = document.createElement('div');
        tarjeta.className = 'targetaUser';
    
        const nom = document.createElement('h4');
        nom.className = 'nom';
    
        const cog = document.createElement('h4');
        cog.className = 'cog';
    
        const email = document.createElement('h4');
        email.className = 'email';
    
        const img = document.createElement('img');
        img.className = 'pfp';
        img.src = obj.avatar;
    
        // Contenidor d'informació textual
        const infoContainer = document.createElement('div');
        infoContainer.className = 'infoDisplay';
    
        // Assignar valors amb format HTML
        nom.innerHTML = `
            <span class="label">Nom:</span>
            <span class="value">${obj.first_name}</span>
        `;
        cog.innerHTML = `
            <span class="label">Cognom:</span>
            <span class="value">${obj.last_name}</span>
        `;
        email.innerHTML = `
            <span class="label">Email:</span>
            <span class="value">${obj.email}</span>
        `;
    
        // Afegir elements al contenidor de la targeta
        tarjeta.appendChild(img);
        infoContainer.appendChild(nom);
        infoContainer.appendChild(cog);
        infoContainer.appendChild(email);
        tarjeta.appendChild(infoContainer);
    
        // Afegir la targeta al contenidor principal
        userContainer.appendChild(tarjeta);
        loadingUser.style.display = 'none';
    })
}

// Modal Info
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const openBtn = document.getElementById("tableButtonTrigger");
const closeBtn = document.getElementById("closeModal");

// Obrir modal i generar la taula amb les dades obtingudes
openBtn.addEventListener("click", () => {
    fetchAllPages().then(data => {
        showTable(data);
    });
});

// Tancar modal i buidar contingut
closeBtn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
    modalContent.innerHTML = "";
});

/**
 * showTable
 * ----------
 * Funció que genera una taula HTML dinàmica amb la informació
 * dels usuaris i l'inserta dins del modal. Després mostra el modal.
 *
 * La taula conté les següents columnes:
 *  - ID
 *  - Avatar URL
 *  - Nom
 *  - Cognom
 *  - Email
 *
 * @param {Array<Object>} data - Array d'objectes amb les dades dels usuaris
 *
 * Exemple d'ús:
 * fetchAllPages().then(data => {
 *     showTable(data);
 * });
 */
function showTable(data) {
    const table = document.createElement("table");

    // Capçalera de la taula
    const thead = document.createElement("thead");
    thead.innerHTML = 
    `
    <tr>
        <th>ID</th>
        <th>Avatar URL</th>
        <th>Nom</th>
        <th>Cognom</th>
        <th>Email</th>
    </tr>
    `;
    table.appendChild(thead);

    // Cos de la taula amb les files dels usuaris
    const tbody = document.createElement("tbody");
    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = 
        `
        <td>${row.id}</td>
        <td>${row.avatar}</td>
        <td>${row.first_name}</td>
        <td>${row.last_name}</td>
        <td>${row.email}</td>
        `;
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Insertem la taula al modal i mostrem el modal
    modalContent.appendChild(table);
    modalOverlay.style.display = "flex";
}

// Intent de renderitzar usuaris i mostrar un usuari buit per inicialització
try {
    renderUsuaris();
    veureUser();
} catch (err) {
    console.error("S'ha capturat un error de renderització:", err);
    // Mostrar missatge amigable en la UI
    document.getElementById('UsersNullData').textContent = "Hi ha hagut un problema renderitzant els usuaris.";
}