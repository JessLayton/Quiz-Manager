const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before } = require('mocha');
const server = require('../src/index');

chai.should();
chai.use(chaiHttp);

describe('/quizzes routes', () => {
  let token;
  let quizId;

  before((done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        username: 'testUser',
        password: 'TestPassword123!',
      }).end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          token = res.body.token;
          done();
        }
      });
  });

  it('should CREATE a new quiz', (done) => {
    chai.request(server)
      .post('/quizzes/createQuiz')
      .set('x-auth-token', token)
      .send(
        {
          name: 'Test Quiz',
          description: 'Test quiz',
          questions: [
            {
              question: 'test question...?',
              options: ['option 1', 'option 2', 'option 3', 'option 4'],
              correctOption: 2,
            },
          ],
        },
      )
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          quizId = res.body.quiz.id;
          done();
        }
      });
  });

  it('should return 409 when trying to CREATE a quiz with the same name as an existing quiz', (done) => {
    chai.request(server)
      .post('/quizzes/createQuiz')
      .set('x-auth-token', token)
      .send(
        {
          name: 'Test Quiz',
          description: 'Duplicate test quiz',
          questions: [
            {
              question: 'test question...?',
              options: ['option 1', 'option 2', 'option 3', 'option 4'],
              correctOption: 2,
            },
          ],
        },
      )
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(409);
          res.body.msg.should.equal('A quiz already exists with this name: Test Quiz');
          done();
        }
      });
  });

  it('should GET all the quizzes', (done) => {
    chai.request(server)
      .get('/quizzes/getAllQuizzes')
      .set('x-auth-token', token)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.quizzes.should.be.a('array');
          res.body.quizzes.should.not.have.a.lengthOf(0);
          done();
        }
      });
  });

  it('should GET the quiz by id, including the correct option for each question', (done) => {
    chai.request(server)
      .post('/quizzes/getQuizWithAnswers')
      .set('x-auth-token', token)
      .send({ id: quizId })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.quiz.name.should.equal('Test Quiz');
          res.body.quiz.questions.should.have.a.lengthOf(1);
          res.body.quiz.questions[0].should.have.property('correctOption');

          done();
        }
      });
  });

  it('should GET the quiz by id, excluding the correct option for each question', (done) => {
    chai.request(server)
      .post('/quizzes/getQuizNoAnswers')
      .set('x-auth-token', token)
      .send({ id: quizId })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.quiz.name.should.equal('Test Quiz');
          res.body.quiz.questions.should.have.a.lengthOf(1);
          res.body.quiz.questions[0].should.not.have.property('correctOption');
          done();
        }
      });
  });

  it('should UPDATE the quiz by id', (done) => {
    chai.request(server)
      .put(`/quizzes/updateQuiz/${quizId}`)
      .set('x-auth-token', token)
      .send(
        {
          name: 'Updated Test Quiz',
          description: 'Test description',
          questions: [
            {
              question: 'test question 1...?',
              options: ['option 1', 'option 2', 'option 3', 'option 4'],
              correctOption: 2,
            },
            {
              question: 'test question 2...?',
              options: ['option 1', 'option 2', 'option 3', 'option 4'],
              correctOption: 3,
            },
          ],
        },
      )
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.quiz.name.should.equal('Updated Test Quiz');
          res.body.quiz.questions.should.have.a.lengthOf(2);
          done();
        }
      });
  });

  it('should DELETE the quiz by id', (done) => {
    chai.request(server)
      .delete(`/quizzes/deleteQuiz/${quizId}`)
      .set('x-auth-token', token)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.response.deletedCount.should.equal(1);
          done();
        }
      });
  });

  it('should return 404 when trying to GET a quiz that does not exist', (done) => {
    chai.request(server)
      .post('/quizzes/getQuizWithAnswers')
      .set('x-auth-token', token)
      .send({ id: quizId })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(404);
          done();
        }
      });
  });
});
