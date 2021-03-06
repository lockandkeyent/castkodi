/**
 * @module
 */
/* eslint-disable require-await */

import { matchPattern } from "../../tools/matchpattern.js";

/**
 * Extrait les informations nécessaire pour lire la vidéo sur Kodi.
 *
 * @param {URL} url L'URL d'une vidéo PeerTube.
 * @returns {Promise.<?string>} Une promesse contenant le lien du
 *                              <em>fichier</em> ou <code>null</code>.
 */
const action = async function ({ href }) {
    const url = href.replace(/^http:/iu, "https:")
                    .replace("videos/watch", "api/v1/videos")
                    .replace("videos/embed", "api/v1/videos");
    try {
        const response = await fetch(url);
        const json = await response.json();
        return "files" in json ? json.files[0].fileUrl
                               : null;
    } catch {
        // Si le site n'est pas une instance PeerTube, l'appel à l'API échoue.
        return null;
    }
};
export const extract = matchPattern(action,
    "*://*/videos/watch/*",
    "*://*/videos/embed/*");
