/*
 * Copyright 2014, Tsuyusato Kitsune (@make_now_just).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
