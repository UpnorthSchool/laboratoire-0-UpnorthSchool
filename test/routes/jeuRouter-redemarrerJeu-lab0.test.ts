import { assert } from 'console';
import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';

const request = supertest(app);
const testNom1 = 'kk1';
const testNom2 = 'kk2';

beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom2 });
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {
    it(`devrait repondre avec un success (http 200) operation a pas de retour`, async () => {
        const response = await request.get('/api/v1/jeu/redemarrerJeu');
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
    });

});
/**
 * a verifier mais ici je fais terminer les session des joueursm, ensuite le prof a mentionner sign in sign out, a verifier
 * 
 */
describe('GET /api/v1/jeu/terminerJeu/:id', () => {
    it(`devrait répondre avec un appel réussi pour le joueur ${testNom1}`, async () => {
        const response = await request.get('/api/v1/jeu/terminerJeu/' + testNom1);
        const resultat = JSON.parse(response.body.resultat);
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(resultat.nom).toBe(testNom1);
    });

        it(`devrait répondre avec un appel fail pour le joueur ${testNom1}`, async () => {
        const response = await request.get('/api/v1/jeu/terminerJeu/' + testNom1);
        const resultat = JSON.parse(response.body.resultat);
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(resultat.nom).toBe(testNom1);
    });

});


