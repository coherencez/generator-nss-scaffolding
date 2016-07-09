'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({ 

  prompting: function () {
    const done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the official' + chalk.magenta(' NSS Boilerplate ') + 'generator!'
    ));

    // var prompts = [{
    //   type: 'confirm',
    //   name: 'someAnswer',
    //   message: 'Would you like to enable this option?',
    //   default: true
    // }];
    const prompts = [{
            name: 'project',
            message: 'Please give your project a name:'
        },
        {
            type: 'checkbox',
            name: 'options',
            message: 'Choose which dependencies you would like to install:',
            choices: [{
                name: 'Bootstrap',
                value: 'includeBootstrap',
                checked: false
            }, {
                name: 'jQuery',
                value: 'includejQuery',
                checked: false
            }, {
                name: 'Gulp',
                value: 'includeGulp',
                checked: false
            }, {
                name: 'Jasmine (gulp-jasmine)',
                value: 'includeJasmine',
                checked: false
            }, {
                name: 'Browserify',
                value: 'includeBrowserify',
                checked: false
            }]
        }];
    this.prompt(prompts, function (answers) {
            const options = answers.options;

            const hasOption = (opt) => { return options.indexOf(opt) !== -1; };

            this.projectName = answers.project || 'nss-app';
            this.includeBootstrap = hasOption('includeBootstrap');
            this.includejQuery = hasOption('includejQuery');
            this.includeGulp = hasOption('includeGulp');
            this.includeJasmine = hasOption('includeJasmine');
            this.includeBrowserify = hasOption('includeBrowserify');

            done();
        }.bind(this));
  },

  writing: function () {
    // MAKE NEW DIR. WITH USER INPUT AS PROJ. NAME
    const newProj = this.projectName;

/*
 *         PROJECT FILES
 */ 
    this.copy('mjd-boilerplate/.yo-rc.json', `${newProj}/.yo-rc.json`);
    this.fs.copyTpl(
      this.templatePath('mjd-boilerplate/index.html'),
      this.destinationPath(`${newProj}/index.html`),
        {
         title: this.projectName,
         bootstrap: this.includeBootstrap,
         jquery: this.includejQuery,
         gulp: this.includeGulp,
         jasmine: this.includeJasmine,
         browserify: this.includeBrowserify
        }   
      );

    this.fs.copyTpl(
      this.templatePath('mjd-boilerplate/css/main.css'),
      this.destinationPath(`${newProj}/css/main.css`)
      );

    this.fs.copyTpl(
      this.templatePath('mjd-boilerplate/js/main.js'),
      this.destinationPath(`${newProj}/js/main.js`),
        {
          title: this.projectName,
          bootstrap: this.includeBootstrap,
          browserify: this.includeBrowserify,
          jquery: this.includejQuery
        }
      );

    this.fs.copyTpl(
      this.templatePath('mjd-boilerplate/.gitignore'),
      this.destinationPath(`${newProj}/.gitignore`)
      );

    this.fs.copyTpl(
      this.templatePath('mjd-boilerplate/package.json'),
      this.destinationPath(`${newProj}/package.json`),
        {
         title: this.projectName,
         bootstrap: this.includeBootstrap,
         jquery: this.includejQuery,
         gulp: this.includeGulp,
         jasmine: this.includeJasmine,
         browserify: this.includeBrowserify
        }
      );

    /*
     *   OPTION DEPENDENT FILES
     */

    if (this.includeGulp) {
      this.fs.copyTpl(
          this.templatePath('mjd-boilerplate/gulpfile.js'),
          this.destinationPath(`${newProj}/gulpfile.js`),
          {
           gulp: this.includeGulp,
           jasmine: this.includeJasmine,
           browserify: this.includeBrowserify
          }
        );
      this.template('mjd-boilerplate/.jshintrc', `${newProj}/.jshintrc`);
    }

    if (this.includeJasmine) {
      this.fs.copyTpl(
        this.templatePath('mjd-boilerplate/js/spec/testSpec.js'),
        this.destinationPath(`${newProj}/js/spec/testSpec.js`)
        );
      if (!this.includeBrowserify) {
        this.fs.copyTpl(
        this.templatePath('mjd-boilerplate/js/math.js'),
        this.destinationPath(`${newProj}/js/math.js`)
        );
      }
    }

    if (this.includeBrowserify) {
      this.fs.copyTpl(
        this.templatePath('mjd-boilerplate/js/math.js'),
        this.destinationPath(`${newProj}/js/math.js`)
        );
      this.fs.copyTpl(
        this.templatePath('mjd-boilerplate/dist/bundle.js'),
        this.destinationPath(`${newProj}/dist/bundle.js`)
        );
      this.fs.copyTpl(
        this.templatePath('mjd-boilerplate/dist/bundle.js.map'),
        this.destinationPath(`${newProj}/dist/bundle.js.map`)
        );
    }

  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      callback: function () {
        console.log('All dependencies installed, your scaffold is now complete!');
      }
    });

  }
});
