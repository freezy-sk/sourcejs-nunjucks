'use strict';

var deepExtend = require('deep-extend');
var nunjucks = require('nunjucks');
var path = require('path');
var specUtils = require(path.join(global.pathToApp, 'core/lib/specUtils'));

// Module configuration
var globalConfig = global.opts.plugins && global.opts.plugins.nunjucks ? global.opts.plugins.nunjucks : {};
var config = {
    enabled: true,

    // Nunjucks Environment options
    envOptions: {
        // noCache: true
    },

    // Public object is exposed to Front-end via options API.
    public: {}
};

// Overwriting base options
deepExtend(config, globalConfig);

// Setup Nunjucks environment
var njkEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(global.app.get('user')), config.envOptions);

/**
 * Get HTML from response and render it with Nunjucks markup
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 */
exports.process = function (req, res, next) {
    if (!config.enabled) {
        next();
        return;
    }

    // Check if request is targeting right Spec file
    if (isValidSpecType(req)) {
        var html = njkEnv.renderString(req.specData.renderedHtml, {
            specData: req.specData
        });
        req.specData.renderedHtml = html;
    }

    next();
};

/**
 * Check if is valid Spec file
 *
 * @param {object} req - Request object
 * @returns {boolean}
 */
function isValidSpecType(req) {
    if (!req.specData) {
        return false;
    }

    if (req.specData.isNjk) {
        return true;
    }

    var specDir = specUtils.getFullPathToSpec(req.path);
    var specFilePath = specUtils.getSpecFromDir(specDir);

    return specFilePath.endsWith('.njk.html');
}
