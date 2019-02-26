const testServer = require('supertest');
const app = require('../server');

test('it should forbid those who are not logged in', () => {

      return testServer(app).get('/api/player/2').then( (Response) => {
       expect(Response.statusCode).toBe(403);
     })
});

test('it should return players associated with a campaign', () => {
    let agent = testServer.agent(app);
 
    return agent
    .post('/api/user/login')
    .send({username: 'cod', password: 'cod'})
    .then( (response) => {
      return agent.get('/api/player/2').then( (userResponse) => {
          console.log('Here is Where I want to Look!!!!!',userResponse);
       expect(Array.isArray(userResponse.body)).toBe(true);
     })
    })
 })