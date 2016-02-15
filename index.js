var es = require('event-stream');
var less = require('less');

function createCssEnvContent(version, cdn){
    return '@version:"' + version + '";@cdn:"' + cdn + '";';
}

function buildCss(){
    return es.map(function(file, cb){
        less.render(
            file.contents.toString(), {
                paths : [],
                filename : file.path,
                compress : false
            },
            function(error, result){
                if(error != null){
                    console.log(error);
                    throw error;
                }
                file.contents = new Buffer(result.css);
                cb(null, file);
            }
        );
    });
}

function gulpTemplateExpansionCssLess(expansion){
    expansion.createCssEnvContent = createCssEnvContent;
    expansion.buildCss = buildCss;
    return gulpTemplateExpansionCssLess;
}

gulpTemplateExpansionCssLess.createCssEnvContent = createCssEnvContent;
gulpTemplateExpansionCssLess.buildCss = buildCss;

if(typeof(window) != 'undefined' && window != null){
    window['gulpTemplateExpansionCssLess'] = gulpTemplateExpansionCssLess;
}

if(typeof(module) != 'undefined' && module != null){
    module.exports = gulpTemplateExpansionCssLess;    
}