const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();
const { fastISOString } = require('fast-iso-string');

const results = [];

suite
  .add('new Date().toISOString()', function () {
    new Date().toISOString();
  })
  .add('fastISOString()', function () {
    fastISOString();
  })
  .on('cycle', function (event) {
    results.push(event.target.toString());
  })
  .on('complete', function () {
    results.forEach(console.log);

    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({
    async: false,
  });
