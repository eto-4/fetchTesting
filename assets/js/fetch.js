// ---------------------------------
// Aquest fitxer gestiona les peticions a la web https://reqres.in
// S'utilitza per obtenir dades de usuaris de prova i fer proves
// de funcionalitat, com paginació i gestió d'errors.
// ---------------------------------

/**
 * fetchAllPages
 * -------------
 * Funció que obté de manera recursiva totes les pàgines d'usuaris
 * de l'API de https://reqres.in. Les dades s'acumulen en un array
 * i es retornen un cop s'han obtingut totes les pàgines.
 *
 * @param {number} page - Número de pàgina inicial (per defecte 1)
 * @param {Array} collected - Array on s'acumularan les dades (per defecte [])
 * @returns {Promise<Array>} - Promesa que resol amb totes les dades d'usuaris
 */
export function fetchAllPages(page = 1, collected = []) {
    return fetch(
        `https://reqres.in/api/users?page=${page}`, {
            headers: {
                'x-api-key': 'reqres-free-v1' // Clau gratuïta de l'API
            }
        }
    )
    .then(response => {
        // Convertim la resposta a JSON
        return response.json();
    })
    .then(data => {
        // Afegim les dades de la pàgina actual al array acumulat
        collected.push(...data.data);

        // Si encara hi ha més pàgines, cridem recursivament la funció
        if (data.page < data.total_pages) {
            return fetchAllPages(page + 1, collected);
        }

        // Si no hi ha més pàgines, retornem totes les dades acumulades
        return collected;
    })
    .catch(err => {
        // Mostrem l'error per consola i retornem un array buit
        console.error('Error fetching users:', err);
        return [];
    });
}



/**
 * fetchUser
 * ----------
 * Funció que obté les dades d'un usuari específic a partir del seu ID
 * des de l'API de https://reqres.in. Retorna una promesa que resol amb
 * l'objecte de l'usuari o null si hi ha algun error.
 *
 * @param {number} userID - ID de l'usuari que volem obtenir
 * @returns {Promise<Object|null>} - Promesa que resol amb les dades de l'usuari
 *                                   o null en cas d'error
 *
 * Exemple d'ús:
 * fetchUser(2).then(user => {
 *     if (user) {
 *         console.log(`Usuari trobat: ${user.first_name}`);
 *     } else {
 *         console.log('No s\'ha pogut obtenir l\'usuari.');
 *     }
 * });
 */
export function fetchUser(userID) {
    return fetch(
        `https://reqres.in/api/users/${userID}`, {
            headers: {
                'x-api-key': 'reqres-free-v1' // Clau gratuïta de l'API
            }
        }
    )
    .then(response => {
        // Convertim la resposta a JSON
        return response.json();
    })
    .then(data => {
        // Retornem l'objecte de l'usuari o null si no existeix
        return data?.data ?? null;
    })
    .catch(err => {
        // Mostrem l'error per consola i retornem null
        console.error('Error fetching users:', err);
        return null;
    });
}

/* ---------------------------------
   ALTRES VERSIONS DE PROVA
-----------------------------------*/

/**
 * fetchAllPages amb retorn simulat de cap dada
 * --------------------------------------------
 * Aquesta versió s'utilitza per provar què passa quan l'API no retorna
 * cap usuari.
 */
// export function fetchAllPages(page = 1, collected = []) {
//     return fetch(
//         `https://reqres.in/api/users?page=${page}`, {
//             headers: {
//                 'x-api-key': 'reqres-free-v1'
//             }
//         }
//     )
//     .then(response => {
//         // Simulem resposta buida
//         return Promise.resolve([]);
//     })
//     .catch(err => {
//         console.error('Error fetching users:', err);
//         return [];
//     });
// }

/**
 * fetchAllPages amb error simulat
 * -------------------------------
 * Aquesta versió serveix per provar la gestió d'errors de la funció.
 */
// export function fetchAllPages(page = 1, collected = []) {
//     return fetch(
//         `https://reqres.in/api/users?page=${page}`, {
//             headers: {
//                 'x-api-key': 'reqres-free-v1'
//             }
//         }
//     )
//     .then(response => {
//         // Simulem un error de fetch
//         return Promise.reject(new Error("Simulació de fallo de fetch"));
//     })
//     .catch(err => {
//         console.error('Error fetching users:', err);
//         return [];
//     });
// }