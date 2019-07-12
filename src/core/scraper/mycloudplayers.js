/**
 * @module core/scraper/mycloudplayers
 */

/**
 * L'URL de l'extension pour lire des musiques issues de SoundCloud.
 *
 * @constant {string}
 */
const PLUGIN_URL = "plugin://plugin.audio.soundcloud/play/?audio_id=";

/**
 * Les règles avec les patrons et leur action.
 *
 * @constant {Map}
 */
export const rules = new Map();

/**
 * Extrait les informations nécessaire pour lire une musique sur Kodi.
 *
 * @function action
 * @param {string} url L'URL d'une musique de My Cloud Player.
 * @returns {Promise} L'URL du <em>fichier</em> ou <code>null</code>.
 */
rules.set(["*://mycloudplayers.com/*"], function ({ searchParams }) {
    if (searchParams.has("play")) {
        return Promise.resolve(PLUGIN_URL + searchParams.get("play"));
    }

    return Promise.resolve(null);
});
