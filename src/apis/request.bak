
import fs from 'fs';
import request from 'request';

var options = {
  'method': 'POST',
  'url': 'https://api.tippmix.hu/tippmix/search',
  'headers': {
    'Accept-Language': 'en-US,en;q=0.9,hu;q=0.8,de;q=0.7',
    'Content-Type': 'application/json',
    'Origin': 'https://www.tippmix.hu',
    'Referer': 'https://www.tippmix.hu/',
    'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site'
  },
  body: JSON.stringify({
    "fieldValue":"",
    "sportId":1,
    "competitionGroupId":0,
    "competitionId":0,
    "type":0,
    "date":"0001-01-01T00:00:00.000Z",
    "hitsPerPage":400,
    "page":1,
    "minOdds":null,
    "maxOdds":null
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  fs.writeFileSync('./response.json', (`${response.body}`) );
});

