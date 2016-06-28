const gulp = require('gulp');
const clean = require('gulp-clean');
const webpack = require('webpack');
const path = require('path');

const GulpUtility = require('gulp-util');

const WebpackConfig = require('./client/webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');

const paths = {
    build: path.resolve(WebpackConfig.output.path),
    output: path.resolve(WebpackConfig.output.path, WebpackConfig.output.filename)
};

const files = {
    bundle: WebpackConfig.output.filename
}

gulp.task('webpack:build', function(callback) {
    gulp.src(['client/assets/html/index.html'])
        .pipe(gulp.dest('client/build'));

    webpack(WebpackConfig, function(error, stats) {
        if (error) throw new GulpUtility.PluginError('webpack', error);
        GulpUtility.log('[webpack]', stats.toString({}));
        callback();
    });
});

gulp.task('webpack:server', function(callback) {
    let compiler = webpack(WebpackConfig);

    WebpackConfig.entry.unshift(
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server'
    );

    new WebpackDevServer(compiler, {
        contentBase: 'client/build',
        hot: true,
        proxy: {
            /* access to rails api from dev server */
            '/api/*': {
                target: 'http://localhost:3000',
                secure: false,
                rewrite: function(request) {
                    request.url = request.url.replace(/^\/api/, '');
                }
            }
        }
    }).listen(8080, 'localhost', function(error) {
        if (error) throw new GulpUtility.PluginError('webpack-dev-server', error);
        GulpUtility.log('[webpack-dev-server]', 'http://localhost:8080/');
    });
});

gulp.task('clean', function() {
    return gulp.src(['client/build/*.*', path.resolve('app/assets/javascripts', files.bundle)], { read: false }).pipe(clean());
});

gulp.task('build:rails', ['webpack:build'], function() {
    return gulp.src(paths.output).pipe(gulp.dest('app/assets/javascripts'));
});

gulp.task('dev:rails', ['clean', 'build:rails']);
gulp.task('dev:client', ['clean', 'webpack:build', 'webpack:server']);

gulp.task('default', ['dev:rails']);
