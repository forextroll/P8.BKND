import Organ from "../models/organs.js"

//TODO implement formatter
let formatHandler = (input) => {
  return input.charAt(0).toUpperCase() + string.slice(1);
}


export const getOrgans = async (req, res) => {
  try {
    const organs = await Organ.find({})
    res.json(organs)
  } catch (err) {
    console.log(err)
    res.json({ error: err.message })
  }
}

export const getOrgan = async (req, res) => {
  try {
    let temp = req.params
    const organ = formatHandler(temp)
    //const { organ } = formatHandler(req.params);
    console.log(organ)
    let filter = { name: organ }
    const searchResult = await Organ.findOne(filter)
    if (searchResult) {
      return res.json(searchResult)
    }
    res.status(400).json({ message: 'organ not found' })
  } catch (err) {
    res.json({ error: err })
  }
}

export const addOrgan = async (req, res) => {
  try {
    const organ = new Organ(req.body)
    await organ.save()
    res.json(organ)
  } catch (err) {
    res.json({ error: err })
  }
}

export const updateOrgan = async (req, res) => {
  try {
    // let filter = { name: organ }
    // const searchResult = await Organ.findOne(filter)
    const { id } = req.params
    const organ = await Organ.findByIdAndUpdate(id, req.body, { new: true })
    res.json(organ)
  } catch (err) {
    res.json({ error: err })
  }
}

export const deleteOrgan = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Organ.findByIdAndDelete(id)
    if (deleted) {
      return res.send('organ removed')
    }
    throw new Error('organ not found')
  } catch (err) {
    res.json({ error: err })
  }
}
