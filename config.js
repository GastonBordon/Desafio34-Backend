const yargs =require('yargs/yargs')(process.argv.slice(2))
const args = yargs.argv

console.log(args)

module.exports = {
    MODE: args.mode || 'FORK',
    PORT: args.port || 8080
}