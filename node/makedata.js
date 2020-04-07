const fs = require('fs')
const fetch = require('node-fetch')
const util = require('./util.js')

const fetchText = async function(url) {
  const data = await (await fetch(url)).text()
	return data
}
const makeData = async function() {
  const csvurl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQEGkBA1BaApE2rOd3fajQILfgi9lWpRC4_q3W_By35ogeWh8fuK2C4VoUYN3Y_Vw001O0-6J4E3zg9/pub?gid=0&single=true&output=csv'
  const csv = await fetchText(csvurl)
  const fn = '../data/takeoutfukui'
  let csvold = null
  try {
    csvold = fs.readFileSync(fn)
  } catch (e) {
  }
  if (csvold == csv) {
    console.log('no updates')
    return false
  }
  const data = util.decodeCSV(csv)
  util.writeCSV(fn, data)
  console.log(data)
  console.log(data.length)
  return true
}
const main = async function() {
  makeData()
}
if (require.main === module) {
  main()
}
exports.updateData = makeData

