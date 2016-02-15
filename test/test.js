var assert = require('assert');
var gulp = require('gulp-param')(require('gulp'), process.argv);
var expansion = require('gulp-template-servlet-expansion');
expansion(gulp, {versionFile:'test/version.properties', cdnFile:'test/cdn.properties'});
var expansionCss = require('../index')(expansion);

describe('gulp-template-expansion-css-less', function(){
    it('expansion injection', function(){
        assert(expansionCss.createCssEnvContent != null);
        assert(expansionCss.buildCss != null);
        assert.equal(expansionCss.createCssEnvContent, expansion.createCssEnvContent);
        assert.equal(expansionCss.buildCss, expansion.buildCss);
    });
});