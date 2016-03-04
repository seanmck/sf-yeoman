var generators = require('yeoman-generator');
var yosay = require('yosay');
var cheerio = require('cheerio');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    console.log(yosay('Welcome to the Service Fabric application generator!'));

  },

  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'Enter a name for the application type: '
      }
    ];

    this.prompt(prompts, function(answers) {
      this.appName = answers.appName;

      this.composeWith('servicefabric:service', { 
        options: {
          appName: this.appName
        }
      });

      done();
    }.bind(this));
  },

  writing: {
    createApplicationProject: function() {
      this.fs.copyTpl(
        this.templatePath('ApplicationManifest.xml'),
        this.destinationPath(this.appName + '/' + this.appName + '/ApplicationPackageRoot/' + 'ApplicationManifest.xml'),
        { apptype: this.appName,
          servicetypename: this.serviceName
        }
      );
    }
  }
});
