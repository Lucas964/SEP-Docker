const request = require('request')
const _ = require('underscore')

const votes = ['a', 'a', 'b']

function sendRandomVote() {
  const vote = _.sample(votes)
  console.log(`Sending random vote: ${vote}`)
  request.post('http://vote', {
    form: {
      vote: vote
    }
  }, (err, response) => {
    if (err) {
      console.error('voting failed', err)
    } else {
      console.log('Vote registered')
    }
    console.log('Rescheduling...')
    setTimeout(sendRandomVote, 2000)
  })
}
sendRandomVote()