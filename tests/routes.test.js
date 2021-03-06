import request from 'supertest'
import app from '../app.js'
import mongoose from 'mongoose'
import Organ from '../models/organs.js'
import OrganModel from "../models/organs.js"




beforeAll(async () => {
  // create a test database url
  const MONGODB_TEST_URI = `mongodb://localhost/organsTestDB`

  // close the existing connection to the database so we can connect to the test database
  await mongoose.connection.close()

  // connect to the test database
  await mongoose.connect(MONGODB_TEST_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  const seedData = async () => {
    await OrganModel.deleteMany()

    await OrganModel.insertMany(organs)
    console.log('seeded, success!')

  }
})
//let projectId;
let organName
let organId;

// projects api tests
describe('Test the express routes for organs', () => {
  // test the GET express route for the '/api/projects' path
  it('should show all organs', async () => {
    const res = await request(app).get(`/organ-api/organs`)
    // test that the status code is 200 - successful
    expect(res.statusCode).toEqual(200)
    // test that the response object has an _id property
    expect(res.body[0]).toHaveProperty('name')
    expect(res.body[0]).toHaveProperty('_id')
    organName = res.body[0].name
    organId = res.body[0]._id
    // console.log(organName)
  }),
    it('should get a specific organ', async () => {
      const res = await request(app).get(`/organ-api/organs/${organName}`)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('name')
    }),
    it('should creaet a new organ object', async () => {
      const res = await request(app).post(`/organ-api/organs`).send({
        name: "Heart",
        description: "Your heart is the primary organ of your circulatory system. ",
        system: "Cardio",
        symptom: ["heard disease"],
        images: "https://www.pngfind.com/pngs/m/28-286612_human-body-heart-anatomy-orga"
      })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('name')
    }),

    it('should update an organ', async () => {
      const res = await request(app).put(`/organ-api/organs/${organName}`).send({
        name: "Intestine",
        description: "Food is the way to the heart",
        system: "digestive",
        symptom: ["ulcers"],
        images: "https://www.pngfind.com/pngs/m/28-286612_human-body-heart-anatomy-orga"
      })
      expect(res.statusCode).toEqual(200)
      //expect(res.body).toHaveProperty('name')
    }),
    it('should delete an entry', async () => {
      const res = await request(app).del(`/organ-api/organs/${organId}`)
      expect(res.statusCode).toEqual(200)
      expect(res.text).toEqual('organ removed')
    })
})

// afterWords(async () => {
//   await mongoose.connection.close()
// })
  //,
  // Save the _id value for later use with other tests
  //projectId = res.body[0].organ
  // }),
  // it('should show a specific object', async () => {
  //     // create a GET request with SuperTest using the projectId from the previous POST test
  // const res = await request(app).get(`/organ-api/organs/${organName}`)
  //  expect(res.statusCode).toEqual(200)
  //  expect(res.body).toHaveProperty('name')
  //   })
  // })
