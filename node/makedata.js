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
const getLatLng = async function(urlgmap) {
  const res = await fetch(urlgmap)
  //console.log(res)
  const url = res.url
  const ll = url.match(/@(\d+\.\d+),(\d+\.\d+)/)
  if (!ll)
    return null
  console.log(ll)
  return { lat: ll[1], lng: ll[2] }
}
const sleep = async msec => new Promise(resolve => setTimeout(resolve, msec))

const setDataLL = async function() {
  const fn = '../data/export-post-2020-04-12_10-21-48'
  const data = util.csv2json(util.readCSV(fn))
  for (const d of data) {
    if (d.map) {
      const ll = await getLatLng(d.map)
      if (ll) {
        d.lat = ll.lat
        d.lng = ll.lng
      }
      await sleep(100)
    }
  }
  util.writeCSV('../data/takeout-sabae-20200412102148', util.json2csv(data))
//  console.log(data)
}
const filterData = function() {
  const data = util.csv2json(util.readCSV('../data/takeout-sabae-20200412102148'))
  const res = []
  for (const d of data) {
    if (d.lat && d.lng) {
      const d2 = {
        url: `https://takeout-dish.com/sabae/${d.post_name}/`,
        name: d.post_title,
        description: d.post_content,
        latitude: d.lat,
        longitude: d.lng
      }
      const flgs = d.post_category.split(',')
      for (const n of flgs) {
        d2['flg_' + n] = 1
      }
      d2.flg_takeoutsabae = 1
      res.push(d2)
    }
  }
  util.writeCSV('../data/takeout-sabae-map', util.json2csv(res))
}
const main = async function() {
  //makeData()
  //await setDataLL()
  //await getLatLng('https://goo.gl/maps/RXWXrevizkwVZVPJ8')
  filterData()
}
if (require.main === module) {
  main()
}
exports.updateData = makeData

