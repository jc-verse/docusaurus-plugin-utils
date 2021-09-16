#!/usr/bin/env node
const chalk = require('chalk');
const cli = require('commander');
const build = require('../lib/build').default;

cli
  .command('build')
  .option('--source-dir <dir>')
  .option('--target-dir <dir>')
  .option('--theme-dir <dir>')
  .option('--theme-target-dir <dir>')
  .action(build);

cli.arguments('<command>').action((cmd) => {
  cli.outputHelp();
  console.log(`  ${chalk.red(`\n  Unknown command ${chalk.yellow(cmd)}.`)}`);
  console.log();
});

cli.parse(process.argv);

if (!process.argv.slice(2).length) {
  cli.outputHelp();
}
