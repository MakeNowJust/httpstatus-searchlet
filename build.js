//load require libraries

var
fs     = require('fs'),
_      = require('lodash'),
async  = require('async'),
uglify = require('uglify-js');

//constants

var
VERSION       = '0.0.2',
HTTPSTATUS_JS = 'httpstatus.js';

//processing command line arguments

var
optimist = require('optimist')
  .usage   ('Usage:\n  > node build.js [options]')
  .default ('i', '"%s"')
  .string  ('i')
  .alias   ('i', 'input-pattern')
  .describe('i', 'string to replace $input_pattern$')
  .default ('o', 'httpstatus.min.js')
  .alias   ('o', 'output')
  .describe('o', 'output filename')
  .default ('l', 20)
  .alias   ('l', 'limit')
  .describe('l', 'number of displayable httpstatus'),
argv = optimist.argv;

if (argv.help) {
  optimist.showHelp();
  process.exit();
}

if (argv.version) {
  console.error(VERSION);
  process.exit();
}

async.waterfall([
  function loadHttpstatusJs(next) {
    fs.readFile(HTTPSTATUS_JS, 'utf-8', next);
  },
  
  function compressHttpstatusJs(src, next) {
    var
    ast = uglify.parse(src);
    
    ast.figure_out_scope();
    ast.compute_char_frequency();
    ast.mangle_names();
    
    next(null, ast.print_to_string());
  },
  
  function replaceHttpstatusJs(compressedSrc, next) {
    compressedSrc = compressedSrc.replace('$input_pattern$', argv['input-pattern']);
    compressedSrc = compressedSrc.replace('$limit$', argv.limit);
    next(null, compressedSrc);
  },
  
  function writeHttpstatusJs(replacedSrc, next) {
    replacedSrc = 'javascript:' + replacedSrc;
    fs.writeFile(argv.output, replacedSrc, 'utf-8', next);
  },
], function (err) {
  if (err) throw err;
  console.log('success generate => %s', argv.output);
});
