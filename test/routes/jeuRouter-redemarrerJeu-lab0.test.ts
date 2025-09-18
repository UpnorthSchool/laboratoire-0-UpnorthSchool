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
describe('GET /api/v1/jeu/redemarrerJeu', () => {
    it(`devrait répondre avec une mauvaise demande lorsque le joueur n'existe pas ${testNom2}`, async () => {
        const response = await request.get('/api/v1/jeu/jouer/' + testNom2);
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body.error).toInclude("n'existe pas");
        expect(response.body.error).toInclude(testNom2);
    });

        it(`devrait répondre avec une mauvaise demande lorsque le joueur n'existe pas ${testNom1}`, async () => {
        const response = await request.get('/api/v1/jeu/terminerJeu/' + testNom1);
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body.error).toInclude("n'existe pas");
        expect(response.body.error).toInclude(testNom1);
    });

});


